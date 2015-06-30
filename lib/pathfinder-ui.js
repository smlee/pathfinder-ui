var example = require('./example');
var pfroute = require('./pfroute');

module.exports = pathfinderUI;

pathfinderUI.pfroute = pfroute;

function pathfinderUI (app){

    pfroute.request.RESTroutes = generateRouteTree(app);


    function generateRouteTree(app) {
        var topLevelRouteStack = app._router.stack;
        return retrieveRoutes(topLevelRouteStack);
    }

    function retrieveRoutes (topLevelRouteStack, parentPath) {
        // var topLevelRouteStack = app._route.stack;
        var allRoutes = [];
        var pPath = ""
        if(parentPath) pPath = parentPath

        var routesArray = topLevelRouteStack.filter(function(stack){    // filter out middleware
            return stack.route || stack.handle.stack;
        });

        routesArray.forEach(function(e){

            if (e.route){   // if no subrouter, just direct route

                // console.log("ROUTE PATH:", e.route.path, "ROUTE STACK", e.route.stack, "ROUTE STACK[0] METHOD", e.route.stack[0].method);
                var route = { path: pPath + e.route.path, method: e.route.stack[0].method };
                allRoutes.push(route);

            } else if (e.handle.stack) {    // if subrouter exists
                //console.log(e.handle.stack);
                //{path: grab pathname from the regex exp, method: router}
                // test/api
                // console.log('something wrong here?',e.regexp.toString().slice(0, -1), e);
                var parentName = '';
                if (e.regexp.test('/')){
                    parentName = '/';
                }
                else {
                    parentName = e.regexp.toString().slice(0, -1).match(/\w+/ig).join("/");
                }

                //var parentPath = pPath + "/" + e.regexp.toString().slice(0, -1).match(/\w+/ig).join("/");
                var parentPath = pPath + parentName;
                //console.log("pName", parentName);
                var route = {};
                route[parentName] = [];


                // allRoutes.push({path: parentName, method: "router"})
                var subRouterStack = e.handle.stack; // if route is in the handle's stack, retrieve those routes

                route[parentName] = retrieveRoutes(subRouterStack, parentPath);
                // console.log("SUBROUTES", subRoutes);
                // allRoutes.push(subRoutes)
                allRoutes.push(route);
            } else {
                console.log("missed a case");
            }

        });
        //console.log(allRoutes);
        return allRoutes
    }

}