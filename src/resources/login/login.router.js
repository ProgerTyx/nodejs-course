const router = require('express').Router();
const createError = require('http-errors');
const { BAD_REQUEST, getStatusText } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const {
  findUserByLogin,
  checkPassword,
  createAccessToken
} = require('./login.service');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.body.login || !req.body.password) {
      throw new createError(BAD_REQUEST, getStatusText(BAD_REQUEST));
    }

    const { login, password } = req.body;

    const user = await findUserByLogin(login);
    await checkPassword(password, user.password);
    const token = await createAccessToken(user);

    res.json({ token });
  })
);

module.exports = router;
