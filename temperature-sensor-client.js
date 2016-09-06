'use strict'

const context = require('./context')
const hydraFetch = require('hydra-fetch')
const SimpleRDF = require('simplerdf/lite').SimpleRDF

const iri = 'http://localhost:8080/'

// fetch the temperature sensor
hydraFetch(iri, {context: context}).then((temperatureSensor) => {
/*
  // change the threshold
  temperatureSensor.threshold = 30

  return temperatureSensor.put(temperatureSensor).then((temperatureSensor) => {
    console.log('new threshold: ' + temperatureSensor.threshold)
  })
*/

  // add an event
  let temperatureChange = new SimpleRDF(context, temperatureSensor.temperatureChange.iri())
  temperatureChange.method = 'POST'
  temperatureChange.target = 'http://localhost:8081/temperatureChange'

  return temperatureSensor.temperatureChange.post(temperatureChange).then((event) => {
    // IRI of the event
    console.log('event IRI: ' + event.iri())

    // remove the event again
    // return event.delete()
  })
}).catch((err) => {
  console.error(err.stack || err.message)
})
