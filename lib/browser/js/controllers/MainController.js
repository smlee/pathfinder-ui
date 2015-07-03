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
		$scope.currNode.url.split("/").forEach(function(item){
			if(item[0] === ":"){
				$scope.currNode.params[item.slice(1)] = null;
			}
		})
	}
	$scope.populateData = function(currNode){
		console.log("CURR NODE", currNode)
		$scope.currNode.method = currNode.method
		$scope.currNode.url = currNode.name
		$scope.setParams()
	}
	// $scope.setParams() //this is for testing until tree is hooked up to this controller

})