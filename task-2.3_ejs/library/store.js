const uuid = require("uuid");
const library = {
  books: [
    {
      id: uuid.v4(),
      title: 'Book 1',
      description: 'Description 1',
      authors: 'author 1',
      favorite: 'favorite 1',
      fileCover: 'fileCover 1',
      fileName: 'fileName1',
      fileBook: null
    },
    {
      id: uuid.v4(),
      title: 'Book 2',
      description: 'Description 2',
      authors: 'author 2',
      favorite: 'favorite 2',
      fileCover: 'fileCover 2',
      fileName: 'fileName2',
      fileBook: null
    }
  ]
}

module.exports = library
