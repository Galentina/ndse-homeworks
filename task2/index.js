#!/usr/bin/env node
const readline = require('readline')

const numberRange = { min: 0, max: 100 }
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min))
}

const gameStartText = `Guess one number from ${numberRange.min} till ${numberRange.max}`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const winnerText = (num) => {
  console.log(`The number is guessed: ${num}`)
  rl.close()
}

const checkAnswer = (myNumber) => {
  rl.question('Your answer is: ', (inputNumber) => {
    const userAnswer = Number.parseInt(inputNumber)

    if (myNumber === userAnswer) {
      return winnerText(myNumber)
    }

    if (myNumber > userAnswer) {
      console.log('Your number should be bigger.')
    } else {
      console.log('Your number should be smaller.')
    }
    checkAnswer(myNumber)
  })
}

const startGame = () => {
  console.log(gameStartText)
  const myNumber = randomNumber(numberRange.min, numberRange.max)
  checkAnswer(myNumber)
}

startGame()
