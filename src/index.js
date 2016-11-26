// @flow

const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
  console.log('!!!!!!!!!~~~~~~~~~~');
});

app.listen(18801, function() {
  console.log('Example app listening on port 18801!');
});
