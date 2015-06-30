app.config(function($stateProvider){
	$stateProvider.state('tab1',{
		url: '/tab1',
		controller:function(){},
		templateUrl: 'js/states/tab1.html'
	})
	$stateProvider.state('tab2',{
		url: '/tab2',
		controller:function(){},
		templateUrl: 'js/states/tab2.html'
	})
	$stateProvider.state('tab3',{
		url: '/tab3',
		controller:function(){},
		templateUrl: 'js/states/tab3.html'
	})
	$stateProvider.state('tab4',{
		url: '/tab4',
		controller:function(){},
		templateUrl: 'js/states/tab4.html'
	})
})