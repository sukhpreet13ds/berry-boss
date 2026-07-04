const { getDb } = require('../../../lib/db');
const { requireAdmin } = require('../../../lib/auth');

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    const db = await getDb();

    if (req.method === 'GET') {
      const [news] = await db.query('SELECT * FROM news ORDER BY created_at DESC');
      const [images] = await db.query('SELECT * FROM news_images ORDER BY id ASC');
      const withImages = news.map((n) => ({
        ...n,
        images: images.filter((img) => img.news_id === n.id),
      }));
      return res.status(200).json({ news: JSON.parse(JSON.stringify(withImages)) });
    }

    if (req.method === 'POST') {
      const { title, content, image_url, news_date, inside_images } = req.body || {};
      if (!title) return res.status(400).json({ error: 'Title is required.' });
      const [result] = await db.query(
        'INSERT INTO news (title, content, image_url, news_date) VALUES (?, ?, ?, ?)',
        [title, content || '', image_url || null, news_date || new Date().toISOString().slice(0, 10)]
      );
      const newsId = result.insertId;
      if (Array.isArray(inside_images)) {
        for (const url of inside_images) {
          if (url) await db.query('INSERT INTO news_images (news_id, image_url) VALUES (?, ?)', [newsId, url]);
        }
      }
      return res.status(200).json({ ok: true, id: newsId });
    }

    if (req.method === 'PUT') {
      const { id, title, content, image_url, news_date, inside_images } = req.body || {};
      if (!id || !title) return res.status(400).json({ error: 'Id and title are required.' });
      await db.query(
        'UPDATE news SET title = ?, content = ?, image_url = ?, news_date = ? WHERE id = ?',
        [title, content || '', image_url || null, news_date || null, id]
      );
      if (Array.isArray(inside_images)) {
        await db.query('DELETE FROM news_images WHERE news_id = ?', [id]);
        for (const url of inside_images) {
          if (url) await db.query('INSERT INTO news_images (news_id, image_url) VALUES (?, ?)', [id, url]);
        }
      }
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) return res.status(400).json({ error: 'Id is required.' });
      await db.query('DELETE FROM news WHERE id = ?', [id]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('admin news api failed:', err.message);
    return res.status(500).json({ error: 'Database operation failed.' });
  }
}
