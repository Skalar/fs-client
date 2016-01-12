import { selectOne, selectMany } from './request'
import { toSSN, getAttribute } from '../helpers'

let decorator = {
  getSSN() {
    return toSSN(getAttribute(this, 'Fodselsdato'), getAttribute(this, 'Personnr'))
  }
}

function findAll(query={}) {
  return selectMany('Person', query, decorator)
}

function findOne(query={}) {
  return selectOne('Person', query, decorator)
}

function findBySSN(ssn) {
  var [birthdate, suffix] = ssn.match(/.{1,6}/g)
  return findOne({ Fodselsdato: birthdate, Personnr: suffix })
}

export { findBySSN, findAll, findOne }
