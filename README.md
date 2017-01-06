# Felles Studentsystem (FS) client

Documentation: http://www.fellesstudentsystem.no/dokumentasjon/

[ ![Codeship Status for Skalar/fs-client](https://codeship.com/projects/78ffc700-9b64-0133-f631-66e8ff02f31d/status?branch=master)](https://codeship.com/projects/126761)

## Examples

```javascript
import {crud} from './lib/fs'

crud.setup({
  url: 'https://jboss-test.uio.no/fsrest/rest/crud',
  username: 'username',
  password: 'password'
})

// Find Soknad by year and terminkode
crud.SoknadsAlternativ.find({Aarstall: 2015, Terminkode: 'HØST'})
  .then(console.log)
  .catch(console.error)

// Find person by ssn
crud.Person.findBySSN(process.argv[2])
  .then(console.log)
  .catch(console.error)
```
