#!/usr/bin/env node
var crud = require('../lib/fs/crud').default

var table = process.argv[2]
var query = process.argv[3]
var filter  = {}

if (query) {
  query.split(',').forEach(function(condition) {
    var kv = condition.split('=')
    filter[kv[0]] = kv[1]
  })
}

if (table && crud[table]) {
  crud[table].find(filter)
    .then(console.log)
    .catch(console.error)
} else {
  console.log('Example usage: fs-client Person "Kjonn=K,Fodselsdato=180588"')
}
