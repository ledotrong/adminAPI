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
