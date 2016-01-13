import Base from './base'

export default class Person extends Base {
  static format(data) {
    // Add ssn and name attributes
    data.ssn     = data.Fodselsdato + data.Personnr
    data.name    = [data.Fornavn, data.Etternavn].join(' ').trim()
    data.email   = data.Emailadresse_Privat || data.Emailadresse
    data.phone   = data.Telefonnr_Mobil || data.Telefonnr_Hjemsted
    data.address = ([data.Adrlin1_Hjemsted, data.Adrlin2_Hjemsted].join(' ') + ', ' + data.Adrlin3_Hjemsted).trim()
    if (data.address === ',') data.address = null

    return data
  }

  static findBySSN(ssn) {
    const [birthdate, suffix] = ssn.match(/.{1,6}/g)
    return this.find({ Fodselsdato: birthdate, Personnr: suffix })
  }
}
