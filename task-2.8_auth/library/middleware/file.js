const multer = require('multer')

const bookStorage = multer.diskStorage({
  destination(req, res, cb){
    cb(null, 'layout/books')
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

module.exports = multer({bookStorage})
