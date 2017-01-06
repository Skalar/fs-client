import Base from './base'

export default class Soknad extends Base {
  constructor(data) {
    super(data)

    // Add ssn attribute
    this.ssn = data.Fodselsdato + data.Personnr
  }

  static findByYear(year = new Date().getFullYear()) {
    return this.find({ Arstall: year })
  }
}
