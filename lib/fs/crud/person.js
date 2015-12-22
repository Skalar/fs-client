import { selectOne, selectMany } from './request'
import { toSSN, getAttribute, pad } from '../helpers'

function serialize(person) {
  return {
    ssn:         toSSN(person.Fodselsdato[0], person.Personnr[0]),
    name:        getAttribute(person, ['Fornavn', 'Etternavn']),
    email:       getAttribute(person, 'Emailadresse_Privat') || getAttribute(person, 'Emailadresse'),
    gender:      getAttribute(person, 'Kjonn') === 'M' ? 'male' : 'female',
    username:    getAttribute(person, 'Brukernavn'),
    address:     getAttribute(person, ['Adrlin1_Hjemsted', 'Adrlin2_Hjemsted', 'Adrlin3_Hjemsted']),
    postalCode:  pad(getAttribute(person, 'Postnr_Hjemsted'), 4),
    countryCode: getAttribute(person, 'Terminkode')
  }
}

function findAll(filter) {
  return selectMany('Person', filter, serialize)
}

function find(ssn) {
  var [birthdate, suffix] = ssn.match(/.{1,6}/g)
  return selectOne('Person', { Fodselsdato: birthdate, Personnr: suffix }, serialize)
}

export { find, findAll }
