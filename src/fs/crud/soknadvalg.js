import Base from './base'

export default class Soknadvalg extends Base {
  static format(data) {
    // Add ssn attribute
    data.ssn = data.Fodselsdato + data.Personnr
    return data
  }
}
