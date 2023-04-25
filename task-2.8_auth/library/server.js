const express = require('express')
const config = require('./config/index')
const indexRouter = require('./routes/index')
const userApiRouter = require('./routes/userApiRouter')
const booksRouter = require('./routes/booksRouter')
const booksApiRouter = require('./routes/booksApiRouter')
const errorMiddleware = require('./middleware/error')
const mongoose = require('mongoose')
const passport = require('passport')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')


const app = express()
app.set('view engine', 'ejs')
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/books', booksRouter)
app.use('/api/user', userApiRouter)
app.use('/api/books', booksApiRouter)

app.use(errorMiddleware)

async function verify(username, password, done) {
  try {
    const user = await User.findOne({ login: username }).select('-__v')

    if (!user) {
      return done(null, false)
    }

    if (user.password !== password) {
      return done(null, false)
    }

    return done(null, user)
  } catch (e) {
    return done(e)
  }
}

const options = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: false,
};

passport.use("local", new LocalStrategy(options, verify))

passport.serializeUser(function (user, cb) {
  cb(null, user["_id"]);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await User.findById(id).select("-__v")
    cb(null, user)
  } catch (e) {
    return cb(e)
  }
})

async function start() {
  try {
    const UrlDb = `mongodb://mongo27017/${config.DBNAME}`
    await mongoose.connect(UrlDb)
    app.listen(config.PORT, () => {
      console.log(`App is started at ${config.HOST}${config.PORT}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()
