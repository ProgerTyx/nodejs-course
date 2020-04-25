const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const ErrorHandler = require('../../common/ErrorHandler');
const { handlerRoute } = require('../../common/handlerRoute');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');
const createError = require('http-errors');
const { BAD_REQUEST } = require('http-status-codes');
// const asyncHandler = require()

router.post(
  '/',
  handlerRoute(async (req, res) => {
    if (!req.body.login || !req.body.password) {
      throw new ErrorHandler(400, 'Login or password not found');
    }

    const { login, password } = req.body;

    const user = await User.findOne({ login });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!user || !isValidPassword) {
      throw new ErrorHandler(403, 'User not found');
    }

    const payload = {
      login: user.login,
      userId: user._id
    };

    const token = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });

    res.json({ token });
  })
);

module.exports = router;
