var app = angular.module('pathFinder', []);
// ^ Once we express.static the entire browser directory
// as well as the angular directory in node_modules, this will 
// work. Until then, don't do too much with angular. You won't
// really be able to test it. Maybe.