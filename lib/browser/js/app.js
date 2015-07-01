
var app = angular.module('pathfinderApp',['ui.router', 'ngMaterial'])
	.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('pink')
			.accentPalette('orange')
			.warnPalette('red');
	})

