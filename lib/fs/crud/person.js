'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = exports.find = undefined;

var _request = require('./request');

var _helpers = require('../helpers');

function serialize(person) {
  return {
    ssn: (0, _helpers.toSSN)(person.Fodselsdato[0], person.Personnr[0]),
    name: (0, _helpers.getAttribute)(person, ['Fornavn', 'Etternavn']),
    email: (0, _helpers.getAttribute)(person, 'Emailadresse_Privat') || (0, _helpers.getAttribute)(person, 'Emailadresse'),
    gender: (0, _helpers.getAttribute)(person, 'Kjonn') === 'M' ? 'male' : 'female',
    username: (0, _helpers.getAttribute)(person, 'Brukernavn'),
    address: (0, _helpers.getAttribute)(person, ['Adrlin1_Hjemsted', 'Adrlin2_Hjemsted', 'Adrlin3_Hjemsted']),
    postalCode: (0, _helpers.pad)((0, _helpers.getAttribute)(person, 'Postnr_Hjemsted'), 4),
    countryCode: (0, _helpers.getAttribute)(person, 'Terminkode')
  };
}

function findAll(filter) {
  return (0, _request.selectMany)('Person', filter, serialize);
}

function find(ssn) {
  var _ssn$match = ssn.match(/.{1,6}/g);

  var _ssn$match2 = _slicedToArray(_ssn$match, 2);

  var birthdate = _ssn$match2[0];
  var suffix = _ssn$match2[1];

  return (0, _request.selectOne)('Person', { Fodselsdato: birthdate, Personnr: suffix }, serialize);
}

exports.find = find;
exports.findAll = findAll;