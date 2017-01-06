import Person from './person'
import Soknad from './soknad'
import Soknadvalg from './soknadvalg'
import SoknadsAlternativ from './soknadsalternativ'
import {selectMany} from './query'

export default {
  setup({url, username, password}) {
    this.config = {url, username, password}
  },

  Person, Soknad, Soknadvalg, SoknadsAlternativ, selectMany
}
