const express = require('express')
const library = require('../library/store')
const createBook = require('../helpers/createBook')
const booksRouter = express.Router()


booksRouter.get('/api/books/:id', (req, res) => {
  const { books } = library
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    res.json(books[index])
  } else {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

booksRouter.get('/api/books/:id/download', (req, res) => {
  const { books } = library
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1 && books[index].fileBook) {
    res.download(books[index].fileBook, books[index].fileName)
  } else {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

booksRouter.post('/api/books', (req, res) => {
  const { books } = library
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const newBook = createBook(title, description, authors, favorite, fileCover, fileName, fileBook)
  books.push(newBook)
  res.status(201)
  res.json(newBook)
})

booksRouter.put('/api/books/:id', (req, res) => {
  const { books } = library
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    books[index] = {
      ...books[index],
      title, description, authors, favorite, fileCover, fileName, fileBook
    }
    res.json( books[index])
  } else {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

booksRouter.delete('/api/books/:id', (req, res) => {
  const { books } = library
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    books.splice(index, 1)
    res.status(200)
    res.send("Ok");
  } else {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

module.exports = booksRouter
