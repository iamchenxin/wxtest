'use strict';

var _fs = require('./utils/fs.js');

var _tools = require('./utils/tools.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require('express');

const app = express();

_fs.fs.setEncode('utf8');

const base = require('../config/base.js');
const path = require('path');
function tmpdir(subPath) {
  return path.resolve(base.paths.tmpdir, subPath);
}
app.set('trust proxy', true);
app.get('/', function (req, res) {
  res.send('Hello World!');
  const logStr = `req:\n${ (0, _tools.formatProp)(req) }\n`;
  _fs.fs.writeFile(tmpdir('log'), logStr);
});

app.get('/log', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const str = yield _fs.fs.readFile(tmpdir('log'));
    res.send(str);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

app.get('/json', (req, res) => {
  const data = {
    name: '德华',
    age: 18
  };
  console.log(app.get('jsonp callback name'));
  app.set('jsonp callback name', 'cb');
  app.set('json spaces', 8);
  res.jsonp(data);
});

app.listen(18801, function () {
  console.log('Example app listening on port 18801!');
});
//# sourceMappingURL=index.js.map
