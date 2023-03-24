const express = require('express')
const userRouter = express.Router()

userRouter.post('/api/user/login', (_req, res) => {
  res.status(201)
  res.json({ id: 1, mail: 'test@mail.ru' })
});

module.exports = userRouter
