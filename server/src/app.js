// server.js
'use strict';
const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.port || 3000) 

app.get('/', (req, res, next) =>{
  res.send('<h1>HEY BABY ICH LIEBE DICHh1>');
})

app.listen(app.get('port'), server =>{
  console.info(`Server listen on port ${app.get('port')}`);
})