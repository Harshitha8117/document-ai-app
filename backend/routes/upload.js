const express = require('express');
const multer = require('multer');
const path = require('path');
const { processDocument } = require('../services/nlpProcessor');

const router = express.Router();

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST /api/upload
router.post('/upload', upload.single('document'), async (req, res) => {
  try {
    const { action, pageRange, summaryStyle } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await processDocument(req.file.path, action, pageRange, summaryStyle);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Processing failed', error: err.message });
  }
});

module.exports = router;
