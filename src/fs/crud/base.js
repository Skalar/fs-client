import {selectMany} from './query'

export default class Base {

  // To customize the result from find, you can override this method
  constructor(data) {
    Object.assign(this, data)
  }

  static find(filter) {
    return selectMany(this.name, filter)
      .then(result => result.map(data => new this(data)))
  }

}
