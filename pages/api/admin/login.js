const { loginCookie } = require('../../../lib/auth');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    res.setHeader('Set-Cookie', loginCookie());
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: 'Invalid email or password.' });
}
