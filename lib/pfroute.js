var express = require('express');
var path = require('path');
var pfrouter = express();
var fs = require('fs');


pfrouter.use(express.static(path.join(__dirname, 'browser')));
pfrouter.use(express.static(path.join(__dirname, '../node_modules')));

pfrouter.get('/data', function(req, res){
    res.json(req.RESTroutes);
});


module.exports = pfrouter;