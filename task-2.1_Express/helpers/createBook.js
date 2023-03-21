const uuid = require('uuid')

const createBook = (
  title, description, authors, favorite, fileCover, fileName
) => {
  return {
    id: uuid.v4(),
    title: title,
    description: description,
    authors: authors,
    favorite: favorite,
    fileCover: fileCover,
    fileName: fileName
  }
}

module.exports = createBook
