app.directive('response', function(RequestFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/directives/response.html',
		link: function(scope){
			
			scope.isJson = false; //Is the response data a JSON object?

			scope.getResponse = function(){

				//REFACTOR THIS maybe.
				scope.isJson = false;
				//Currently the ng-json filter allows json objects to display
				//cleanly. This messes up HTML responses though.
				//We use a scope var to track if it's a json obj or not
				//and based on this var, decide if we should throw response.data
				//into a json filter or not. 

				var response = RequestFactory.getResponse();

				if(typeof response.data === 'object'){
					scope.isJson = true;
				}

				return response;
			}

			scope.response = RequestFactory.getResponse();

		}//End of Link
	}
})