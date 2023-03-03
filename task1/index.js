#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const dateOfToday = new Date()

const argv = yargs(hideBin(process.argv))
  .commands(
    'current',
    'What is current date/time',
    (yargs) => {
      return yargs
        .options('y', {
          alias: 'year',
          describe: 'Showing current year'
        })
        .options('m', {
          alias: 'month',
          describe: 'Showing current month',
        })
        .options('d', {
          alias: 'day',
          describe: 'Showing current day',
        })
    },
    (argv) => {
      if (!argv.year && !argv.month && !argv.date) {
        console.log('Today is:', dateOfToday.toISOString());
      }

      if (argv.year) {
        console.log('Now is:', dateOfToday.getFullYear(), 'year');
      }
      if (argv.month) {
        console.log('Now is:',
          `${dateOfToday.getMonth()}${ dateOfToday.getMonth() === 1 
            ? '-st' : dateOfToday.getMonth() === 3 ? '-rd' : '-nd'} month of the year`);
      }
      if (argv.day) {
        console.log('Current day is:', dateOfToday.getDate());
      }
    }
  )
  .commands(
    'add',
    'get future date',
    (yargs) => {
      return yargs
        .options('y', {
          alias: 'year',
          describe: 'Adding year'
        })
        .options('m', {
          alias: 'month',
          describe: 'Adding month',
        })
        .options('d', {
          alias: 'day',
          describe: 'Adding day',
        })
    },
    (argv) => {
      const futureDate = new Date()
      if (argv.year) {
        futureDate.setFullYear(futureDate.getFullYear() + argv.year)
        console.log(`It will be:`, futureDate.toISOString());
      }
      if (argv.month) {
        futureDate.setMonth(futureDate.getMonth() + argv.month)
        console.log(`It will be:`, futureDate.toISOString());
      }
      if (argv.day) {
        futureDate.setDate(futureDate.getDate() + argv.day)
        console.log(`It will be:`, futureDate.toISOString());
      }
    }
  )
  .commands(
    'sub',
    'get past date',
    (yargs) => {
      return yargs
        .options('y', {
          alias: 'year',
          describe: 'Going back for year(s)'
        })
        .options('m', {
          alias: 'month',
          describe: 'Going back for month(s)',
        })
        .options('d', {
          alias: 'day',
          describe: 'Going back for day(s)',
        })
    },
    (argv) => {
      const pastDate = new Date()
      if (argv.year) {
        pastDate.setFullYear(pastDate.getFullYear() - argv.year)
        console.log(`It was:`, pastDate.toISOString());
      }
      if (argv.month) {
        pastDate.setMonth(pastDate.getMonth() - argv.month)
        console.log(`It was:`, pastDate.toISOString());
      }
      if (argv.day) {
        pastDate.setDate(pastDate.getDate() - argv.day)
        console.log(`It was:`, pastDate.toISOString());
      }
    }
  )
  .help()
  .argv
console.log(argv)
