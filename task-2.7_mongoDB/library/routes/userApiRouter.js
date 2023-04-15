const express = require('express')
const userApiRouter = express.Router()

userApiRouter.post('/login', (_req, res) => {
  res.status(201)
  res.json({ id: 1, mail: 'test@mail.ru' })
});

module.exports = userApiRouter
