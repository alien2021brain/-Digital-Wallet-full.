const upload = require('../middleware/multer.js');
const express = require('express');
const router = express.Router();
const { handleSingleUpload } = require('../controller/handleUpload.js');
const authorization = require('../middleware/token.js');
router.post('/single', upload.single('file'), handleSingleUpload);
// router.patch(
//   '/single',
//   authorization,
//   upload.single('file'),
//   handleSingleUpload
// );

module.exports = router;
