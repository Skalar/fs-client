import Promise from 'bluebird'
import { parseString } from 'xml2js'
import { pad } from '../helpers'
import request from './request'

const xmlParser = Promise.promisify(parseString)

/**
 * query - Performs a selectMany request against the FS CRUD API
 *
 * @param  {type} table  Table to lookup (ie SoknadsAlternativ, Person etc)
 * @param  {type} filter Object containing key/values to filter by (ie { Personr: '12345'})
 * @return {type}        Promise<json,error>
 */
export function selectMany(table, filter) {
  const xml = `<${table}>${queryBuilder(filter)}</${table}>`
  return request('selectMany', xml)
    .then(response => {
      if (response.statusCode === 200) return xmlToJSON(response.body)
      else throw response.body
    })
}

/**
 * queryBuilder - builds query XML
 *
 * @param  {type} filter Object containing key/values
 * @return {type}        String containing the XML
 *
 * @example queryBuilder("Soknad", { Arstall: 2015}))
 * => "<Arstall>2015</Arstall>"
 */
function queryBuilder(filter) {
  let query = []
  for (let key in filter) query.push(`<${key}>${filter[key]}</${key}>`)
  return query
}

/**
 * xmlToJson - Parse XML response and return Array with JSON data
 *
 * @param  {type} data  the XML data to parse
 * @return {type}       Promise<array,error>
 */
function xmlToJSON(data) {
  return xmlParser(data, { trim: true, explicitArray: false, explicitRoot: false, validator: validator})
    .then(data => {
      for (let key in data) {
        if (key !== '$') return Array.isArray(data[key]) ? data[key] : [data[key]]
      }
      return []
    })
}


/**
 * validator - xmlParser helper to validate/convert specific attributes
 * See https://github.com/Leonidas-from-XIV/node-xml2js/blob/master/test/parser.test.coffee#L39
 */
function validator(xpath, currentValue, newValue) {
  // Ensure Fodselsdato attribute has 6 digits
  if (xpath.match(/\/Fodselsdato$/)) newValue = pad(newValue, 6)
  return newValue
}
