const morgan = require('morgan')
const logger = require('./logger')

morgan.token('request-body', request => JSON.stringify(request))

const unknownEndpoint = (_, response) => {
  response.status(404).send('Unknown endpoint')
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()

}

const errorHandler = (error, _, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}


module.exports = {
  unknownEndpoint,
  requestLogger,
  errorHandler
}
