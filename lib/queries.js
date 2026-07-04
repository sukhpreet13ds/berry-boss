const { getDb } = require('./db');
const { DEFAULT_PRODUCTS, DEFAULT_NEWS, formatNewsDate } = require('./defaults');

// Every fetcher falls back to the original hard-coded site content when the
// database is empty or unreachable, so the public pages never break.

async function fetchProducts() {
  try {
    const db = await getDb();
    const [rows] = await db.query(
      'SELECT id, brand, name, description, image_url, out_of_stock FROM products ORDER BY id ASC'
    );
    if (rows.length) return JSON.parse(JSON.stringify(rows));
  } catch (err) {
    console.error('fetchProducts: using default products —', err.message);
  }
  return DEFAULT_PRODUCTS;
}

async function fetchNewsList() {
  try {
    const db = await getDb();
    const [rows] = await db.query(
      'SELECT id, title, content, image_url, news_date, created_at FROM news ORDER BY news_date DESC, id DESC'
    );
    if (rows.length) {
      return rows.map((r) => ({
        id: r.id,
        title: r.title,
        content: r.content || '',
        image_url: r.image_url || '/assets/post1.png',
        date: formatNewsDate(r.news_date || r.created_at),
      }));
    }
  } catch (err) {
    console.error('fetchNewsList: using default news —', err.message);
  }
  return DEFAULT_NEWS;
}

async function fetchNewsById(id) {
  if (!id || isNaN(Number(id))) return null;
  try {
    const db = await getDb();
    const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [id]);
    if (!rows.length) return null;
    const [imgs] = await db.query(
      'SELECT image_url FROM news_images WHERE news_id = ? ORDER BY id ASC',
      [id]
    );
    const n = rows[0];
    return {
      id: n.id,
      title: n.title,
      content: n.content || '',
      image_url: n.image_url || null,
      date: formatNewsDate(n.news_date || n.created_at),
      images: imgs.map((i) => i.image_url),
    };
  } catch (err) {
    console.error('fetchNewsById failed —', err.message);
    return null;
  }
}

module.exports = { fetchProducts, fetchNewsList, fetchNewsById };
