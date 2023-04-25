const express = require('express')
const userApiRouter = express.Router()
const passport = require('passport')
const User = require('../models/User')

userApiRouter.get('/login', (_req, res) => {
  res.render('user/login')
})

userApiRouter.post('/login',
  passport.authenticate('local', {
    failureRedirect: 'api/user/login'
  }),
  (_req, res) => {
  res.redirect('/')
});

userApiRouter.get('/signup', (_req, res) => {
  res.redirect('user/signup')
})

userApiRouter.post('/signup', async(req, res) => {
  const { body } = req
  if (body.password === body['password-confirm']) {
    const newUser = {
      login: body.username,
      password: body.password
    }

    try {
      const user = new User(newUser)
      await user.save()
      res.redirect('/')
    } catch (e) {
      console.log(e.message)
    }
  }
})

userApiRouter.get('/me',
  (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url
    }
    return res.redirect('/api/user/login')
  }
  next()
  },
  (req, res) => {
    res.render("user/profile", { user: req.user })
})

userApiRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = userApiRouter
