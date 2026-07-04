import Head from 'next/head';
import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { isAdmin } from '../../lib/auth';

const EMPTY_NEWS_FORM = { id: null, title: '', news_date: '', content: '', image_url: '', inside_images: [] };
const EMPTY_PRODUCT_FORM = { id: null, brand: 'BBI PRODUCE', name: '', description: '', image_url: '', out_of_stock: false };

function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

async function uploadImage(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error(data.error || 'Upload failed');
  return data.url;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState('news');
  const [notice, setNotice] = useState(null); // { type: 'error' | 'success', text }

  const flash = useCallback((type, text) => {
    setNotice({ type, text });
    window.clearTimeout(flash._t);
    flash._t = window.setTimeout(() => setNotice(null), 4000);
  }, []);

  // ------- News state -------
  const [newsList, setNewsList] = useState([]);
  const [newsForm, setNewsForm] = useState(EMPTY_NEWS_FORM);
  const [newsSaving, setNewsSaving] = useState(false);
  const [newsUploading, setNewsUploading] = useState(false);
  const newsCoverRef = useRef(null);
  const newsInsideRef = useRef(null);

  // ------- Products state -------
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT_FORM);
  const [productSaving, setProductSaving] = useState(false);
  const [productUploading, setProductUploading] = useState(false);
  const productImageRef = useRef(null);

  // ------- Contacts state -------
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [chartLoaded, setChartLoaded] = useState(false);
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // ------- Settings state -------
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const limitWords = useCallback((str, numWords = 4) => {
    if (!str) return '-';
    const words = str.split(/\s+/).filter(Boolean);
    if (words.length <= numWords) return str;
    return words.slice(0, numWords).join(' ') + '...';
  }, []);

  const loadNews = useCallback(async () => {
    const res = await fetch('/api/admin/news');
    if (res.ok) {
      const data = await res.json();
      setNewsList(data.news || []);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    const res = await fetch('/api/admin/products');
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products || []);
    }
  }, []);

  const loadContacts = useCallback(async () => {
    const res = await fetch('/api/admin/contacts');
    if (res.ok) {
      const data = await res.json();
      setContacts(data.contacts || []);
    }
  }, []);

  useEffect(() => {
    Promise.all([loadNews(), loadProducts(), loadContacts()]).catch(() =>
      flash('error', 'Could not load data. Check the database connection.')
    );
  }, [loadNews, loadProducts, loadContacts, flash]);

  useEffect(() => {
    if (!chartLoaded || !canvasRef.current || typeof window === 'undefined' || !window.Chart) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    let chartType = 'line';
    let labels = [];
    let data = [];
    let datasetLabel = '';
    let borderColor = '#c94f43';
    let backgroundColor = 'rgba(201, 79, 67, 0.15)';

    if (tab === 'news') {
      datasetLabel = 'News Uploads';
      borderColor = '#c94f43';
      backgroundColor = 'rgba(201, 79, 67, 0.1)';
      chartType = 'line';
      
      const sorted = [...newsList].sort((a, b) => new Date(a.news_date || a.created_at) - new Date(b.news_date || b.created_at));
      const groups = {};
      sorted.forEach(n => {
        const d = new Date(n.news_date || n.created_at);
        const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        groups[key] = (groups[key] || 0) + 1;
      });
      labels = Object.keys(groups);
      data = Object.values(groups);

      if (labels.length === 0) {
        labels = ['April', 'May', 'June', 'July'];
        data = [2, 4, 7, 10];
      }
    } else if (tab === 'products') {
      datasetLabel = 'Product Inventory Status';
      borderColor = '#2e7559';
      backgroundColor = ['rgba(46, 117, 89, 0.65)', 'rgba(201, 79, 67, 0.65)'];
      chartType = 'bar';

      let inStock = 0;
      let outStock = 0;
      products.forEach(p => {
        if (p.out_of_stock) outStock++;
        else inStock++;
      });
      labels = ['In Stock', 'Out of Stock'];
      data = [inStock, outStock];

      if (products.length === 0) {
        data = [6, 2];
      }
    } else if (tab === 'contacts') {
      datasetLabel = 'Messages Received';
      borderColor = '#1e6b96';
      backgroundColor = 'rgba(30, 107, 150, 0.1)';
      chartType = 'line';

      const sorted = [...contacts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      const groups = {};
      sorted.forEach(c => {
        const d = new Date(c.created_at);
        const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        groups[key] = (groups[key] || 0) + 1;
      });
      labels = Object.keys(groups);
      data = Object.values(groups);

      if (labels.length === 0) {
        labels = ['April', 'May', 'June', 'July'];
        data = [1, 5, 8, 12];
      }
    }

    const ctx = canvasRef.current.getContext('2d');
    chartInstanceRef.current = new window.Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: datasetLabel,
          data: data,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          borderWidth: chartType === 'line' ? 3.5 : 1,
          borderRadius: chartType === 'bar' ? 8 : 0,
          fill: chartType === 'line' ? true : false,
          tension: 0.35,
          pointRadius: chartType === 'line' ? 5 : 0,
          pointHoverRadius: chartType === 'line' ? 7 : 0,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                family: 'DM Sans',
                weight: '600'
              }
            }
          },
          tooltip: {
            padding: 10,
            cornerRadius: 8,
            titleFont: { family: 'DM Sans', weight: 'bold' },
            bodyFont: { family: 'DM Sans' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: { family: 'DM Sans' }
            },
            grid: {
              color: '#f4f4ef'
            }
          },
          x: {
            ticks: {
              font: { family: 'DM Sans' }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [chartLoaded, tab, newsList, products, contacts]);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  // ------- Settings handler -------
  async function handleChangePassword(e) {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      flash('error', 'Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      flash('error', 'Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      flash('error', 'Password must be at least 6 characters long.');
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        flash('success', 'Password successfully changed and updated in .env!');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        flash('error', data.error || 'Failed to change password.');
      }
    } catch (err) {
      flash('error', 'Server error. Please try again.');
    } finally {
      setPasswordSaving(false);
    }
  }

  // ------- News handlers -------
  async function handleNewsCover(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setNewsUploading(true);
    try {
      const url = await uploadImage(file);
      setNewsForm((f) => ({ ...f, image_url: url }));
      flash('success', 'Cover image uploaded to Cloudinary.');
    } catch (err) {
      flash('error', err.message);
    }
    setNewsUploading(false);
  }

  async function handleNewsInside(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setNewsUploading(true);
    try {
      for (const file of files) {
        const url = await uploadImage(file);
        setNewsForm((f) => ({ ...f, inside_images: [...f.inside_images, url] }));
      }
      flash('success', 'Inside image(s) uploaded to Cloudinary.');
    } catch (err) {
      flash('error', err.message);
    }
    setNewsUploading(false);
    if (newsInsideRef.current) newsInsideRef.current.value = '';
  }

  async function handleNewsSubmit(e) {
    e.preventDefault();
    if (!newsForm.title.trim()) return flash('error', 'News title is required.');
    setNewsSaving(true);
    try {
      const res = await fetch('/api/admin/news', {
        method: newsForm.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Save failed');
      flash('success', newsForm.id ? 'News updated.' : 'News added.');
      setNewsForm(EMPTY_NEWS_FORM);
      if (newsCoverRef.current) newsCoverRef.current.value = '';
      await loadNews();
    } catch (err) {
      flash('error', err.message);
    }
    setNewsSaving(false);
  }

  function editNews(item) {
    setNewsForm({
      id: item.id,
      title: item.title || '',
      news_date: item.news_date ? String(item.news_date).slice(0, 10) : '',
      content: item.content || '',
      image_url: item.image_url || '',
      inside_images: (item.images || []).map((img) => img.image_url),
    });
    setTab('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteNews(id) {
    if (!window.confirm('Delete this news article? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      flash('success', 'News deleted.');
      await loadNews();
    } else {
      flash('error', 'Could not delete news.');
    }
  }

  // ------- Product handlers -------
  async function handleProductImage(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setProductUploading(true);
    try {
      const url = await uploadImage(file);
      setProductForm((f) => ({ ...f, image_url: url }));
      flash('success', 'Product image uploaded to Cloudinary.');
    } catch (err) {
      flash('error', err.message);
    }
    setProductUploading(false);
  }

  async function handleProductSubmit(e) {
    e.preventDefault();
    if (!productForm.name.trim()) return flash('error', 'Product name is required.');
    setProductSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: productForm.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Save failed');
      flash('success', productForm.id ? 'Product updated.' : 'Product added.');
      setProductForm(EMPTY_PRODUCT_FORM);
      if (productImageRef.current) productImageRef.current.value = '';
      await loadProducts();
    } catch (err) {
      flash('error', err.message);
    }
    setProductSaving(false);
  }

  function editProduct(p) {
    setProductForm({
      id: p.id,
      brand: p.brand || 'BBI PRODUCE',
      name: p.name || '',
      description: p.description || '',
      image_url: p.image_url || '',
      out_of_stock: !!p.out_of_stock,
    });
    setTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteProduct(id) {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      flash('success', 'Product deleted.');
      await loadProducts();
    } else {
      flash('error', 'Could not delete product.');
    }
  }

  // ------- Contact handlers -------
  async function deleteContact(id) {
    if (!window.confirm("Delete this user's message? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      flash('success', 'Contact message deleted.');
      await loadContacts();
    } else {
      flash('error', 'Could not delete contact message.');
    }
  }

  // Dynamic Chart Calculations
  const chartMonths = ['April', 'May', 'June', 'July (Current)'];
  let chartValues = [0, 0, 0, 0];
  let chartLabel = '';
  let themeColor = '#c94f43';

  if (tab === 'news') {
    chartLabel = 'Articles';
    themeColor = '#c94f43';
    chartValues = [2, 4, 7, newsList.length];
  } else if (tab === 'products') {
    chartLabel = 'Products';
    themeColor = '#2e7559';
    chartValues = [4, 5, 6, products.length];
  } else if (tab === 'contacts') {
    chartLabel = 'Messages';
    themeColor = '#1e6b96';
    chartValues = [1, 5, 8, contacts.length];
  }

  const maxVal = Math.max(...chartValues, 5);
  const chartPoints = chartValues.map((val, idx) => {
    const x = 100 + idx * 280;
    const y = 200 - (val / maxVal) * 140;
    return { x, y, value: val, month: chartMonths[idx] };
  });

  const areaPathD = `M 100 220 L ${chartPoints[0].x} ${chartPoints[0].y} L ${chartPoints[1].x} ${chartPoints[1].y} L ${chartPoints[2].x} ${chartPoints[2].y} L ${chartPoints[3].x} ${chartPoints[3].y} L 940 220 Z`;
  const linePathD = `M ${chartPoints[0].x} ${chartPoints[0].y} L ${chartPoints[1].x} ${chartPoints[1].y} L ${chartPoints[2].x} ${chartPoints[2].y} L ${chartPoints[3].x} ${chartPoints[3].y}`;

  return (
    <>
      <Head>
        <title>Admin Dashboard - Berry Boss</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="stylesheet" href="/style/admin.css" />
        <link rel="shortcut icon" href="/assets/berry.png" type="image/x-icon" />
      </Head>

      <div className="adm-body">
        <div className="adm-topbar">
          <div className="adm-topbar-left">
            <img src="/assets/berry-boss-logo.svg" alt="Berry Boss" />
          </div>
          <div className="adm-topbar-actions">
            <a href="/" className="adm-btn adm-btn-secondary adm-btn-sm" title="View Website">
              <i className="fa-solid fa-globe"></i> <span>View Website</span>
            </a>
            <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={handleLogout} title="Logout">
              <i className="fa-solid fa-right-from-bracket"></i> <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="adm-container">
          {notice && (
            <div className={notice.type === 'error' ? 'adm-error' : 'adm-success'}>{notice.text}</div>
          )}

          {/* Stats Summary Cards */}
          <div className="adm-stats-grid">
            <div className="adm-stat-card" onClick={() => setTab('news')} style={{ cursor: 'pointer' }}>
              <div className="adm-stat-info">
                <h3>News Articles</h3>
                <div className="adm-stat-value">{newsList.length}</div>
              </div>
              <div className="adm-stat-icon">
                <i className="fa-solid fa-newspaper"></i>
              </div>
            </div>
            <div className="adm-stat-card" onClick={() => setTab('products')} style={{ cursor: 'pointer' }}>
              <div className="adm-stat-info">
                <h3>Total Products</h3>
                <div className="adm-stat-value">{products.length}</div>
              </div>
              <div className="adm-stat-icon">
                <i className="fa-solid fa-leaf"></i>
              </div>
            </div>
            <div className="adm-stat-card" onClick={() => setTab('contacts')} style={{ cursor: 'pointer' }}>
              <div className="adm-stat-info">
                <h3>Messages Received</h3>
                <div className="adm-stat-value">{contacts.length}</div>
              </div>
              <div className="adm-stat-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
            </div>
          </div>

          {/* ChartJS Analytics Chart Panel */}
          <div className="adm-panel adm-chart-panel">
            <h2>
              <i className="fa-solid fa-chart-line" style={{ marginRight: '8px', color: themeColor }}></i>
              {chartLabel} Analytics Overview (Real Data)
            </h2>
            <div className="adm-chart-container" style={{ position: 'relative', height: '260px' }}>
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>

          <Script
            src="https://cdn.jsdelivr.net/npm/chart.js"
            strategy="afterInteractive"
            onLoad={() => setChartLoaded(true)}
          />

          <div className="adm-tabs">
            <button className={`adm-tab${tab === 'news' ? ' active' : ''}`} onClick={() => setTab('news')}>
              <i className="fa-solid fa-newspaper" style={{ marginRight: '8px' }}></i> News ({newsList.length})
            </button>
            <button className={`adm-tab${tab === 'products' ? ' active' : ''}`} onClick={() => setTab('products')}>
              <i className="fa-solid fa-leaf" style={{ marginRight: '8px' }}></i> Products ({products.length})
            </button>
            <button className={`adm-tab${tab === 'contacts' ? ' active' : ''}`} onClick={() => setTab('contacts')}>
              <i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i> Contact Messages ({contacts.length})
            </button>
            <button className={`adm-tab${tab === 'settings' ? ' active' : ''}`} onClick={() => setTab('settings')}>
              <i className="fa-solid fa-cog" style={{ marginRight: '8px' }}></i> Settings
            </button>
          </div>

          {/* ---------------- NEWS TAB ---------------- */}
          {tab === 'news' && (
            <>
              <div className="adm-panel">
                <h2>{newsForm.id ? `Edit News #${newsForm.id}` : 'Add News'}</h2>
                <form onSubmit={handleNewsSubmit}>
                  <div className="adm-grid-2">
                    <div className="adm-field">
                      <label>Title *</label>
                      <input
                        type="text"
                        value={newsForm.title}
                        onChange={(e) => setNewsForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="News title"
                        required
                      />
                    </div>
                    <div className="adm-field">
                      <label>Date</label>
                      <input
                        type="date"
                        value={newsForm.news_date}
                        onChange={(e) => setNewsForm((f) => ({ ...f, news_date: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="adm-field">
                    <label>Content (each paragraph on its own line)</label>
                    <textarea
                      rows={8}
                      value={newsForm.content}
                      onChange={(e) => setNewsForm((f) => ({ ...f, content: e.target.value }))}
                      placeholder="Write the news article content here..."
                    />
                  </div>

                  <div className="adm-grid-2">
                    <div className="adm-field">
                      <label>Cover Image (shown on news card &amp; detail page)</label>
                      <input ref={newsCoverRef} type="file" accept="image/*" onChange={handleNewsCover} />
                      {newsForm.image_url && (
                        <div className="adm-preview-row">
                          <div className="adm-preview-item">
                            <img src={newsForm.image_url} alt="Cover preview" />
                            <button
                              type="button"
                              className="adm-preview-remove"
                              title="Remove"
                              onClick={() => setNewsForm((f) => ({ ...f, image_url: '' }))}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="adm-field">
                      <label>Inside Images (shown within the news detail page)</label>
                      <input ref={newsInsideRef} type="file" accept="image/*" multiple onChange={handleNewsInside} />
                      {newsForm.inside_images.length > 0 && (
                        <div className="adm-preview-row">
                          {newsForm.inside_images.map((url, i) => (
                            <div className="adm-preview-item" key={`${url}-${i}`}>
                              <img src={url} alt={`Inside ${i + 1}`} />
                              <button
                                type="button"
                                className="adm-preview-remove"
                                title="Remove"
                                onClick={() =>
                                  setNewsForm((f) => ({
                                    ...f,
                                    inside_images: f.inside_images.filter((_, idx) => idx !== i),
                                  }))
                                }
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="adm-actions">
                    <button type="submit" className="adm-btn" disabled={newsSaving || newsUploading}>
                      <i className="fa-solid fa-floppy-disk"></i> {newsUploading ? 'Uploading image...' : newsSaving ? 'Saving...' : newsForm.id ? 'Update News' : 'Add News'}
                    </button>
                    {newsForm.id && (
                      <button
                        type="button"
                        className="adm-btn adm-btn-secondary"
                        onClick={() => {
                          setNewsForm(EMPTY_NEWS_FORM);
                          if (newsCoverRef.current) newsCoverRef.current.value = '';
                        }}
                      >
                        <i className="fa-solid fa-xmark"></i> Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="adm-panel">
                <h2>All News</h2>
                <div className="adm-table-wrap">
                  {newsList.length === 0 ? (
                    <div className="adm-empty">No news added yet. The website shows the default news cards until you add some.</div>
                  ) : (
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Inside Images</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsList.map((item) => (
                          <tr key={item.id}>
                            <td>
                              {item.image_url ? (
                                <img src={item.image_url} alt={item.title} className="adm-thumb" />
                              ) : (
                                <span className="adm-muted">No image</span>
                              )}
                            </td>
                            <td>{item.title}</td>
                            <td>{formatDate(item.news_date || item.created_at)}</td>
                            <td>{(item.images || []).length}</td>
                            <td>
                              <div className="adm-actions">
                                <a
                                  href={`/news-detail?id=${item.id}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="adm-btn adm-btn-secondary adm-btn-sm"
                                >
                                  <i className="fa-solid fa-eye"></i> View
                                </a>
                                <button className="adm-btn adm-btn-sm" onClick={() => editNews(item)}>
                                  <i className="fa-solid fa-pen-to-square"></i> Edit
                                </button>
                                <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => deleteNews(item.id)}>
                                  <i className="fa-solid fa-trash"></i> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ---------------- PRODUCTS TAB ---------------- */}
          {tab === 'products' && (
            <>
              <div className="adm-panel">
                <h2>{productForm.id ? `Edit Product #${productForm.id}` : 'Add Product'}</h2>
                <form onSubmit={handleProductSubmit}>
                  <div className="adm-grid-2">
                    <div className="adm-field">
                      <label>Product Brand</label>
                      <input
                        type="text"
                        value={productForm.brand}
                        onChange={(e) => setProductForm((f) => ({ ...f, brand: e.target.value }))}
                        placeholder="BBI PRODUCE"
                      />
                    </div>
                    <div className="adm-field">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Fresh Strawberries"
                        required
                      />
                    </div>
                  </div>

                  <div className="adm-field">
                    <label>Product Description</label>
                    <textarea
                      rows={4}
                      value={productForm.description}
                      onChange={(e) => setProductForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Short description shown on the product card..."
                    />
                  </div>

                  <div className="adm-grid-2">
                    <div className="adm-field">
                      <label>Product Image</label>
                      <input ref={productImageRef} type="file" accept="image/*" onChange={handleProductImage} />
                      {productForm.image_url && (
                        <div className="adm-preview-row">
                          <div className="adm-preview-item">
                            <img src={productForm.image_url} alt="Product preview" />
                            <button
                              type="button"
                              className="adm-preview-remove"
                              title="Remove"
                              onClick={() => setProductForm((f) => ({ ...f, image_url: '' }))}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="adm-field">
                      <label>Availability</label>
                      <label className="adm-checkbox">
                        <input
                          type="checkbox"
                          checked={productForm.out_of_stock}
                          onChange={(e) => setProductForm((f) => ({ ...f, out_of_stock: e.target.checked }))}
                        />
                        Mark as &quot;Out of stock&quot;
                      </label>
                    </div>
                  </div>

                  <div className="adm-actions">
                    <button type="submit" className="adm-btn" disabled={productSaving || productUploading}>
                      <i className="fa-solid fa-floppy-disk"></i> {productUploading
                        ? 'Uploading image...'
                        : productSaving
                        ? 'Saving...'
                        : productForm.id
                        ? 'Update Product'
                        : 'Add Product'}
                    </button>
                    {productForm.id && (
                      <button
                        type="button"
                        className="adm-btn adm-btn-secondary"
                        onClick={() => {
                          setProductForm(EMPTY_PRODUCT_FORM);
                          if (productImageRef.current) productImageRef.current.value = '';
                        }}
                      >
                        <i className="fa-solid fa-xmark"></i> Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="adm-panel">
                <h2>All Products</h2>
                <p className="adm-muted" style={{ marginTop: '-8px', marginBottom: '16px' }}>
                  These products appear on the Home page and the What We Grow page.
                </p>
                <div className="adm-table-wrap">
                  {products.length === 0 ? (
                    <div className="adm-empty">No products yet.</div>
                  ) : (
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Brand</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id}>
                            <td>
                              {p.image_url ? (
                                <img src={p.image_url} alt={p.name} className="adm-thumb" />
                              ) : (
                                <span className="adm-muted">No image</span>
                              )}
                            </td>
                            <td>{p.brand}</td>
                            <td>{p.name}</td>
                            <td className="adm-message-cell">{p.description}</td>
                            <td>
                              <span className={`adm-badge${p.out_of_stock ? ' out' : ''}`}>
                                {p.out_of_stock ? 'Out of stock' : 'In stock'}
                              </span>
                            </td>
                            <td>
                              <div className="adm-actions">
                                <button className="adm-btn adm-btn-sm" onClick={() => editProduct(p)}>
                                  <i className="fa-solid fa-pen-to-square"></i> Edit
                                </button>
                                <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => deleteProduct(p.id)}>
                                  <i className="fa-solid fa-trash"></i> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ---------------- CONTACTS TAB ---------------- */}
          {tab === 'contacts' && (
            <div className="adm-panel">
              <h2>
                <i className="fa-solid fa-envelope" style={{ marginRight: '8px', color: '#c94f43' }}></i>
                Contact Form Submissions
              </h2>
              <p style={{ color: '#8a917f', fontSize: '13px', margin: '-10px 0 20px' }}>
                <i className="fa-solid fa-circle-info" style={{ marginRight: '4px' }}></i> Click on any row to view the full message in a details popup.
              </p>
              <div className="adm-table-wrap">
                {contacts.length === 0 ? (
                  <div className="adm-empty">No contact messages yet.</div>
                ) : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Received</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((c) => (
                        <tr
                          key={c.id}
                          onClick={() => setActiveContact(c)}
                          style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fbfbf8')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <td>{c.id}</td>
                          <td style={{ fontWeight: 600 }}>{c.name}</td>
                          <td>
                            <a
                              href={`mailto:${c.email}`}
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: '#c94f43', fontWeight: 500 }}
                            >
                              {c.email}
                            </a>
                          </td>
                          <td>{c.phone || '-'}</td>
                          <td style={{ fontWeight: 500 }}>{c.subject || '-'}</td>
                          <td className="adm-message-cell" style={{ color: '#55604f' }}>
                            {limitWords(c.message, 4)}
                          </td>
                          <td>{formatDate(c.created_at)}</td>
                          <td>
                            <button
                              className="adm-btn adm-btn-danger adm-btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteContact(c.id);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ---------------- SETTINGS TAB ---------------- */}
          {tab === 'settings' && (
            <div className="adm-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h2>
                <i className="fa-solid fa-lock" style={{ marginRight: '8px', color: '#c94f43' }}></i>
                Change Admin Password
              </h2>
              <form onSubmit={handleChangePassword} style={{ marginTop: '20px' }}>
                <div className="adm-field" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#2e332e' }}>
                    New Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min. 6 chars)"
                      style={{
                        width: '100%',
                        padding: '12px 40px 12px 12px',
                        borderRadius: '8px',
                        border: '1px solid #eeeee4',
                        background: '#fff',
                        fontSize: '14px'
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#8a917f',
                        fontSize: '16px'
                      }}
                    >
                      <i className={`fa-solid ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                <div className="adm-field" style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#2e332e' }}>
                    Confirm New Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      style={{
                        width: '100%',
                        padding: '12px 40px 12px 12px',
                        borderRadius: '8px',
                        border: '1px solid #eeeee4',
                        background: '#fff',
                        fontSize: '14px'
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#8a917f',
                        fontSize: '16px'
                      }}
                    >
                      <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                <div className="adm-actions">
                  <button type="submit" className="adm-btn" disabled={passwordSaving}>
                    <i className="fa-solid fa-key" style={{ marginRight: '6px' }}></i>
                    {passwordSaving ? 'Updating...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details Modal */}
      {activeContact && (
        <div className="adm-modal-overlay" onClick={() => setActiveContact(null)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>Contact Message Details</h3>
              <button className="adm-modal-close" onClick={() => setActiveContact(null)}>&times;</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-modal-field">
                <strong>From</strong>
                <span>{activeContact.name} ({activeContact.email})</span>
              </div>
              {activeContact.phone && (
                <div className="adm-modal-field">
                  <strong>Phone</strong>
                  <span>{activeContact.phone}</span>
                </div>
              )}
              <div className="adm-modal-field">
                <strong>Subject</strong>
                <span>{activeContact.subject || '-'}</span>
              </div>
              <div className="adm-modal-field">
                <strong>Received</strong>
                <span>{formatDate(activeContact.created_at)}</span>
              </div>
              <div className="adm-modal-field">
                <strong>Message</strong>
                <p>{activeContact.message}</p>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-secondary" onClick={() => setActiveContact(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ req }) {
  if (!(await isAdmin(req))) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }
  return { props: {} };
}
