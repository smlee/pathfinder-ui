app.factory('DataFactory', function($http){
	
	var dataPromise = $http.get('data').then(function(response) {
		return response.data;
	});

	return {
		dataPromise: dataPromise
	}
});

