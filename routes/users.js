const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const Admin = require('../models/Admin');
const User = require('../models/User');

/* GET users listing. */

router.get('/', function(req, res) {
  res.json({ message: 'Authorized', role: req.user.role });
});

router.get('/users', userController.users);

router.get('/admin', userController.admin);

router.get('/skills', userController.skills);

router.post('/skill', userController.postSkill);

router.patch('/skill/update', userController.updateSkill);

router.patch('/skill/delete', userController.deleteSkill);

router.patch('/ban-user/:id', userController.banUser);

router.patch('/update', authController.update);

module.exports = router;
