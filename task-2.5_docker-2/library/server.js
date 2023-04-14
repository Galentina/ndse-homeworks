const express = require('express')
const config = require('./config/index')
const indexRouter = require('./routes/index')
const userApiRouter = require('./routes/userApiRouter')
const booksRouter = require('./routes/booksRouter')
const booksApiRouter = require('./routes/booksApiRouter')
const errorMiddleware = require('./middleware/error')

const app = express()
app.set('view engine', 'ejs')

app.use(express.json())
app.use('/', indexRouter)
app.use('/books', booksRouter)
app.use('/api/user', userApiRouter)
app.use('/api/books', booksApiRouter)

app.use(errorMiddleware)
app.listen(config.PORT, () => {
  console.log(`App is started at ${config.HOST}${config.PORT}`)
})
