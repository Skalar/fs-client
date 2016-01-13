import Base from './base'

export default class Person extends Base {
  static format(data) {
    // Add ssn and name attributes
    data.ssn  = data.Fodselsdato + data.Personnr
    data.name = [data.Fornavn, data.Etternavn].join(' ')
    return data
  }

  static findBySSN(ssn) {
    const [birthdate, suffix] = ssn.match(/.{1,6}/g)
    return this.find({ Fodselsdato: birthdate, Personnr: suffix })
  }
}
