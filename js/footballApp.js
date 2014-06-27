'use strict';

// App Module

var footballApp = angular.module('footballApp', [
	'ngRoute', 
	'footballControllers'
]);

footballApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/teams', {
				templateUrl: 'teams/teamList.html',
				controllers: 'teamListController'
			}).
			when('/teams/:teamId', {
				templateUrl: 'teams/teamTemplate.html',
				controllers: 'teamDetailController'
			}).
			otherwise({
				redirectTo: '/teams'
		});
	}]);