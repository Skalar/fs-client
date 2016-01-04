'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = undefined;

var _request = require('./request');

var _helpers = require('../helpers');

function serialize(application) {
  return {
    year: (0, _helpers.getAttribute)(application, 'Arstall'),
    ssn: (0, _helpers.toSSN)((0, _helpers.getAttribute)(application, 'Fodselsdato'), (0, _helpers.getAttribute)(application, 'Personnr')),
    admissionType: (0, _helpers.getAttribute)(application, 'Opptakstypekode'),
    courseTypeNumber: (0, _helpers.getAttribute)(application, 'Studietypenr'),
    priority: (0, _helpers.getAttribute)(application, 'Prioritetsnr'),
    semesterCode: (0, _helpers.getAttribute)(application, 'Terminkode')
  };
}

function findAll() {
  var year = arguments.length <= 0 || arguments[0] === undefined ? new Date().getFullYear() : arguments[0];

  return (0, _request.selectMany)('SoknadsAlternativ', { Arstall: year }, serialize);
}

exports.findAll = findAll;