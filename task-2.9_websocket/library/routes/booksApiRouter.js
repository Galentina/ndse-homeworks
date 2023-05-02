const express = require('express')
const booksApiRouter = express.Router()
const fileUpload = require('../middleware/file')
const Book = require('../models/Book')
const path = require("path")


booksApiRouter.get("/", async (_req, res) => {
  try {
    const books = await Book.find().select("-__v")
    res.status(200).json(books)
  } catch (e) {
    res.status(404)
    res.json({code: 404, message: '404 | Data is not found'})
  }
});

booksApiRouter.get('/:id', async(req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findById(id).select("-__v");
    res.status(200).json(book)
  } catch (e) {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

booksApiRouter.get('/:id/download', async(req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findById(id).select("-__v")
    res.download(path.join(__dirname, "../..", book.fileBook), (err) => {
      if (err) {
        res.status(404).send("not found");
      }
    })
    }catch (e) {
      res.status(404)
      res.json({code: 404, message: '404 | Book is not found'})
    }
})

booksApiRouter.post('/:id/upload', fileUpload.single('file'), async(req, res) => {
  const { id } = req.params;
  try {
    let book = await Book.findById(id).select("-__v")
    if (!req.file) {
      res.json(null);
      return;
    }
    const {path} = req.file;
    book = {
      ...book,
      fileBook: path
    }
    await book.save()
  } catch (e) {
    res.status(404);
    res.json({code: 404, message: '404 | page not found'})
  }
});

booksApiRouter.post('/', async(req, res) => {
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const newBook = new Book({ title, description, authors, favorite, fileCover, fileName, fileBook })
  try {
    await newBook.save()
    res.status(201).json(newBook)
  } catch (e) {
    res.status(404);
    res.json({code: 404, message: '404 | page not found'})
  }
})

booksApiRouter.put('/:id', async(req, res) => {
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const { id } = req.params
  try {
    await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName, fileBook })
    res.redirect(`/api/books/${id}`)
  } catch (e) {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

booksApiRouter.delete('/:id', async(req, res) => {
  const { id } = req.params
  try {
    await Book.deleteOne({ _id: id })
    res.status(200).send("ok")
  } catch (e) {
    res.status(404)
    res.json({code: 404, message: '404 | Book is not found'})
  }
})

module.exports = booksApiRouter
