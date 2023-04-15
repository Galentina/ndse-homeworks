const express = require('express')
const library = require('../library/store')
const createBook = require('../helpers/createBook')
const booksRouter = express.Router()
const fileMiddleware = require('../middleware/file')
const { incCounter, getCounter } = require('../api/counter');


booksRouter.get('/view', (_req, res) => {
  res.render('books/index', { title: "Our books", books: library.books })
})


booksRouter.get('/view/:id', async(req, res) => {
  const { id } = req.params
  const index = library.books.findIndex(book => book.id === id)
  if (index !== -1) {
    await incCounter(id);
    const counter = await getCounter(id);
    res.render('books/view', { title: 'Chosen book', book: library.books[index], counter })
  } else {
    res.status(404)
    res.redirect('/404')
  }
})

booksRouter.get('/create', (_req, res) => {
  res.render('books/create', { title: 'Add book', book: {} })
})

booksRouter.post('/create', fileMiddleware.single('file'), (req, res) => {
  const { title, authors, description, favorite, fileCover, fileName } = req.body
  const fileBook = req.file ? req.file : null
  const newBook = createBook(title, description, authors, favorite, fileCover, fileName, fileBook)

  library.books.push(newBook)

  res.redirect('/books/view')
})

booksRouter.get('/update/:id', (req, res) => {
  const { id } = req.params
  let book = library.books.find(el => el.id === id)

  if (book) {
    res.render('books/update', {
      title: 'Edit book',
      book: book,
    })
  } else {
    res.status(404).redirect('/404')
  }
})

booksRouter.post('/update/:id', fileMiddleware.single('file'), (req, res) => {
  const { id } = req.params
  const index = library.books.findIndex(book => book.id === id)
  const { title, authors, description, favorite, fileCover, fileName } = req.body
  const fileBook = req.file ? req.file : null
  if (index !== -1) {
    library.books[index] = {
      ...library.books[index],
      title, authors, description, favorite, fileCover, fileName, fileBook
    }
    res.status(200).redirect('/books/view/' + id)
  } else {
    res.status(404).redirect("/404")
  }
})

booksRouter.post('/delete/:id', (req, res) => {
  const { id } = req.params
  const index = library.books.findIndex(book => book.id === id)
  if (index !== -1) {
    library.books.splice(index, 1)
    res.status(200).redirect('/books/view/')
  } else {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

module.exports = booksRouter
