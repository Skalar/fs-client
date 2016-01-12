import { selectMany } from './request'
import { getAttribute, toSSN } from '../helpers'

let decorator = {
  getSSN() {
    return toSSN(getAttribute(this, 'Fodselsdato'), getAttribute(this, 'Personnr'))
  }
}

function findAll(query={}) {
  return selectMany('Soknad', query, decorator)
}

export { findAll }
