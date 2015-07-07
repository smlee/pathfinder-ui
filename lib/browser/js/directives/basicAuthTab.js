app.directive('oAuthTab', function (RequestFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/oAuthTab.html',
        link: function (scope) {
            scope.oAuthCreds = { 
            	authorizationUrl: null,
            	accessTokenUrl: null,
                clientId: null,
                clientSecret: null,
                scope: null
            };

           
            scope.setBasicAuth = function(creds) {
            	var credsString = creds.username + ":" + creds.password;
            	var encodedCreds = Base64.encode(credsString);
            	var header = { Authorization: "Basic " + encodedCreds }
            	var headerKey = Object.keys(header).toString();
            	var headerVal = header[headerKey];
            	RequestFactory.addToHeaders(headerKey, headerVal);
                scope.switchAuthTab(0);
                console.log("header", header);
            	// scope.selectedAuthIndex = 0;
            	console.log("Scope selectedAuthIndex", scope.selectedAuthIndex);

            }



        }
    };

});