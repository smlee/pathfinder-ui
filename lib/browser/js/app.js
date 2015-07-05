
var app = angular.module('pathfinderApp',['ngMaterial', 'ngMdIcons'])
	.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('pink')
			.accentPalette('orange')
			.warnPalette('red');
	})

