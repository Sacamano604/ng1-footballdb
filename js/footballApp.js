'use strict';

// App Module

var footballApp = angular.module('footballApp', [
	'ngRoute', 
	'angularFileUpload',
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
			when('/add', {
				templateUrl: 'teams/addTeam.html',
				controllers: 'addTeamController'
			}).
			otherwise({
				redirectTo: '/teams'
		});
	}]);