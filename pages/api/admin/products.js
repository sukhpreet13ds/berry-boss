const { getDb } = require('../../../lib/db');
const { requireAdmin } = require('../../../lib/auth');

export default async function handler(req, res) {
  if (!(await requireAdmin(req, res))) return;

  try {
    const db = await getDb();

    if (req.method === 'GET') {
      const [products] = await db.query('SELECT * FROM products ORDER BY created_at DESC, id DESC');
      return res.status(200).json({ products: JSON.parse(JSON.stringify(products)) });
    }

    if (req.method === 'POST') {
      const { brand, name, description, image_url, out_of_stock } = req.body || {};
      if (!name) return res.status(400).json({ error: 'Product name is required.' });
      const [result] = await db.query(
        'INSERT INTO products (brand, name, description, image_url, out_of_stock) VALUES (?, ?, ?, ?, ?)',
        [brand || 'BBI PRODUCE', name, description || '', image_url || null, out_of_stock ? 1 : 0]
      );
      return res.status(200).json({ ok: true, id: result.insertId });
    }

    if (req.method === 'PUT') {
      const { id, brand, name, description, image_url, out_of_stock } = req.body || {};
      if (!id || !name) return res.status(400).json({ error: 'Id and name are required.' });
      await db.query(
        'UPDATE products SET brand = ?, name = ?, description = ?, image_url = ?, out_of_stock = ? WHERE id = ?',
        [brand || 'BBI PRODUCE', name, description || '', image_url || null, out_of_stock ? 1 : 0, id]
      );
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) return res.status(400).json({ error: 'Id is required.' });
      await db.query('DELETE FROM products WHERE id = ?', [id]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('admin products api failed:', err.message);
    return res.status(500).json({ error: 'Database operation failed.' });
  }
}
