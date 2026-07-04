const mysql = require('mysql2/promise');
const { DEFAULT_PRODUCTS } = require('./defaults');

let pool;
let schemaReady;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 8000,
    });
  }
  return pool;
}

async function ensureSchema() {
  const db = getPool();
  await db.query(`CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(120) NOT NULL DEFAULT 'BBI PRODUCE',
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    out_of_stock TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await db.query(`CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content LONGTEXT,
    image_url VARCHAR(500),
    news_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await db.query(`CREATE TABLE IF NOT EXISTS news_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_news_images_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await db.query(`CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await db.query(`CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  // Seed default admin if table is empty
  const [adminRows] = await db.query('SELECT COUNT(*) AS cnt FROM admins');
  if (adminRows[0].cnt === 0) {
    const defaultEmail = 'admin@example.com';
    const defaultHash = '$2b$10$oZ/Xq1AmiZqYQdH3o0T21.tHC3uPnQ9UNLkluedzR.MRsI0WwDOzi'; // berryboss$123
    await db.query(
      'INSERT INTO admins (email, password_hash) VALUES (?, ?)',
      [defaultEmail, defaultHash]
    );
  }

  // Seed products with the site's original 4 items so the design stays intact
  const [rows] = await db.query('SELECT COUNT(*) AS cnt FROM products');
  if (rows[0].cnt === 0) {
    for (const p of DEFAULT_PRODUCTS) {
      await db.query(
        'INSERT INTO products (brand, name, description, image_url, out_of_stock) VALUES (?, ?, ?, ?, ?)',
        [p.brand, p.name, p.description, p.image_url, p.out_of_stock ? 1 : 0]
      );
    }
  }
}

async function getDb() {
  if (!schemaReady) {
    schemaReady = ensureSchema().catch((err) => {
      schemaReady = undefined; // retry on next call
      throw err;
    });
  }
  await schemaReady;
  return getPool();
}

module.exports = { getDb };
