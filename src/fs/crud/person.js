import Base from './base'

export default class Person extends Base {
  constructor(data) {
    super(data)

    // Add ssn and name attributes
    this.ssn = data.Fodselsdato + data.Personnr
    this.name = [data.Fornavn, data.Etternavn].join(' ').trim()
    this.email = data.Emailadresse_Privat || data.Emailadresse
    this.phone = data.Telefonnr_Mobil || data.Telefonnr_Hjemsted
    this.address = ([data.Adrlin1_Hjemsted, data.Adrlin2_Hjemsted].join(' ') + ', ' + data.Adrlin3_Hjemsted).trim() // eslint-disable-line
    if (this.address === ',') this.address = null
  }

  static findBySSN(ssn) {
    const [birthdate, suffix] = ssn.match(/.{1,6}/g)
    return this.find({ Fodselsdato: birthdate, Personnr: suffix })
  }
}
