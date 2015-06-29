/**
 * Created by sangmin on 6/29/15.
 */
var express = require('express');
var path = require('path');
var pfrouter = express();

pfrouter.use(express.static(path.join(__dirname, 'browser')));
pfrouter.use(express.static(path.join(__dirname, '../node_modules/angular')));

pfrouter.get('/', function(req, res, next){
    res.sendFile('./index.html');
});

pfrouter.get('/data', function(req, res, next){
    res.send(req.RESTroutes)
})
module.exports = pfrouter;