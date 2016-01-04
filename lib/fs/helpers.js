'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.toSSN = exports.xmlToJson = exports.getAttribute = exports.pad = undefined;

var _bluebird = require('bluebird');

var _xml2js = require('xml2js');

var xmlParser = _bluebird.Promise.promisify(_xml2js.parseString);

// Pad string with leading 0's
function pad(string, length) {
  string = string + '';
  return string.length >= length ? string : new Array(length - string.length + 1).join('0') + string;
}

// Convert birthdate and partial ssn to complete SSN
// In FS, dates are stored without leading 0's
function toSSN(birthdate, ssnSuffix) {
  return pad(birthdate, 6) + ssnSuffix;
}

// Extract attribute from XML
function getAttribute(object, attributes) {
  try {
    if (Array.isArray(attributes)) return attributes.map(function (key) {
      return object[key].join(' ');
    }).join(' ').trim();else return object[attributes][0].trim();
  } catch (e) {
    return null;
  }
}

// Extracts result from response
function extractResult(model, data) {
  if (data.doSelectManyResponse && data.doSelectManyResponse[model]) {
    return _bluebird.Promise.resolve(data.doSelectManyResponse[model]);
  } else if (data.doSelectResponse && data.doSelectResponse[model]) {
    if (data.doSelectResponse.Status[0].Kode[0] === '1') return _bluebird.Promise.resolve(data.doSelectResponse[model][0]);else return _bluebird.Promise.reject('Record not found');
  } else {
    return _bluebird.Promise.reject('No data');
  }
}

// Convert XML to JSON
function xmlToJson(model, data) {
  var serialize = arguments.length <= 2 || arguments[2] === undefined ? raw : arguments[2];

  return xmlParser(data).then(function (result) {
    return extractResult(model, result);
  }).then(function (result) {
    if (Array.isArray(result)) return result.map(function (obj) {
      return serialize(obj);
    });else return serialize(result);
  });
}

// Returns all attributes
function raw(data) {
  var result = {};
  for (var key in data) {
    result[key] = getAttribute(data, key);
  }
  return result;
}

exports.pad = pad;
exports.getAttribute = getAttribute;
exports.xmlToJson = xmlToJson;
exports.toSSN = toSSN;
exports.pad = pad;
exports.raw = raw;