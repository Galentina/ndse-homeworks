const dotenv = require('dotenv')
dotenv.config()

const configEnv = {
  PORT: process.env.PORT,
  HOST: process.env.HOST
}

module.exports = configEnv
