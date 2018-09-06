app.directive("auth",["$http","RequestFactory",function($http,rf){
    return{
        restrict: "E",
        scope: true,
        templateUrl: 'js/directives/auth.html',
        link: function(scope){
            scope.authRequest = {client_id:"",
            
            client_secret: "",
            audience:"",
            grant_type:"client_credentials"};
            scope.clientId = "";
            scope.clientSecret = "";
            scope.audience = "";
            scope.visible = false;
            scope.showSuccess = function(){
                scope.visible = true;
            };
            scope.setMessage = function(message){
                scope.message = message;
                window.setTimeout(function(){
                    scope.errorMessage = "";
                    scope.$apply();
                },5000);
            };
            scope.getToken = function(){
                if(!scope.authForm.$valid){
                    scope.setMessage("Please set all the required values");
                }else{
                    scope.authRequest.client_id = scope.clientId;
                    scope.authRequest.client_secret = scope.clientSecret;
                    scope.authRequest.audience = scope.audience;
                    scope.loading = true;
                    $http.post(scope.tokenUrl,scope.authRequest,{ headers: {"content-type" : "application/json"}})
                    .then(function(response){
                        scope.loading = false;
                        if(response.status === 200 && response.data.access_token){
                            var token = response.data.access_token;
                            rf.setAuthToken(token);
                            scope.setMessage("The token has been set");
                        }
                        else{
                           scope.setMessage("Error gettting token make sure your values are correct and you have configured your token service");
                        }
                    })
                }  
            };
        }
    }
}])