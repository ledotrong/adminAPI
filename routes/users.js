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

router.get('/revenue', userController.revenue);

router.get('/contracts', userController.contracts);

router.get('/contracts/:id', userController.contract);

router.post('/skill', userController.postSkill);

router.patch('/skill/update', userController.updateSkill);

router.patch('/skill/delete', userController.deleteSkill);

router.patch('/contracts/:id/update', userController.refundAction);

router.patch('/ban-user/:id', userController.banUser);

router.patch('/update', authController.update);

router.patch('/updateUser', userController.updateUser);

router.delete('/deleteUser', userController.deleteUser);

module.exports = router;
