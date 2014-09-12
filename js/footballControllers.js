'use strict';

// Controller Module
var footballControllers = angular.module('footballControllers', []);
// Controller for displaying the list of teams, with 2 second timeout delay    
footballControllers.controller('teamListController', [ "$scope", "$timeout", "teamService",
  function ($scope, $timeout, teamService) {
    $timeout(function(){
      teamService.teamsList(function(data){
        $scope.teams = data;
        $scope.loading = false;
      });
    }, 2000);
  $scope.sortField = 'name';
  $scope.reverse = false;
}]);
// Controller for displaying the details of the team when the name is clicked, with 3 second timeout delay
footballControllers.controller('teamDetailController', ["$scope", "$timeout", "$routeParams", "teamService",
	function ($scope, $timeout, $routeParams, teamService){
    $timeout(function(){
      teamService.teamsDetails($routeParams.teamId, function(data){
        $scope.team = data;
        $scope.loading = false;
      });
    }, 2000);
}]);
// Controller that handles the add team page and how the data is passed to the PHP file.
footballControllers.controller('addTeamController', ["$scope", "$http", "$location", "teamService", "assembleFormDataService",
  function ($scope, $http, $location, teamService, assembleFormDataService){
    $scope.addTeam = function(){
     var readyFormData = assembleFormDataService.populateFormData($scope.name, $scope.founded, $scope.city, $scope.stadium, $scope.capacity, $scope.manager, $scope.websiteLink, $scope.imageSubmit, $scope.details);  
      teamService.addTeams(readyFormData, function(){
        $location.path('/teams');         
      });
    }; 
}]);
//Controller that handles the edit team page and how the data is pulled/pushed to the DB
footballControllers.controller('editTeamController', ["$scope", "$routeParams", "$http", "$location", "teamService", "assembleFormDataService",
  function ($scope, $routeParams, $http, $location, teamService, assembleFormDataService){
    teamService.teamsDetails($routeParams.teamId, function(data){
      $scope.teamedit = data;
    });
  $scope.editTeam = function(){
    var readyFormData = assembleFormDataService.populateFormData($scope.teamedit.name, $scope.teamedit.founded, $scope.teamedit.city, $scope.teamedit.stadium, $scope.teamedit.capacity, $scope.teamedit.manager, $scope.teamedit.websiteLink, $scope.teamedit.image, $scope.teamedit.details);  
      teamService.editTeam($routeParams.teamId, readyFormData, function(){
        $location.path('/teams');         
    });
  };
}]);
// Controller that handles the team deletion
footballControllers.controller('deleteTeamController', ["$scope", "$routeParams", "$http", "$location", "teamService",
  function ($scope, $routeParams, $http, $location, teamService){
    teamService.teamsDetails($routeParams.teamId, function(data){
      $scope.teamdelete = data;
    });
    $scope.deleteTeam = function(){
      teamService.deleteTeam($routeParams.teamId, function(data){
        $location.path('/teams');
      });
    };
}]);
// Handles which nav bar element is in an active state
function HeaderController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}