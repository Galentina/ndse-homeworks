const express = require('express')
const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  res.render('index', {title: 'Main page'})
})

module.exports = userRouter
