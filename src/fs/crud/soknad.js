import Base from './base'

export default class Soknad extends Base {
  static format(data) {
    // Add ssn attribute
    data.ssn = data.Fodselsdato + data.Personnr
    return data
  }

  static findByYear(year = new Date().getFullYear()) {
    return this.find({ Arstall: year })
  }
}
