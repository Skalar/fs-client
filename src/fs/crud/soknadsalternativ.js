import { selectMany } from './request'
import { getAttribute, toSSN } from '../helpers'

let decorator = {
  getSSN() {
    return toSSN(getAttribute(this, 'Fodselsdato'), getAttribute(this, 'Personnr'))
  }
}

function findByYear(year=new Date().getFullYear()) {
  return findAll({ Arstall: year })
}

function findAll(query) {
  return selectMany('SoknadsAlternativ', query, decorator)
}

export { findAll, findByYear }
