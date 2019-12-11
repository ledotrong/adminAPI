const User = require('../models/User');

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
