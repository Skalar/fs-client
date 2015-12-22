# FS import

## Examples

```javascript
import { crud } from './lib/fs'

// Find person by ssn
crud.person.find(process.argv[2])
  .then(person => console.log(person))
  .catch(error => console.error(error))
```

See `examples.js` for more examples.
