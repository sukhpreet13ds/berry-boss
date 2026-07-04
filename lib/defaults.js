// Original hard-coded site content, used to seed the database and as a
// fallback when the database is unreachable, so the design never breaks.

const DEFAULT_PRODUCTS = [
  {
    id: 'default-1',
    brand: 'BBI PRODUCE',
    name: 'Fresh Strawberries',
    description:
      'Bright, juicy, and irresistibly sweet. Our strawberries are picked fresh at the peak of ripeness every morning.',
    image_url: '/assets/product1.png',
    out_of_stock: 0,
  },
  {
    id: 'default-2',
    brand: 'BBI PRODUCE',
    name: 'Blackberries',
    description:
      'Deep, bold, and tangy-sweet. Our blackberries carry the wild richness of farm-grown perfection.',
    image_url: '/assets/product2.png',
    out_of_stock: 1,
  },
  {
    id: 'default-3',
    brand: 'BBI PRODUCE',
    name: 'Watermelons',
    description:
      'Massive, crisp, and wonderfully refreshing. The kind you remember from childhood summers.',
    image_url: '/assets/product3.png',
    out_of_stock: 0,
  },
  {
    id: 'default-4',
    brand: 'BBI PRODUCE',
    name: 'Cantaloupes',
    description:
      'Fragrant and honey-golden inside. Our cantaloupes are grown slow for maximum sweetness.',
    image_url: '/assets/product4.png',
    out_of_stock: 0,
  },
];

const DEFAULT_NEWS = [
  { id: 'default-1', title: 'Strawberry Harvest Season Officially Begins at Berry Boss Farm...', image_url: '/assets/post1.png', date: '12-06-2026' },
  { id: 'default-2', title: "This Year's Blackberry Crop Shows Exceptional Quality", image_url: '/assets/post2.png', date: '12-06-2026' },
  { id: 'default-3', title: "How Watermelons Grow: A Farmer's Perspective", image_url: '/assets/post3.png', date: '12-06-2026' },
  { id: 'default-4', title: 'How Farmers Know When a Cantaloupe Is Ready to Harvest', image_url: '/assets/post4.png', date: '12-06-2026' },
  { id: 'default-5', title: 'Sustainable Farming Practices That Protect Our Land', image_url: '/assets/post5.png', date: '12-06-2026' },
  { id: 'default-6', title: 'Fresh Strawberries vs Frozen Strawberries: Which Is Better?', image_url: '/assets/post6.png', date: '12-06-2026' },
  { id: 'default-7', title: 'Top 10 Fruits to Eat During Summer', image_url: '/assets/post7.png', date: '12-06-2026' },
  { id: 'default-8', title: 'Delicious Recipes Using Fresh Blackberries', image_url: '/assets/post8.png', date: '12-06-2026' },
  { id: 'default-9', title: 'The Difference Between Farm-Fresh and Store-Bought Strawberries', image_url: '/assets/post9.png', date: '12-06-2026' },
  { id: 'default-10', title: "Record Harvest Expected for This Year's Cantaloupe Crop", image_url: '/assets/post10.png', date: '12-06-2026' },
];

function formatNewsDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${d.getFullYear()}`;
}

module.exports = { DEFAULT_PRODUCTS, DEFAULT_NEWS, formatNewsDate };
