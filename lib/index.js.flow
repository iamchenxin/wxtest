// @flow

const express = require('express');
const app = express();
import { fs } from './utils/fs.js';
fs.setEncode('utf8');
import { JSONstring, format, formatProp } from './utils/tools.js';
const base = require('../config/base.js');
const path = require('path');
function tmpdir(subPath) {
  return path.resolve(base.paths.tmpdir, subPath);
}

app.get('/', function(req, res) {
  res.send('Hello World!');
  const logStr = `req:\n${formatProp(req)}\n`;
  fs.writeFile(tmpdir('log'), logStr);
});

app.get('/log', async (req, res) => {
  const str = await fs.readFile(tmpdir('log'));
  res.send(str);
});

app.listen(18801, function() {
  console.log('Example app listening on port 18801!');
});
