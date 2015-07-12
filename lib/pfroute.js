// Created By: Sangmin Lee
// Purpose: ????
// Date: 6/29/15

var express = require('express');
var path = require('path');
var pfrouter = express();
var fs = require('fs');

pfrouter.use(express.static(path.join(__dirname, 'browser')));
pfrouter.use(express.static(path.join(__dirname, '../node_modules')));

pfrouter.get('/data', function(req, res){
    res.json(req.RESTroutes);
});

// pfrouter.get('/table', function(req, res) {
// 	res.json(req.routeTable);
// })

// pfrouter.get('/history', function(req, res) {

// 	console.log("dirname", __dirname);
// 	var pathUrl = path.join(__dirname, '../history/history.json');
// 	console.log("pathUrl", pathUrl);

// 	fs.readFile(pathUrl).then(function(data) {
// 		console.log(data);
// 		res.json(data);
// 	}, function(err) {
// 		console.log(err);
// 	})

// })

module.exports = pfrouter;