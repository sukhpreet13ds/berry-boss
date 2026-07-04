const bcrypt = require('bcryptjs');
const { getDb } = require('../../../lib/db');
const { loginCookie } = require('../../../lib/auth');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};

  try {
    const db = await getDb();
    const [rows] = await db.query('SELECT email, password_hash FROM admins LIMIT 1');
    if (!rows.length) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const admin = rows[0];

    if (
      email === admin.email &&
      password &&
      bcrypt.compareSync(password, admin.password_hash)
    ) {
      res.setHeader('Set-Cookie', loginCookie(admin.email, admin.password_hash));
      return res.status(200).json({ ok: true });
    }
  } catch (err) {
    console.error('Login database check failed:', err.message);
  }

  return res.status(401).json({ error: 'Invalid email or password.' });
}
