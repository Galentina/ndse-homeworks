#!/usr/bin/env node

const dotenv = require('dotenv')
const readline = require('readline');
const http = require('http')
dotenv.config()

const myAPIKey = process.env.APIKEY
const URL = process.env.URL

const getWeather = (city) => {
  const url = `${URL}?access_key=${myAPIKey}&query=${city}`;
  http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
      console.log(`statusCode: ${statusCode}`)
      return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
      try {
        console.log(`Current weather in ${city}:\n`, JSON.parse(rowData))
      } catch (error) {
        console.log(error.message)
      }

    })
  }).on('error', (error) => {
    console.log(error.message)
  })
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const startPlaying = () => {
  rl.question('Please write the name of the city to get the weather forecast:\n', async(inputCity) => {
    if(!inputCity) {
      console.log('You need to insert a city name. Try one more time.')
      rl.close()
    } else {
      try{
        await getWeather(inputCity)
        rl.close()
      } catch (error) {
        console.log(error.message)
      }
    }
  })
}

startPlaying()
