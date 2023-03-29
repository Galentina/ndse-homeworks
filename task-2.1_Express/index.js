const express = require('express')
const config = require('./config/index')
const library = require('./library/store')
const createBook = require('./helpers/createBook')

const app = express()
app.use(express.json())

app.post('/api/user/login', (_req, res) => {
  res.status(201)
  res.json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
  const { books } = library
  res.status(200)
  res.json(books)
})

app.get('/api/books/:id', (req, res) => {
  const { books } = library
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    res.json(books[index])
  } else {
    res.status(404)
    res.json('404 | Book is not found')
  }
})

app.post('/api/books', (req, res) => {
  const { books } = library
  const { title, description, authors, favorite, fileCover, fileName } = req.body
  const newBook = createBook(title, description, authors, favorite, fileCover, fileName)
  books.push(newBook)
  res.status(201)
  res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
  const { books } = library
  const { title, description, authors, favorite, fileCover, fileName } = req.body
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    books[index] = {
      ...books[index],
      title, description, authors, favorite, fileCover, fileName
    }
    res.json( books[index])
  } else {
    res.status(404)
    res.json('404 | Book is not found')
  }
})

app.delete('/api/books/:id', (req, res) => {
  const { books } = library
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    books.splice(index, 1)
    res.status(200)
    res.send("Ok");
  } else {
    res.status(404)
    res.json('404 | Book is not found')
  }
})

app.listen(config.PORT, () => {
  console.log(`App is started at ${config.HOST}${config.PORT}`)
})
