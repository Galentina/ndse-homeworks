const express = require('express')
const { initCounter, saveCounter } = require('./file')
const config = require('./config/index')

const app = express()

const counter = initCounter()

app.post('/counter/:bookId/incr', async(req, res) => {
  const { bookId } = req.params
  counter[bookId] = counter[bookId] === undefined ? 1 : counter[bookId] + 1

  try {
    await saveCounter(counter)
  } catch (e) {
    console.log(e.message)
    res.status(404).send('Not found')
  }

  res.status(201).json({ counter })
})

app.get("/counter/:bookId", (req, res) => {
  const { bookId } = req.params

  try{
    const visits = counter[bookId] ?? 0
    res.status(200).send(visits.toString())
  } catch (e) {
    console.log(e.message)
    res.status(404).send('Not found')
  }
})

app.listen(config.PORT, () => {
  console.log(`App is started at ${config.HOST}${config.PORT}`)
})
