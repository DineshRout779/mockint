const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password, isInterviewer } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Please provide name, email and password!',
    });
  }

  const user = await User.findOne({ email });
  if (user)
    return res.status(403).json({
      error: 'Company already exists',
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isInterviewer,
    });
    await newUser.save();
    const { password, ...others } = newUser._doc;

    return res.status(200).json('User registered successfully!');
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password: clientPassword } = req.body;

  if (!email || !clientPassword) {
    return res.status(400).json({
      error: 'Please provide email and password!',
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: 'user not registered!',
      });
    }

    const validPassword = await bcrypt.compare(clientPassword, user.password);

    if (!validPassword) {
      return res.status(403).json({
        error: 'Invalid credentials!',
      });
    }

    const token = jwt.sign({ _id: user._id }, 'mysupersecretpassword', {
      expiresIn: '7d',
    });

    // res.cookie('token', token, { expire: new Date() + 9999 });

    const { password, ...others } = user._doc;

    return res.status(200).json({
      user: {
        ...others,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: err.message,
    });
  }
};

exports.isSignedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        error: 'No token found!',
      });
    }

    jwt.verify(token, 'mysupersecretpassword', (err, user) => {
      if (err) {
        return res.status(403).json({
          error: 'Token not valid!',
        });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      error: 'Unauthorized! No token found.',
    });
  }
};
