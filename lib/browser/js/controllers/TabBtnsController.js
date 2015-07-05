app.controller('TabBtnsController', function($scope){

	//Put the state name of the tabs in the array below.
	$scope.tabs = [
					{name:"The first tab", directive:'tab1'},
					{name:"Request History", directive:'history'},
					{name:"The third tab", directive:'tab3'},
					{name:"The fourth tab", directive:'tab4'}
				]

	$scope.selectedIndex = 3;
	
	// setInterval(function(){
	// 	$scope.selectedIndex = Math.floor(Math.random()*4)
	// 	console.log("SWITCHING SELECTED INDEX TO ", $scope.selectedIndex);
	// }, 100)
})