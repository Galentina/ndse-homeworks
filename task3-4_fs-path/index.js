#!/usr/bin/env node

const readline = require('readline')
const fs = require('fs')
const path = require('path')

const hiddenNumber = Math.floor(Math.random() * 2 + 1)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const winnerText = (num) => {
  console.log(`The number is guessed: ${num}`)
  rl.close()
}

const loserText = (num) => {
  console.log(`You are not guessed! Wright one is: ${num}`)
  rl.close()
}

const logDirectory = path.join(__dirname, 'logs')

fs.mkdir(logDirectory, (err) => {
  if (err) {
    console.log(err.message)
  }
  path.join(__dirname, 'logs', 'gameResult.txt')

  startGame(logDirectory, 'gameResult.txt')
})


const startGame = (logDirectory, fileName) => {
  console.log('We present "Heads or tails" game.')
  rl.question('Please write a number: 1 or 2\n', (inputNumber) => {
    const userAnswer = Number.parseInt(inputNumber)

    if (userAnswer !== 1 && userAnswer !== 2) {
      console.log('You should chose between: 1 or 2')
      return
    } else if (userAnswer === hiddenNumber) {
      winnerText(hiddenNumber)
    } else {
      loserText(hiddenNumber)
    }
    const result = {
      userAnswer,
      hiddenNumber,
      winner: userAnswer === hiddenNumber,
      date: new Date().toISOString()
    }
    const fileContent = JSON.stringify(result) + ';'
    fs.appendFile(path.join(logDirectory, fileName), fileContent, (err) => {
      if (err) {
        throw new Error(err.message)
      }
    })
    rl.close()
  })
}


