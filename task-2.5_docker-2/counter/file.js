const fs = require('fs')
const fsPromises = require('node:fs/promises')
const path = require('path')

const dataDir = path.join(__dirname, '..', 'app-data')
const file = path.join(dataDir, 'counter.txt')

const initCounter = () => {
  try {
    const fileContent = fs.readFileSync(file, { encoding: 'utf8' })
    return JSON.parse(fileContent)
  } catch (e) {
    fs.appendFileSync(file, '{}', { encoding: 'utf8' })
    return {}
  }
}

const saveCounter = (counter) => {
  return fsPromises.writeFile(file, JSON.stringify(counter) + '\n', { encoding: 'utf8' } )
}

module.exports = { initCounter, saveCounter }
