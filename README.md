# Web of Things Hydra examples

This repository contains the [Thing Description examples](http://w3c.github.io/wot/current-practices/wot-practices.html#td-examples) mapped to Hydra Vocabulary.

## Examples

The examples consist of a API document `*-api.ttl`, a server implementation `*-server.js`, and a client implementation `*-client.js`.
The [hydra-middleware](https://github.com/bergos/hydra-middleware) module is used for the server code.
[hydra-fetch](https://github.com/bergos/hydra-fetch) for the client code.

### Temperature Sensor

## Patterns

### Property

Properties are mapped to [hydra:supportedProperty](https://www.hydra-cg.com/spec/latest/core/#hydra:supportedProperty).

### Action

### Event

Two [hydra:operation](https://www.hydra-cg.com/spec/latest/core/#hydra:Operation) IRIs are defined to list all events and to create a new event.
A property is used to point to the container for the events.
The operations must be attached to the container.
The class for the event defines already operations to fetch, update, and delete the event.
