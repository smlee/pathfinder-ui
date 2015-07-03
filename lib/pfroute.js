// Created By: Sangmin Lee
// Purpose: ????
// Date: 6/29/15

var express = require('express');
var path = require('path');
var pfrouter = express();

pfrouter.use(express.static(path.join(__dirname, 'browser')));
pfrouter.use(express.static(path.join(__dirname, '../node_modules')));

pfrouter.get('/data', function(req, res){
    res.json(req.RESTroutes);
});

module.exports = pfrouter;