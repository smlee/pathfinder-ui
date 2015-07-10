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
	console.log("REQ RESTroutes", req.RESTroutes.children);
    res.json(req.RESTroutes);
});

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

// pfrouter.get('/oauth2/callback', function(req, res) {	// can handle any provider
// 	console.log("hit oauth route"); 
// 	passport.authenticate(), 

// 	function(req, res) {
// 		console.log("req.user", req.user);
// 		res.send("hit oAuth callback, req.user: ", req.user);
// 	};

// });

module.exports = pfrouter;