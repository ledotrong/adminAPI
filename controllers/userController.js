const User = require('../models/User');
const Skill = require('../models/Skill');

exports.users = async (req, res) => {
  await User.find({}, (err, users) => {
    let userData = users;
    userData.forEach(user => {
      user.password = undefined;
      user.__v = undefined;

      console.log(user);
    });

    res.json(userData);
  });
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
  const skillCheck = await Skill.findOne({ name: req.body.name });
  if (skillCheck) return res.status(400).json('Skill already exists');

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
