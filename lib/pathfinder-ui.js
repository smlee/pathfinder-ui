var example = require('./example');
var pfroute = require('./pfroute');

module.exports = pathfinderUI;



function pathfinderUI (app){

    pfroute.request.RESTroutes = generateRouteTree(app);


    function generateRouteTree(app) {
        var routeObj = {};  // create tree object
        var topLevelRouteStack = app._router.stack;
        var routes = retrieveRoutes(topLevelRouteStack);
        routeObj["name"] = "APP";
        routeObj["children"] = routes;
        return routeObj;
    }

    function retrieveRoutes (topLevelRouteStack, parentPath) {
        var allRoutes = [];
        var pPath = "";
        if(parentPath) pPath = parentPath;  // saving so we can get child route's full path

        var routesArray = topLevelRouteStack.filter(function(stack){    // filter out unwanted middleware
            return stack.route || stack.handle.stack;
        });

        routesArray.forEach(function(e){

            if (e.route){   // if no subrouter, just direct route

                var route = { name: pPath + e.route.path, method: e.route.stack[0].method };
                allRoutes.push(route);

            } else if (e.handle.stack) {    // if subrouter exists
                var parentName = '';
                if (e.regexp.test('/')){
                    parentName = '/';
                }
                else {
            
                    parentName = e.regexp.toString().slice(0, -1).match(/\w+/ig).join("/");
                }

                var parentPath = pPath + "/" + parentName;
                var route = {};
                route["name"] = parentName;
                route["children"] = [];

                var subRouterStack = e.handle.stack; // if route is in the handle's stack, retrieve those routes

                route["children"] = retrieveRoutes(subRouterStack, parentPath);
                allRoutes.push(route);
            } else {
                console.log("missed a case");   // for edge cases
            }

        });
        return allRoutes;
    }


}

pathfinderUI.router = pfroute;