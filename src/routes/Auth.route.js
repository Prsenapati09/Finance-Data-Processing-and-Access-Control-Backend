const express = require('express');
const router = express.Router();
const authController = require('../controller/Auth.controller');

// Standard Public Authentication Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;