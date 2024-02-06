const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController')

router.post('/signup', studentController.signUp);

module.exports = router;