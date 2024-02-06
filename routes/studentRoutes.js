const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController')

router.post('/signup', studentController.signUp);
router.post('/login', studentController.login);

router.get('/profile', studentController.getProfile);
router.get('/students', studentController.getAllStudents);

module.exports = router;