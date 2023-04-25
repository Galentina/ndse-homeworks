const { model, Schema } = require("mongoose")

const userSchema = new Schema({
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
})

module.exports = model('User',userSchema)
