app.controller('MainController', function($scope, RequestFactory){
	/*
	{
		method: string,
		url: string,
		params: {obj},
		data: {obj},
		headers: {}
	}
	*/
	
	$scope.setParams = RequestFactory.setParams
	$scope.populateData = RequestFactory.populateData
	// $scope.setParams() //this is for testing until tree is hooked up to this controller

})