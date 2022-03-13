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

// read individual details
app.get('/people/:id', function (req, resp) {
    const id = req.params.id;
    fs.readFile('data/people.json', (err, data) => {
        if (err) {
            throw err;
        }
        const all = JSON.parse(data);
        for (const individual of all) {
            if (individual['ID'] === id) {
                resp.status(200).json(individual);
                return;
            }
        }
        resp.status(404).send('Person with ID not found');
    });
});


module.exports = app;
