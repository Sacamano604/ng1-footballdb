'use strict';

// Controllers Module

var footballControllers = angular.module('footballControllers', []);
    
footballControllers.controller('teamListController', [ "$scope", "$http", 
	function ($scope, $http) {
      $http({method: 'GET', url: 'teams/teams.php'}).success(function(data){
        $scope.teams = data;
      });
    $scope.sortField = 'name';
    $scope.reverse = false;
}]);

footballControllers.controller('teamDetailController', ["$scope", "$routeParams", "$http",  
	function ($scope, $routeParams){
    	$scope.teamId = $routeParams.teamId;
}]);