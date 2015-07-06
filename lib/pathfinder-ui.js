var example = require('./example');
var pfroute = require('./pfroute');

module.exports = pathfinderUI;

function pathfinderUI (app){
 
    var packageJsonPath = process.cwd() + '/package.json';
    var packageJsonName = require(packageJsonPath).name;

    pfroute.request.RESTroutes = {
        routes: generateRouteTree(app),
        appId: packageJsonName
    };

    // console.log(generateRouteTree(app).children[3].children[0].children[0].children);

    function generateRouteTree(app) {

        var topLevelRouteStack = app._router.stack;
        var routeObj = {
            url: packageJsonName,
            children: retrieveRoutes(topLevelRouteStack)
        };
        return routeObj;
    }

    function retrieveRoutes (topLevelRouteStack, parentPath) {

        var allRoutes = [];
        var pPath = "";
        console.log('this is the parentPath', parentPath)
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
               var route = { url: pPath + e.route.path, method: e.route.stack[0].method };
               allRoutes.push(route);

           } else if (e.handle.stack) {    // if subrouter exists
               parentName = '/';
               if (e.regexp.test('/')){
                   parentName = '/';
               }
               else {
                   //console.log('regex: ', e.regexp.source.match(/\w+/ig).join("/"))
                   parentName = e.regexp.source.match(/\w+/ig).join("/");
               }

               var parentPath = pPath + "/" +parentName;
               if (parentName === '/') parentPath = pPath;
               var route = {
                   url: parentName
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