import {crud} from '../../src/fs'

export const CRUD_URL = 'https://jboss-test.uio.no/fsrest/rest/crud'

crud.setup({
  url: CRUD_URL,
  username: 'username',
  password: 'password'
})

export {crud}
