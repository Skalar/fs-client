import { selectMany } from './query'

class Base {

  static find(filter) {
    // this.name = classname
    return selectMany(this.name, filter)
      .then(result => result.map(data => this.format(data)))
  }

  // To customize the result from find, you can override this method
  static format(data) {
    return data
  }
}

export default Base
