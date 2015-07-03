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
	$scope.currNode = {
		url: "/hero/:id",
		method: "GET",
		params: {}
	};
	$scope.setParams = function(){
		$scope.currNode.params = {}
		$scope.currNode.url.split("/").forEach(function(item){
			if(item[0] === ":"){
				$scope.currNode.params[item.slice(1)] = null;
			}
		})
	}
	$scope.populateData = function(currNode){
<<<<<<< HEAD
		console.log("CURR NODE", currNode)
		$scope.urlParams = []
=======
>>>>>>> 0ad696eeb89e0045e1edac24ba9028bb50c71e6c
		$scope.currNode.method = currNode.method
		$scope.currNode.url = currNode.name
		$scope.setParams()
		// $scope.$digest()
	}
	$scope.urlParams = []
	// $scope.setParams() //this is for testing until tree is hooked up to this controller

})