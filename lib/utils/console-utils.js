import chalk from 'chalk'
import { inspect } from './utils'

const preProcessMessage = function(message) {
  let msg = message

  if (msg === undefined) {
    return 'undefined'
  }

  if (msg === null) {
    return 'null'
  }

  if (typeof msg !== 'string') {
    msg = message.toString()
  }

  return msg
}

const info = function(message) {
  const msg = preProcessMessage(message)
  console.log(chalk.white(msg)) //eslint-disable-line
}

const error = function(message) {
  const msg = preProcessMessage(message)
  console.log(chalk.red('× ' + msg)) //eslint-disable-line
}

const debug = function(message) {
  const msg = preProcessMessage(message)
  console.log(chalk.blue(msg)) //eslint-disable-line
}

const done = function(message) {
  const msg = preProcessMessage(message)
  console.log(chalk.green('\t✓ ' + msg)) //eslint-disable-line
}


const warn = function(message) {
  const msg = preProcessMessage(message)
  console.log(chalk.yellow('\t○ ' + msg)) //eslint-disable-line
}

const json = function(object) {
  console.log(inspect(object)) //eslint-disable-line
}

const log = {
  info,
  error,
  debug,
  done,
  warn,
  json
}

export {
  log
}
