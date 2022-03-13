const express = require('express');
const { json } = require('express/lib/response');
const app = express();

app.use(express.static('client'));

app.use(express.json());

const fs = require('fs');

// read people list
app.get('/people', function (req, resp) {
    fs.readFile('data/people.json', (err, data) => {
        if (err) {
            throw err;
        }
        resp.status(200).json(JSON.parse(data));
    });
});

module.exports = app;
