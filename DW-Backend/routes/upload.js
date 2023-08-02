const upload = require('../middleware/multer.js');
const express = require('express');
const router = express.Router();
const { handleSingleUpload } = require('../controller/handleUpload.js');
router.post('/single', upload.single('file'), handleSingleUpload);

module.exports = router;
