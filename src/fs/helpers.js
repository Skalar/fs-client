import { Promise } from 'bluebird'
import { parseString } from 'xml2js'

var xmlParser = Promise.promisify(parseString)

// Pad string with leading 0's
function pad(string, length) {
  string = string + ''
  return string.length >= length ? string : new Array(length - string.length + 1).join('0') + string
}

// Convert birthdate and partial ssn to complete SSN
// In FS, dates are stored without leading 0's
function toSSN(birthdate, ssnSuffix) {
  return pad(birthdate, 6) + ssnSuffix
}

// Extract attribute from XML
function getAttribute(object, attributes) {
  try {
    if (Array.isArray(attributes)) return attributes.map(key => object[key].join(' ')).join(' ').trim()
    else return object[attributes][0].trim()
  } catch (e) {
    return null
  }
}

// Extracts result from response
function extractResult(model, data) {
  if (data.doSelectManyResponse && data.doSelectManyResponse[model]) {
    return Promise.resolve(data.doSelectManyResponse[model])
  } else if (data.doSelectResponse && data.doSelectResponse[model]) {
    if (data.doSelectResponse.Status[0].Kode[0] === '1') return Promise.resolve(data.doSelectResponse[model][0])
    else return Promise.reject('Record not found')
  } else {
    return Promise.reject('No data')
  }
}

// Convert XML to JSON
function xmlToJson(model, data, decorator={}) {
  return xmlParser(data)
    .then(result => extractResult(model, result))
    .then(result => {
      if (Array.isArray(result)) return result.map(obj => Object.assign(raw(obj), decorator))
      else return Object.assign(raw(result), decorator)
    })
}

// Returns all attributes
function raw(data) {
  var result = {}
  for (var key in data) {
    result[key] = getAttribute(data, key)
  }
  return result
}

export { pad, getAttribute, xmlToJson, toSSN, pad, raw }
