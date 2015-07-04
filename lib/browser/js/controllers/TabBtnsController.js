app.controller('TabBtnsController', function($scope){

	//Put the state name of the tabs in the array below.
	$scope.tabs = [
					{name:"The first tab", directive:'tab1'},
					{name:"Request History", directive:'tab2'},
					{name:"The third tab", directive:'tab3'},
					{name:"The fourth tab", directive:'tab4'}
				]
})