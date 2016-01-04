'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _person = require('./person');

var person = _interopRequireWildcard(_person);

var _application = require('./application');

var application = _interopRequireWildcard(_application);

var _request = require('./request');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  person: person,
  application: application,
  selectOne: _request.selectOne,
  selectMany: _request.selectMany
};