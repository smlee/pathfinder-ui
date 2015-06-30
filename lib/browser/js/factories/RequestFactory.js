app.factory('RequestFactory', function($http){
	return {
		reqRoute: function(reqObj){
			return $http(reqObj)
			.success(function(data, status, headers, config){
				var details = {}
				details.data = data
				details.status = status
				details.headers = headers
				details.config = config
				return details
			})
			.error(function(response){
				var details = {}
				details.data = data
				details.status = status
				details.headers = headers
				details.config = config
				return details
			})
		}
	}
})