const express = require('express');
const router = express.Router();
const home = require('../controller/homeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/home',authMiddleware, home);

module.exports = router;