const bcrypt = require('bcryptjs');
const { getDb } = require('../../../lib/db');
const { requireAdmin } = require('../../../lib/auth');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Authenticate Admin
  if (!(await requireAdmin(req, res))) return;

  const { newPassword, confirmPassword } = req.body || {};

  // 2. Validate Input
  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'Please enter both password fields.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New password and confirm password do not match.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  try {
    // 3. Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    // 4. Update the database
    const db = await getDb();
    await db.query('UPDATE admins SET password_hash = ? LIMIT 1', [newHash]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Change password failed:', err.message);
    return res.status(500).json({ error: 'Internal server error while saving password.' });
  }
}
