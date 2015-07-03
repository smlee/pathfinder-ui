var example = require('./example');
var example = require('./example');
var pfroute = require('./pfroute');

module.exports = pathfinderUI;



function pathfinderUI (app){

    pfroute.request.RESTroutes = generateRouteTree(app);


    function generateRouteTree(app) {
        var routeObj = {};
        var topLevelRouteStack = app._router.stack;
        var routes = retrieveRoutes(topLevelRouteStack);
        routeObj["name"] = "APP";
        routeObj["children"] = routes;
        return routeObj;

    }

    function retrieveRoutes (topLevelRouteStack, parentPath) {

        var allRoutes = [];
        var pPath = "";
        if(parentPath) {
            if (parentPath === '/'){
                parentPath = '';
            }
            pPath = parentPath;
        }

        var routesArray = topLevelRouteStack.filter(function(stack){    // filter out middleware
            return stack.route || stack.handle.stack;
        });

        routesArray.map(function(e){
            var parentName;
            if (e.route){   // if no subrouter, just direct route

                
                var route = { name: pPath + e.route.path, method: e.route.stack[0].method };
                allRoutes.push(route);

            } else if (e.handle.stack) {    // if subrouter exists
               
                parentName = '/';
                if (e.regexp.test('/')){
                    parentName = '/';
                }
                else {
                    parentName = e.regexp.toString().slice(0, -1).match(/\w+/ig).join("/");
                }

                var parentPath = pPath + parentName;

                var route = {
                    name: parentName
                };

                route.children = retrieveRoutes(e.handle.stack, parentPath);

                allRoutes.push(route);
            } else {
                console.log("missed a case");
            }

        });

        return allRoutes;
    }


}

pathfinderUI.router = pfroute;
