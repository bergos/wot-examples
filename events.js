'use strict'

const context = require('./context')
const url = require('url')
const SimpleRDF = require('simplerdf/lite').SimpleRDF

class Event extends SimpleRDF {
  constructor (events, input) {
    super(context, input.iri())

    this.type = context.Event
    this.method = input.method
    this.target = input.target

    this._events = events
  }

  get () {
    return this
  }

  delete () {
    this._events.remove(this)
  }
}

class Events extends SimpleRDF {
  constructor (iri, options) {
    super(context, iri)

    this.type = context.Collection
    this.member = []

    this._counter = 1
    this._options = options || {}
  }

  get () {
    return this
  }

  post (input) {
    let iri = url.resolve(this.iri().toString(), (this._counter++).toString())

    input.iri(iri)

    let event = new Event(this, input)

    this.member.push(event)

    if (this._options.onCreate) {
      this._options.onCreate(event)
    }

    return event
  }

  remove (event) {
    // TODO: SimpleArray should implement .splice()
    let index = this.member._array.indexOf(event)

    if (index !== -1) {
      this.member._array.splice(index, 1)
      this.graph().removeMatches(this.iri(), context.member['@id'], event.iri())

      if (this._options.onRemove) {
        this._options.onRemove(event)
      }
    }
  }
}

module.exports = {
  Event: Event,
  Events: Events
}
