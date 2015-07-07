app.directive('oAuthTab', function (RequestFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/oAuthTab.html',
        link: function (scope) {
            scope.oAuthCreds = {
            	authUrl: null,
            	accessTokenUrl: null,
                clientId: null,
                clientSecret: null,
                scope: null
            };

           
            scope.setOAuth = function(creds) {

                console.log("creds", creds);
            	// var credsString = creds.username + ":" + creds.password;
            	// var header;
             //    var headerKey = Object.keys(header).toString();
            	// var headerVal = header[headerKey];
            	// RequestFactory.addToHeaders(headerKey, headerVal);
             //    scope.switchAuthTab(0);
             //    console.log("header", header);

            }



        }
    };

});