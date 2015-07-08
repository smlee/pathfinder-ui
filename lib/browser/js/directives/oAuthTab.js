
app.directive('oAuthTab', function (RequestFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/oAuthTab.html',
        link: function (scope) {
            scope.oAuthCreds = {
            	authUrl: null, // provider
            	accessTokenUrl: null,
                clientId: null,
                clientSecret: null,
                scope: null
            };

            scope.callBackUrl = "http://localhost:1337/oauth2/callback";
           
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