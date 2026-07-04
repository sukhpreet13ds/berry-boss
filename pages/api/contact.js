const { getDb } = require('../../lib/db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    const db = await getDb();
    await db.query(
      'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [String(name).slice(0, 255), String(email).slice(0, 255), phone ? String(phone).slice(0, 50) : null, subject ? String(subject).slice(0, 255) : null, String(message)]
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact save failed:', err.message);
    return res.status(500).json({ error: 'Could not save your message. Please try again later.' });
  }
}
