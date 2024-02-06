const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController')

router.post('/signup', studentController.signUp);
router.post('/login', studentController.login)

module.exports = router;