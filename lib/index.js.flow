// @flow

const express = require('express');
import type {
    $Application,
    $Request,
    $Response,
    Middleware,
    NextFunction
} from 'express';
const app = express();
import { fs } from './utils/fs.js';
fs.setEncode('utf8');
import { JSONstring, format, formatProp } from './utils/tools.js';
const base = require('../config/base.js');
const path = require('path');
function tmpdir(subPath) {
  return path.resolve(base.paths.tmpdir, subPath);
}
app.set('trust proxy', true);
app.set('x-powered-by', false);
app.get('/', function(req:$Request, res) {
  res.send('Hello World!');
  const logStr = `req:\n${formatProp(req)}\n`;
  fs.writeFile(tmpdir('log'), logStr);
});

app.get('/log', async (req: $Request, res: $Response) => {
  const str = await fs.readFile(tmpdir('log'));
  res.send(str);
});

app.get('/json', (req: $Request, res: $Response) => {
  const data = {
    name: '德华',
    age: 18,
  };
  console.log(app.get('jsonp callback name'));
  app.set('jsonp callback name', 'cb');
  app.set('json spaces', 8);
  res.jsonp(data);
});

app.listen(18801, function() {
  console.log('Example app listening on port 18801!');
});
