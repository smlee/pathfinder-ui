module.exports =  function (routes, src) {
	
var Table = require('cli-table');
var table = new Table({ head: ["", "Name", "Path"] });
 
	console.log('\n********************************************');
	console.log('\t\tEXPRESS');
	console.log('********************************************\n');
	for (var key in routeObj) {
		if (routeObj.hasOwnProperty(key)) {
			if (key === "children") {
				var routes = _.pluck(key, 'url');
				console.log("routes", route);
			}

			
			// var val = routes[key];
			// if(val.route)
			// {
			// 	val = val.route;
			// 	var _o = {};
	  //   		_o[val.stack[0].method]  = [val.path, val.path ]; 	
	  //   		table.push(_o);
			// }		
		}
	}

console.log(table.toString());
 
return table;
};