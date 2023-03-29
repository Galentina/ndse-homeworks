const express = require('express')
const config = require('./config/index')
const userRouter = require('./routes/userRouter')
const booksRouter = require('./routes/booksRouter')

const app = express()
app.use(express.json())

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.listen(config.PORT, () => {
  console.log(`App is started at ${config.HOST}${config.PORT}`)
})
