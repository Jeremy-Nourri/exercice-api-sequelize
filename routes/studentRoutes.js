const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController')

router.post('/signup', studentController.signUp);
router.post('/login', studentController.login);
router.get('/profile', studentController.getProfile)

module.exports = router;