'use strict';

// Controllers Module

var footballControllers = angular.module('footballControllers', []);
    
footballControllers.controller('teamListController', [ "$scope", "$http", 
	function ($scope, $http) {
      $http({method: 'GET', url: 'teams/teams.php?action=list'}).success(function(data){
        $scope.teams = data;
      });
    $scope.sortField = 'name';
    $scope.reverse = false;
}]);

footballControllers.controller('teamDetailController', ["$scope", "$routeParams", "$http", 
	function ($scope, $routeParams, $http){
    $scope.teamId = $routeParams.teamId;
    $http({method: 'GET', url: 'teams/teams.php?action=detail&id=' + $scope.teamId}).success(function(data){
      $scope.team = data;
    });
}]);

footballControllers.controller('addTeamController', ["$scope", "$http", "$location", 
  function ($scope, $http, $location){
      $scope.addTeam = function(){
        $scope.information = $scope.newTeam;
         $http.post('teams/teams.php?action=add', $scope.information).success(function(data){
            $scope.json = angular.toJson($scope.information);
            $location.path('/teams');
         })
      };
}]);