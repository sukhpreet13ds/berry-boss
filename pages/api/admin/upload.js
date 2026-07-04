const { formidable } = require('formidable');
const cloudinary = require('../../../lib/cloudinary');
const { requireAdmin } = require('../../../lib/auth');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({ maxFileSize: 15 * 1024 * 1024 });
    const [, files] = await form.parse(req);
    const fileEntry = files.file || files.image;
    const file = Array.isArray(fileEntry) ? fileEntry[0] : fileEntry;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded. Use the "file" field.' });
    }

    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'berry-boss',
      resource_type: 'image',
    });

    return res.status(200).json({ ok: true, url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error('cloudinary upload failed:', err.message);
    return res.status(500).json({ error: 'Image upload failed.' });
  }
}
