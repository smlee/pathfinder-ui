var example = require('./example');
var example = require('./example');
var pfroute = require('./pfroute');

module.exports = pathfinderUI;

function pathfinderUI (app){

    pfroute.request.RESTroutes = generateRouteTree(app);
    console.log(generateRouteTree(app).children[3].children[0].children[0].children);

    function generateRouteTree(app) {
        var routeObj = {};
        var topLevelRouteStack = app._router.stack;
<<<<<<< HEAD
        var routes = retrieveRoutes(topLevelRouteStack);
        routeObj["name"] = "APP";
        routeObj["children"] = routes;
=======
        routeObj.name = "APP";
        routeObj.children = retrieveRoutes(topLevelRouteStack);
>>>>>>> 0ad696eeb89e0045e1edac24ba9028bb50c71e6c
        return routeObj;
    }

    function retrieveRoutes (topLevelRouteStack, parentPath) {

        var allRoutes = [];
        var pPath = "";
<<<<<<< HEAD
=======
        console.log('this is the parentPath', parentPath)
>>>>>>> 0ad696eeb89e0045e1edac24ba9028bb50c71e6c
        if(parentPath) {
            if (parentPath === '/'){
                parentPath = '';
            }
            pPath = parentPath;
        }

        var routesArray = topLevelRouteStack.filter(function(stack){    // filter out middleware
            return stack.route || stack.handle.stack;
        });
<<<<<<< HEAD
=======

        routesArray.map(function(e){
            var parentName;
>>>>>>> 0ad696eeb89e0045e1edac24ba9028bb50c71e6c

        routesArray.map(function(e){
            var parentName;
            if (e.route){   // if no subrouter, just direct route

<<<<<<< HEAD
                
=======
>>>>>>> 0ad696eeb89e0045e1edac24ba9028bb50c71e6c
                var route = { name: pPath + e.route.path, method: e.route.stack[0].method };
                allRoutes.push(route);

            } else if (e.handle.stack) {    // if subrouter exists
<<<<<<< HEAD
               
=======

>>>>>>> 0ad696eeb89e0045e1edac24ba9028bb50c71e6c
                parentName = '/';
                if (e.regexp.test('/')){
                    parentName = '/';
                }
                else {
                    parentName = e.regexp.source.match(/\w+/ig).join("/");
                }

                var parentPath = pPath + parentName;
<<<<<<< HEAD

                var route = {
                    name: parentName
                };

                route.children = retrieveRoutes(e.handle.stack, parentPath);

=======

                var route = {
                    name: parentName
                };

                route.children = retrieveRoutes(e.handle.stack, parentPath);

>>>>>>> 0ad696eeb89e0045e1edac24ba9028bb50c71e6c
                allRoutes.push(route);
            } else {
                console.log("missed a case");
            }

        });

        return allRoutes;
    }

}

pathfinderUI.router = pfroute;
