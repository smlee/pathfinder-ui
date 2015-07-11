var example = require('./example');
var pfroute = require('./pfroute');
// var Table = require('cli-table');
// var table = new Table({ head: ["Method", "SubRouter", "Path"] });
var table = [];

module.exports = pathfinderUI;
var expressApp = null;

function pathfinderUI (app){
    expressApp = null;
 
    var packageJsonPath = process.cwd() + '/package.json';
    var packageJsonName = require(packageJsonPath).name;


    pfroute.request.RESTroutes = {
        routes: generateRouteTree(app),
        appId: packageJsonName
    };

     pfroute.request.routeTable = table;

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

              if (e.route.path instanceof RegExp) {
                  e.route.path = "/" + e.route.path.source.match(/\w+/ig).join("/");
                }

               var route = { url: pPath + e.route.path, method: e.route.stack[0].method };
               allRoutes.push(route); // add to route tree
               route.subRouter = pPath; // add subrouter path
               table.push(route); // add to route table

           } else if (e.handle.stack) {    // if subrouter exists
               parentName = '/';
               if (e.regexp.test('/')){
                   parentName = '/';
               }
               else {
                   //
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
               //Missed a case
           }

       });
     
       return allRoutes;

   }
}

pathfinderUI.router = pfroute;