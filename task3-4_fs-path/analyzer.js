#!/usr/bin/env node

const fs = require('fs')

const readStream = fs.createReadStream('./logs/gameResult.txt')

readStream.setEncoding('utf-8')

let gameResults

readStream.on('data', (chunk) => {
  gameResults = gameResults + chunk
})

readStream.on('close', () => {
  const allStatistic = getStatistic(gameResults)
  console.log('Total rounds:', allStatistic.rounds);
  console.log('Winners:', allStatistic.winners);
  console.log('Losers:', allStatistic.losers);
  console.log('Percentage of winners:', `${Math.round((allStatistic.winners * 100) / allStatistic.rounds)}%`);
});


readStream.on('error', (err) => {
  console.log(err.message)
})

const getStatistic = () => {
  const results = gameResults.slice(gameResults.indexOf('{')).split(';').slice(0, -1).map(el => { return JSON.parse(el)})

  return results.reduce((acc, el) => {
    acc.rounds += 1
    if (el.winner) {
      acc.winners += 1
    } else {
      acc.losers += 1
    }
    return acc
  },
    { rounds: 0, winners: 0, losers: 0 }
  )
}
