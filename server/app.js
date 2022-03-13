const express = require('express');
const { json } = require('express/lib/response');
const app = express();

app.use(express.static('./../client/'));

app.use(express.json());

const fs = require('fs');

const html_path = "./../client/html/";

const people_data = require('./data/people.json')

app.get('/gallery', function(req,resp){
    fs.readFile(html_path+'index.html',function(err,data){
        if (err){
            resp.writeHead(404,{'Content-Type':'text/html'});
        }
        else{
            resp.writeHead(200,{'Content-Type':'text/html'});
            resp.write(data.toString());
        }
    resp.end();
    })
})

app.get('/gallery/get_post', function(req,resp){
    // resp.writeHead(200,{'Content-Type':'application/json'});
    // resp.write(people_data);
    // resp.end();
    fs.readFile('data/people.json',function(err,data){
        if (err){
            resp.writeHead(404,{'Content-Type':'text/html'});
        }
        else{
            resp.writeHead(200,{'Content-Type':'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'});
            resp.write(data.toString());
        }
    resp.end();
    })
})

app.get('/form', function(req,resp){
    fs.readFile(html_path+'form.html',function(err,data){
        if (err){
            resp.writeHead(404,{'Content-Type':'text/html'})
        }
        else{
            resp.writeHead(200,{'Content-Type':'text/html'})
            resp.write(data.toString())
        }
    resp.end()
    })
})

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
                resp.writeHead(200,{'Content-Type':'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'});
                resp.write(individual.toString());
                resp.end()
                return;
            }
        }
        resp.status(404).send('Person with ID not found');
    });
});

app.get('/people/:id', function (req, resp) {
    const id = req.params.id;
    console.log(id);
    fs.readFile('data/people.json', (err, data) => {
        if (err) {
            throw err;
        }
        const all = JSON.parse(data);
        for (const individual of all) {
            if (individual['ID'] === id) {
                resp.writeHead(200,{'Content-Type':'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'});
                resp.write(individual.toString());
                resp.end()
                return;
            }
        }
        resp.status(404).send('Person with ID not found');
    });
});


app.listen(3000)

module.exports = app;
