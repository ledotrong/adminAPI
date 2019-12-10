const User = require('../models/User');

exports.users = async (req, res) => {
  await User.find({}, (err, users) => {
    console.log(users);
    const userData = users.forEach(user => {
      delete user.password;
      delete user.__v;
    });
    res.json(userData);
  });
};
