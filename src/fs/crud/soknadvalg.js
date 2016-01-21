import Base from './base'

export default class Soknadvalg extends Base {
  constructor(data) {
    super(data)

    // Add ssn attribute
    this.ssn = data.Fodselsdato + data.Personnr
  }
}
