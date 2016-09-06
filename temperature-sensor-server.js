'use strict'

const context = require('./context')
const server = require('./server')
const url = require('url')
const Events = require('./events').Events
const SimpleRDF = require('simplerdf/lite').SimpleRDF

class TemperatureSensor extends SimpleRDF {
  constructor (iri) {
    super(context, iri)

    this.type = context.TemperatureSensor
    this.temperature = 20
    this.threshold = 25
    this.temperatureChange = new Events(url.resolve(iri, 'temperatureChange/'), {
      onCreate: (event) => {
        hydraObjects[event.iri()] = event
      },
      onRemove: (event) => {
        if (event.iri() in hydraObjects) {
          delete hydraObjects[event.iri()]
        }
      }
    })
    this.thresholdWarning = new Events(url.resolve(iri, 'thresholdWarning/'), {
      onCreate: (event) => {
        hydraObjects[event.iri()] = event
      },
      onRemove: (event) => {
        if (event.iri() in hydraObjects) {
          delete hydraObjects[event.iri()]
        }
      }
    })
  }

  get () {
    return this
  }

  put (input) {
    this.threshold = input.threshold

    return this
  }
}

let temperatureSensor = new TemperatureSensor('http://localhost:8080/')

let hydraObjects = server(temperatureSensor.context(), '/temperature-sensor-api')

hydraObjects[temperatureSensor.iri()] = temperatureSensor
