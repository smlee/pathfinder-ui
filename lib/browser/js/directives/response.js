app.dirdctive('response', function(RequestFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/response.html',
		link: function(scope, elem, attr){
			RequestFactory.reqRoute.then(function(response){
				scope.data = response.data;
				scope.status = response.status;
				scope.headers = response.headers;
			})
		}
	}
})