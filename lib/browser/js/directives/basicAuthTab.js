app.directive('basicAuthTab', function (RequestFactory, EncoderFactory) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/basicAuthTab.html',
        link: function (scope) {
            scope.authCredentials = { 
            	username: null,
            	password: null
            };

            scope.setBasicAuth = function(creds) {
            	var credsString = creds.username + ":" + creds.password;
            	var encodedCreds = EncoderFactory.encodeCreds(credsString);
            	var header = { Authorization: "Basic " + encodedCreds }
            	var headerKey = Object.keys(header).toString();
            	var headerVal = header[headerKey];

            	RequestFactory.addToHeaders(headerKey, headerVal);
                scope.switchAuthTab(0);

            }



        }
    };

});