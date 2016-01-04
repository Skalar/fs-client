import Promise from 'bluebird'
import requestOriginal from 'request'
import { raw, xmlToJson } from '../helpers'

const SELECT      = 'select'
const SELECT_MANY = 'selectMany'
const request     = Promise.promisify(requestOriginal)

// Low-level fs request function
function fsRequest(requestType, xml) {
  var tag  = 'do' + requestType.charAt(0).toUpperCase() + requestType.slice(1) + 'Request'
  var body = `<${tag} xmlns="http://fsws.usit.no/schemas/crud">${xml}</${tag}>`

  return request({
    url:    `${process.env.FS_CRUD_URL}/${requestType}`,
    method: 'POST',
    auth:   {
      username: process.env.FS_USERNAME,
      password: process.env.FS_PASSWORD
    },
    form: {
      xml: body
    }
  })
}

// Returns query XML
// Example: queryBuilder("Soknad", { Arstall: 2015}))
// => "<Soknad><Arstall>2015</Arstall></Soknad>"
function queryBuilder(table, filter) {
  var query = []
  for (let key in filter) query.push(`<${key}>${filter[key]}</${key}>`)
  return `<${table}>${query}</${table}>`
}

function select(requestType, table, filter, parser) {
  return new Promise((resolve, reject) => {
    var xml = queryBuilder(table, filter)
    fsRequest(requestType, xml)
      .then(response => {
        if (response.statusCode === 200) resolve(xmlToJson(table, response.body, parser))
        else reject('Server error')
      })
  })
}

function selectOne(table, filter, parser=raw) {
  return select(SELECT, table, filter, parser)
}

function selectMany(table, filter, parser=raw) {
  return select(SELECT_MANY, table, filter, parser)
}

// Not yet implemented
// function upsert(/*table, filter*/) {
//   throw('Not yet implemented')
//   // return fsRequest('doUpsertRequest', xml)
// }

export { selectOne, selectMany }
