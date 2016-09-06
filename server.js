'use strict'

const apiHeader = require('hydra-middleware/api-header')
const express = require('express')
const formats = require('rdf-formats-common')()
const hydraFactory = require('hydra-middleware/factory')
const morgan = require('morgan')
const serve = require('rdf-serve-static')

let hydraObjects = {}

function factory (iri) {
  let objectIri = Object.keys(hydraObjects).filter((objectIri) => {
    return iri.indexOf(objectIri) === 0
  }).sort((a, b) => {
    return a.length < b.length
  }).shift()

  if (objectIri) {
    return hydraObjects[objectIri]
  }

  return null
}

function server (context, apiLink) {
  let app = express()

  // log all requests to the console
  app.use(morgan('combined'))

  // add api Link header
  app.use(apiHeader(apiLink))

  // user rdf-serve-static to publish the API
  app.use(serve(__dirname, formats))

  // use the factory middleware to handle request to object instances
  app.use('/', hydraFactory(factory, context))

  let server = app.listen(8080, () => {
    let host = server.address().address
    let port = server.address().port

    console.log('listening on http://%s:%s', host, port)
  })

  return hydraObjects
}

module.exports = server
