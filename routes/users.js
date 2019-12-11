const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const Admin = require('../models/Admin');
const User = require('../models/User');

/* GET users listing. */

router.get('/', function(req, res) {
  res.json({ message: 'Authorized', access: true });
});

router.get('/users', userController.users);

router.patch('/ban-user/:id', userController.banUser);

router.patch('/update', authController.update);

module.exports = router;
