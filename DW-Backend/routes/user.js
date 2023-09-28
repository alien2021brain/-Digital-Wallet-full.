const express = require('express');
const router = express.Router();
const authorization = require('../middleware/token.js');
const { updateUserProfile } = require('../controller/user.js');

router.patch('/update/profile', authorization, updateUserProfile);

module.exports = router;
