'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = undefined;

var _request = require('./request');

var _helpers = require('../helpers');

function serialize(course) {

  return {
    year: new Date().getFullYear(),
    name: (0, _helpers.getAttribute)(course, 'Studieprognavn'),
    courseTypeId: (0, _helpers.getAttribute)(course, 'Studieprogramkode'),
    courseCode: null,
    hasAdmissionAssets: false,
    admissionAssetUploadStart: null,
    admissionAssetUploadEnd: null,
    admissionDescription: null
  };
}

function findAll() {
  return (0, _request.selectMany)('Studieprogram', {}, serialize);
}

exports.findAll = findAll;