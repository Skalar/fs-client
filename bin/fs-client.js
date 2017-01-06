#!/usr/bin/env node
/* eslint-disable no-process-env */
const crud = require('../lib/fs/crud').default

const table = process.argv[2]
const query = process.argv[3]
const filter = {}

if (query) {
  query.split(',').forEach(function(condition) {
    const kv = condition.split('=')
    filter[kv[0]] = kv[1]
  })
}

const url = process.env.FS_CRUD_URL
const username = process.env.FS_USERNAME
const password = process.env.FS_PASSWORD

if (url && username && password) {
  crud.setup({url, username, password})

  if (table && crud[table]) {
    crud[table].find(filter)
      .then(console.log)
      .catch(console.error)
  } else {
    console.log('Example usage: fs-client Person "Kjonn=K,Fodselsdato=180588"')
  }
} else {
  console.log('You must assign these ENV variables:')
  console.log('  FS_CRUD_URL')
  console.log('  FS_USERNAME')
  console.log('  FS_PASSWORD')
}
