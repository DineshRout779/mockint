const User = require('../models/User');

exports.getUserById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'user not found',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.getUser = async (req, res) => {
  return res.json(req.user);
};

exports.getMyInterviews = async (req, res) => {};
