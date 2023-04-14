const express = require('express')
const library = require('../library/store')
const createBook = require('../helpers/createBook')
const booksApiRouter = express.Router()
const fileUpload = require('../middleware/file')


booksApiRouter.get('/api/books/:id', (req, res) => {
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

booksApiRouter.get('/api/books/:id/download', (req, res) => {
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

booksApiRouter.post('/api/books/:id/upload', fileUpload.single('file'), (req, res) => {
  const { books } = library;
  const { id } = req.params;
  if (!req.file) {
    res.json(null);
    return;
  }

  const { path } = req.file;
  const index = books.findIndex((el) => el.id === id)

  if (index !== -1) {
    books[index] = {
      ...books[index],
      fileBook: path
    }
  } else {
    res.status(404);
    res.json({ code: 404, message: '404 | page not found' })
  }
});

booksApiRouter.post('/api/books', (req, res) => {
  const { books } = library
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const newBook = createBook(title, description, authors, favorite, fileCover, fileName, fileBook)
  books.push(newBook)
  res.status(201)
  res.json(newBook)
})

booksApiRouter.put('/api/books/:id', (req, res) => {
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

booksApiRouter.delete('/api/books/:id', (req, res) => {
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

module.exports = booksApiRouter
