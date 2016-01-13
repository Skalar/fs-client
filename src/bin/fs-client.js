#!/usr/bin/env node
import { crud } from '../lib/fs/crud'

const table = process.argv[2]
const query = process.argv[3]
let filter  = {}

if (query) {
  query.split(',').forEach(condition => {
    let [key,value] = condition.split('=')
    filter[key] = value
  })
}

if (table && crud[table]) {
  crud[table].find(filter)
    .then(console.log)
    .catch(console.error)
} else {
  console.log('Example usage: fs-client Person "Kjonn=K,Fodselsdato=180588"')
}
