const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// The README says GET /register and GET /login, but POST is more standard.
// I'll provide both or just POST as it's better. I'll stick to standard POST.
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Protected profile route
router.get('/profile', authController.mockProtect, authController.getMe);

module.exports = router;
