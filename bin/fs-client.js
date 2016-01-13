#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _crud = require('../lib/fs/crud');

var table = process.argv[2];
var query = process.argv[3];
var filter = {};

if (query) {
  query.split(',').forEach(function (condition) {
    var _condition$split = condition.split('=');

    var _condition$split2 = _slicedToArray(_condition$split, 2);

    var key = _condition$split2[0];
    var value = _condition$split2[1];

    filter[key] = value;
  });
}

if (table && _crud.crud[table]) {
  _crud.crud[table].find(filter).then(console.log).catch(console.error);
} else {
  console.log('Example usage: fs-client Person "Kjonn=K,Fodselsdato=180588"');
}