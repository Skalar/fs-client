# Felles Studentsystem (FS) client

Documentation: http://www.fellesstudentsystem.no/dokumentasjon/

[ ![Codeship Status for Skalar/fs-client](https://codeship.com/projects/78ffc700-9b64-0133-f631-66e8ff02f31d/status?branch=master)](https://codeship.com/projects/126761)

## Examples

```javascript
import { crud } from './lib/fs'

// Find person by ssn
crud.person.find(process.argv[2])
  .then(console.log)
  .catch(console.error)
```

See `examples.js` for more examples.
