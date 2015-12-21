var example = require('./example');
var pfroute = require('./pfroute');
var table;

module.exports = pathfinderUI;

function pathfinderUI (app){
 
    var packageJsonPath = process.cwd() + '/package.json';
    var packageJsonName = require(packageJsonPath).name;

    pfroute.request.RESTroutes = {
        routes: generateRouteTree(app),
        appId: packageJsonName + '-pf',
        routeTable: table
    };

    function generateRouteTree(app) {

        var topLevelRouteStack = app._router.stack;
        table = [];

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

        // filter out middleware
        var routesArray = topLevelRouteStack.filter(function(stack){    
            return stack.route || stack.handle.stack;
        });

        routesArray.map(function(e){
           var parentName;

           // if terminal route, parse regex and add to tree/table
           if (e.route){   

              if (e.route.path instanceof RegExp) {
                  e.route.path = "/" + parse(e.route.path);
                }

               var route = { url: pPath + e.route.path, method: e.route.stack[0].method };

               allRoutes.push(route); // add to route tree
               route.subRouter = pPath; // add subrouter path
               table.push(route); // add to route table

            // if subrouter exists, recursively retrieve terminal routes
           } else if (e.handle.stack) {   
               parentName = '/';

               if (e.regexp.test('/')){
                  parentName = '/';
               }
               else {
                  parentName = parse(e.regexp);
               }

               var parentPath = pPath + "/" + parentName;

               if (parentName === '/') parentPath = pPath;

               var route = {
                   url: parentName
               };

               route.children = retrieveRoutes(e.handle.stack, parentPath);

               allRoutes.push(route);

           } else {
               // Missed a case
           }

       });
     
       return allRoutes;

   }
}

function parse(regExRoute) {

  var components = regExRoute.source.match(/([\w\d\.\\]+)/ig);

  // filter out standalone "\" characters
  var filtered = components.filter(function(component) {
      return component !== "\\";
  });

  // filter out "\" from escaped chars (e.g. "v\.0")
  var cleanRouteComponents = filtered.map(function(comp) {

      if ((/\\/g).test(comp)) {
        var newComp = comp.replace(/\\/g, "");
        return newComp;
      } else {
        return comp;
      }

   });

   return cleanRouteComponents.join("/");
}

pathfinderUI.router = pfroute;