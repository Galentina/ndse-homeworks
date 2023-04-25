const express = require('express')
const booksRouter = express.Router()
const fileMiddleware = require('../middleware/file')
const Book = require('../models/Book');
const { incCounter, getCounter } = require('../api/counter')


booksRouter.get('/view', async(_req, res) => {
  try {
    const books = await Book.find();
    res.render('books/index', {title: "Our books", books: books})
  } catch (e) {
    res.status(404).redirect('/404')
  }
})


booksRouter.get('/view/:id', async(req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findById(id);
    await incCounter(id);
    const counter = await getCounter(id);
    res.render('books/view', {title: 'Chosen book', book, counter})
  } catch (e) {
    res.status(404)
    res.redirect('/404')
  }
})

booksRouter.get('/create', (_req, res) => {
  res.render('books/create', { title: 'Add book', book: {} })
})

booksRouter.post('/create', fileMiddleware.single('file'), async(req, res) => {
  const { title, authors, description, favorite, fileCover, fileName } = req.body
  const fileBook = req.file ? req.file : null

  try {
    const book = new Book({ title, authors, description, favorite, fileCover, fileName,fileBook })
    await book.save();
    res.redirect("/books/view")
  } catch (e) {
    res.status(404)
    res.redirect('/404')
  }
})

booksRouter.get('/update/:id', async(req, res) => {
  const { id } = req.params
  try {
    let book = await Book.findById(id);
    res.render('books/update', {
      title: 'Edit book',
      book: book,
    })
  } catch {
    res.status(404).redirect('/404')
  }
})

booksRouter.post('/update/:id', fileMiddleware.single('file'), async(req, res) => {
  const { id } = req.params
  try {
    const { title, authors, description, favorite, fileCover, fileName } = req.body
    const fileBook = req.file ? req.file : null
    await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName, fileBook })
    res.status(200).redirect(`/api/books/${id}`)
  } catch (e) {
    res.status(404).redirect("/404")
  }
})

booksRouter.post('/delete/:id', async(req, res) => {
  const { id } = req.params
  try {
    await Book.deleteOne({ _id: id });
    res.status(200).redirect("/books/view");
  } catch (e) {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

module.exports = booksRouter
