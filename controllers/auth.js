const User = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/keys');

exports.signupController = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: 'Email already exists',
      });
    }
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.json({
      successMessage: 'Registeration Success , Please Sign In',
    });
  } catch (err) {
    console.log('error Sign up Controller');
    res.status(500).json({
      errorMessage: 'Server Error',
    });
  }
};
exports.signinController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Error in Email Auth');
      return res.status(400).json({ errorMessage: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('error in Password Sec');
      return res.status(400).json({
        errorMessage: 'Invalid Credentials',
      });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };
    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
      if (err) console.log('jwt Eror', err);
      const { _id, username, email, role } = user;
      res.json({
        token,
        user: { _id, username, email, role },
      });
    });
  } catch (err) {
    console.log('Inside Sign In Process' >> err);
    res.status(500).json({
      errorMessage: 'Server Error',
    });
  }
};
