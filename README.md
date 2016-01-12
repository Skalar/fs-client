# Felles Studentsystem (FS) client

Documentation: http://www.fellesstudentsystem.no/dokumentasjon/

## Examples

```javascript
import { crud } from './lib/fs'

// Find person by ssn
crud.person.find(process.argv[2])
  .then(console.log)
  .catch(console.error)
```

See `examples.js` for more examples.
