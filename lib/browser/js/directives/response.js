app.directive('response', function(RequestFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/response.html',
		link: function(scope){
			scope.getResponse = RequestFactory.getResponse;
			scope.response = RequestFactory.getResponse()
			console.log("response", scope.response)
		}
	}
})
