const express = require('express');
const bodyParser = require('body-parser');
const midpointRouter = require('./routers/mid-point');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  next();
});

app.use('/', midpointRouter);

app.listen(8080);
