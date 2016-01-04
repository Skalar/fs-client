'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectMany = exports.selectOne = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SELECT = 'select';
var SELECT_MANY = 'selectMany';
var request = _bluebird2.default.promisify(_request2.default);

// Low-level fs request function
function fsRequest(requestType, xml) {
  var tag = 'do' + requestType.charAt(0).toUpperCase() + requestType.slice(1) + 'Request';
  var body = '<' + tag + ' xmlns="http://fsws.usit.no/schemas/crud">' + xml + '</' + tag + '>';

  return request({
    url: process.env.FS_CRUD_URL + '/' + requestType,
    method: 'POST',
    auth: {
      username: process.env.FS_USERNAME,
      password: process.env.FS_PASSWORD
    },
    form: {
      xml: body
    }
  });
}

// Returns query XML
// Example: queryBuilder("Soknad", { Arstall: 2015}))
// => "<Soknad><Arstall>2015</Arstall></Soknad>"
function queryBuilder(table, filter) {
  var query = [];
  for (var key in filter) {
    query.push('<' + key + '>' + filter[key] + '</' + key + '>');
  }return '<' + table + '>' + query + '</' + table + '>';
}

function select(requestType, table, filter, parser) {
  return new _bluebird2.default(function (resolve, reject) {
    var xml = queryBuilder(table, filter);
    fsRequest(requestType, xml).then(function (response) {
      if (response.statusCode === 200) resolve((0, _helpers.xmlToJson)(table, response.body, parser));else reject('Server error');
    });
  });
}

function selectOne(table, filter) {
  var parser = arguments.length <= 2 || arguments[2] === undefined ? _helpers.raw : arguments[2];

  return select(SELECT, table, filter, parser);
}

function selectMany(table, filter) {
  var parser = arguments.length <= 2 || arguments[2] === undefined ? _helpers.raw : arguments[2];

  return select(SELECT_MANY, table, filter, parser);
}

// Not yet implemented
// function upsert(/*table, filter*/) {
//   throw('Not yet implemented')
//   // return fsRequest('doUpsertRequest', xml)
// }

exports.selectOne = selectOne;
exports.selectMany = selectMany;