const { response, query } = require('express')
var express = require('express')
var app = express()
var fs = require('fs')

app.use(express.static('client'))

app.get('/gallery', function(req,resp){
    fs.readFile('./index.html',function(err,data){
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

app.listen(8000)