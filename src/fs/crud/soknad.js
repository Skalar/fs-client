import { selectMany } from './request'
import { toSSN } from '../helpers'

let decorator = {
  getSSN() {
    return toSSN(this.Fodselsdato, this.Personnr)
  }
}

function findAll(query={}) {
  return selectMany('Soknad', query, decorator)
}

export { findAll }
