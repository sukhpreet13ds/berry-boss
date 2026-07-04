const crypto = require('crypto');

const COOKIE_NAME = 'bb_admin';

function adminToken() {
  return crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'berryboss-secret')
    .update(`${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}`)
    .digest('hex');
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return header.split(';').reduce((acc, part) => {
    const idx = part.indexOf('=');
    if (idx > -1) acc[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
    return acc;
  }, {});
}

function isAdmin(req) {
  return parseCookies(req)[COOKIE_NAME] === adminToken();
}

function loginCookie() {
  return `${COOKIE_NAME}=${adminToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
}

function logoutCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

function requireAdmin(req, res) {
  if (!isAdmin(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

module.exports = { isAdmin, loginCookie, logoutCookie, requireAdmin, COOKIE_NAME };
