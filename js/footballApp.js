'use strict';
// Football App Module
var footballApp = angular.module('footballApp', [
	'ngRoute', 
	'angularFileUpload',
	'footballControllers',
	'footballServices'
]);
// Football App route provider
footballApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/welcome', {
				templateUrl: 'teams/welcome.html'
			}).
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
			when('/edit/:teamId', {
				templateUrl: 'teams/editTeam.html',
				controllers: 'editTeamController'	
			}).
			when('/delete/:teamId', {
				templateUrl: 'teams/deleteTeam.html',
				controllers: 'deleteTeamController'	
			}).
			otherwise({
				redirectTo: '/welcome'
		});
	}]);