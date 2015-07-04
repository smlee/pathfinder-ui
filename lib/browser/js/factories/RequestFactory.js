app.factory('RequestFactory', function($http){
	return {
		reqRoute: function(reqObj){
			console.log("reqobj", reqObj)
			return $http(reqObj).then(
			function(response){
				console.log("response object", response);
				return response
			},
			function(response){
				return response
			})
		}
	}
})