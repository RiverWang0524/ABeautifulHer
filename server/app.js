const express = require('express');
const { json } = require('express/lib/response');
const app = express();

app.use(express.static('client/html'));

app.use(express.json());

const fs = require('fs');

module.exports = app;
