app.controller('MainController', function($scope, RequestFactory){
	$scope.request = {};
	$scope.request.method = 'GET'
	$scope.request.url = '/hero'
	$scope.sendReq = function(){
		RequestFactory.reqRoute($scope.request).then(function(respDetails){
			console.log("respDetails", respDetails)
		}) 
	}
})