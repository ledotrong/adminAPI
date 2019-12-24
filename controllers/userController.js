const User = require('../models/User');
const Admin = require('../models/Admin');
const Skill = require('../models/Skill');
const bcrypt = require('bcryptjs');
const { updateValidation } = require('../models/validation');

exports.users = async (req, res) => {
  await User.find({}, (err, users) => {
    let userData = users;
    userData.forEach(user => {
      user.password = undefined;
      user.__v = undefined;
    });

    res.json(userData);
  });
};

exports.admin = async (req, res) => {
  if (req.user.role === 'master') {
    await Admin.find({}, (err, users) => {
      let adminData = users;
      adminData.forEach(admin => {
        admin.password = undefined;
        admin.__v = undefined;
      });

      res.json(adminData);
    });
  } else {
    res.json({ message: 'Permission denied', error: true });
  }
};

exports.banUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user.status !== 'banned') user.status = 'banned';
  else user.status = 'active';

  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: { status: user.status } }
    );

    const user2 = await User.findById(req.params.id);

    res.json(user2.status);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.skills = async (req, res) => {
  await Skill.find({}, (err, skills) => {
    res.json(skills);
  });
};

exports.postSkill = async (req, res) => {
  const newSkill = new Skill({
    name: req.body.name
  });

  try {
    await newSkill.save();
    await Skill.find({}, (err, skills) => {
      res.json(skills);
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.updateSkill = async (req, res) => {
  try {
    await Skill.updateOne(
      { _id: req.body.key },
      { $set: { name: req.body.name } }
    );

    await Skill.find({}, (err, skills) => {
      res.json(skills);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await Skill.updateOne({ _id: req.body.key }, { $set: { isDeleted: true } });

    await Skill.find({}, (err, skills) => {
      res.json(skills);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { error } = updateValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // Kiem tra email bi trung?
  const userCheck = await Admin.findOne({ email: req.body.email });
  if (userCheck) return res.status(400).json('Email already exists');

  // Ma hoa mat khau
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: hashedPassword,
    picture: req.body.picture,
    address: req.body.address
  };

  try {
    const updatedUser = await Admin.updateOne(
      { _id: req.body._id },
      { $set: newUser }
    );
    res.json({ updated: true });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  const userCheck = await Admin.findOne({ _id: req.body._id });
  try {
    await Admin.deleteOne({ _id: req.body._id }, () => {
      res.json({ deleted: true });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
