import Head from 'next/head';
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

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
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
            <h1>Admin Dashboard</h1>
          </div>
          <div className="adm-topbar-actions">
            <a href="/" className="adm-btn adm-btn-secondary adm-btn-sm">View Website</a>
            <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="adm-container">
          {notice && (
            <div className={notice.type === 'error' ? 'adm-error' : 'adm-success'}>{notice.text}</div>
          )}

          <div className="adm-tabs">
            <button className={`adm-tab${tab === 'news' ? ' active' : ''}`} onClick={() => setTab('news')}>
              News ({newsList.length})
            </button>
            <button className={`adm-tab${tab === 'products' ? ' active' : ''}`} onClick={() => setTab('products')}>
              Products ({products.length})
            </button>
            <button className={`adm-tab${tab === 'contacts' ? ' active' : ''}`} onClick={() => setTab('contacts')}>
              Contact Messages ({contacts.length})
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
                      {newsUploading ? 'Uploading image...' : newsSaving ? 'Saving...' : newsForm.id ? 'Update News' : 'Add News'}
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
                        Cancel Edit
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
                                  View
                                </a>
                                <button className="adm-btn adm-btn-sm" onClick={() => editNews(item)}>Edit</button>
                                <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => deleteNews(item.id)}>
                                  Delete
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
                      {productUploading
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
                        Cancel Edit
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
                                <button className="adm-btn adm-btn-sm" onClick={() => editProduct(p)}>Edit</button>
                                <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => deleteProduct(p.id)}>
                                  Delete
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
              <h2>Contact Form Submissions</h2>
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
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td>{c.name}</td>
                          <td>
                            <a href={`mailto:${c.email}`}>{c.email}</a>
                          </td>
                          <td>{c.phone || '-'}</td>
                          <td>{c.subject || '-'}</td>
                          <td className="adm-message-cell">{c.message}</td>
                          <td>{formatDate(c.created_at)}</td>
                          <td>
                            <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => deleteContact(c.id)}>
                              Delete
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
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  if (!isAdmin(req)) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }
  return { props: {} };
}
