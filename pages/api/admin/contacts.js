const { getDb } = require('../../../lib/db');
const { requireAdmin } = require('../../../lib/auth');

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    const db = await getDb();

    if (req.method === 'GET') {
      const [contacts] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
      return res.status(200).json({ contacts: JSON.parse(JSON.stringify(contacts)) });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) return res.status(400).json({ error: 'Id is required.' });
      await db.query('DELETE FROM contacts WHERE id = ?', [id]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('admin contacts api failed:', err.message);
    return res.status(500).json({ error: 'Database operation failed.' });
  }
}
