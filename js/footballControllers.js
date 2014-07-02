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

footballControllers.controller('addTeamController', ["$scope", "$http", 
  function ($scope, $http){
    $scope.addTeam = function(){
      var data = $scope.newTeam;
      $http.post('teams/teams.php?action=add', data)
    };

   // $http({method: 'POST', url: 'teams/teams.php?action=add'}).success(function(data){
     // $scope.team = data;
    //});
  }]);