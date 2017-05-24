#!/usr/bin/node
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT_GIT || 8081;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response) => {
  console.log(JSON.stringify(request.body));
  response.end();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
