'use strict'

const context = {
  // rdf + rdfs + owl
  label: 'http://www.w3.org/2000/01/rdf-schema#label',
  sameAs: '',
  type: {
    '@id': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    '@type': '@id'
  },

  // hydra
  Collection: 'http://www.w3.org/ns/hydra/core#Collection',
  member: {
    '@id': 'http://www.w3.org/ns/hydra/core#member',
    '@type': '@id',
    '@container': '@set'
  },
  method: 'http://www.w3.org/ns/hydra/core#method',

  // wot
  Event: 'http://example.org/wot#Event',
  target: {
    '@id': 'http://example.org/wot#target',
    '@type': '@id'
  },

  // examples
  TemperatureSensor: 'http://example.org/example#TemperatureSensor',
  temperature: 'http://example.org/example#temperature',
  temperatureChange: 'http://example.org/example#temperatureChange',
  threshold: 'http://example.org/example#threshold',
  thresholdWarning: 'http://example.org/example#thresholdWarning'
}

module.exports = context
