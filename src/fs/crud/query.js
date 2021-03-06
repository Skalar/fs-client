import Promise from 'bluebird'
import { parseString } from 'xml2js'
import { pad } from '../helpers'
import request from './request'

const xmlParser = Promise.promisify(parseString)

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
  const query = []
  for (const key in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, key)) query.push(`<${key}>${filter[key]}</${key}>`)
  }
  return query
}


/**
 * validator - xmlParser helper to validate/convert specific attributes
 * See https://github.com/Leonidas-from-XIV/node-xml2js/blob/master/test/parser.test.coffee#L39
 */
function validator(xpath, currentValue, newValue) {
  // Ensure Fodselsdato attribute has 6 digits
  return xpath.match(/\/Fodselsdato$/) ? pad(newValue, 6) : newValue // eslint-disable-line
}


/**
 * xmlToJson - Parse XML response and return Array with JSON data
 *
 * @param  {type} data  the XML data to parse
 * @return {type}       Promise<array,error>
 */
function xmlToJSON(data) {
  return xmlParser(data, { trim: true, explicitArray: false, explicitRoot: false, validator})
    .then(data => {
      for (const key in data) {
        if (key !== '$') return Array.isArray(data[key]) ? data[key] : [data[key]]
      }
      return []
    })
}

/**
 * query - Performs a selectMany request against the FS CRUD API
 *
 * @param  {type} table  Table to lookup (ie SoknadsAlternativ, Person etc)
 * @param  {type} filter Object containing key/values to filter by (ie { Personr: '12345'})
 * @return {type}        Promise<json,error>
 */
export function selectMany(table, filter) {
  const xml = `<${table}>${queryBuilder(filter)}</${table}>`
  return request('selectMany', xml).then(xmlToJSON)
}
