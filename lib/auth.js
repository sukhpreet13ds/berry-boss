const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const COOKIE_NAME = 'bb_admin';

let envConfig = {};
try {
  const envPath = path.join(process.cwd(), '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1].trim();
      let value = (match[2] || '').trim();
      value = value.replace(/^['"]|['"]$/g, '');
      value = value.replace(/\\(\$)/g, '$1');
      envConfig[key] = value;
    }
  });
} catch (e) {
  // ignore
}

const getAdminEmail = () => envConfig.ADMIN_EMAIL || process.env.ADMIN_EMAIL || '';
const getAdminPasswordHash = () => envConfig.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD_HASH || '';

function adminToken(email, passwordHash) {
  return crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'berryboss-123-fruits')
    .update(`${email}:${passwordHash}`)
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

async function isAdmin(req) {
  const token = parseCookies(req)[COOKIE_NAME];
  if (!token) return false;
  
  const { getDb } = require('./db');
  try {
    const db = await getDb();
    const [rows] = await db.query('SELECT email, password_hash FROM admins LIMIT 1');
    if (!rows.length) return false;
    const admin = rows[0];
    return token === adminToken(admin.email, admin.password_hash);
  } catch (e) {
    return false;
  }
}

function loginCookie(email, passwordHash) {
  return `${COOKIE_NAME}=${adminToken(email, passwordHash)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
}

function logoutCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

async function requireAdmin(req, res) {
  const authorized = await isAdmin(req);
  if (!authorized) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

module.exports = { isAdmin, loginCookie, logoutCookie, requireAdmin, COOKIE_NAME, getAdminEmail, getAdminPasswordHash };
