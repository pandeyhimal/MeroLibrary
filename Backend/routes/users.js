const express = require('express');
const { getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/me', auth, getProfile);

module.exports = router; 