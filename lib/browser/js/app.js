
var app = angular.module('pathfinderApp',['ngMaterial'])
	.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('pink')
			.accentPalette('orange')
			.warnPalette('red');
	})

