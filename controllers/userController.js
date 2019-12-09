const User = require('../models/User');

exports.users = async (req, res) => {
  const userCheck = await User.find({}, (err, users) => {
    console.log(users);
    res.send('users');
  });
};
