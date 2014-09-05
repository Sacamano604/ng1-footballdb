'use strict';

// Controller Module
var footballControllers = angular.module('footballControllers', []);
// Controller for displaying the list of teams, with 3 second timeout delay    
footballControllers.controller('teamListController', [ "$scope", "teamListService",
  function ($scope, teamListService) {
    teamListService.get(function(data){
      $scope.teams = data;
      $scope.loading = false;
    });
  $scope.sortField = 'name';
  $scope.reverse = false;
}]);
// Controller for displaying the details of the team when the name is clicked, with 3 second timeout delay
footballControllers.controller('teamDetailController', ["$scope", "$routeParams", "$http", "$timeout",
	function ($scope, $routeParams, $http, $timeout){
    $timeout(function(){
      $scope.teamId = $routeParams.teamId;
      $http({method: 'GET', url: 'teams/teams.php?action=detail&id=' + $scope.teamId}).success(function(data){
        $scope.team = data;
        $scope.loading = false;
      }, 3000);
    });
}]);
// Controller that handles the add team page and how the data is passed to the PHP file.
footballControllers.controller('addTeamController', ["$scope", "$http", "$location", 
function ($scope, $http, $location){
  $scope.addTeam = function(){
    //Append all data to a new 'formData();'
    var formData = new FormData();
    formData.append("name", $scope.name);
    formData.append("founded", $scope.founded);
    formData.append("city", $scope.city);
    formData.append("stadium", $scope.stadium);
    formData.append("capacity", $scope.capacity);
    formData.append("manager", $scope.manager);
    formData.append("websiteLink", $scope.websiteLink);
    formData.append("image", $scope.imageSubmit);
    formData.append("details", $scope.details);
    //post form data to the action case of the php switch
    $http.post("teams/teams.php?action=add", formData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success(function(data){
       //once team is added, redirect user back to the teams list
       $location.path('/teams');
       return false;
    });  
  };
}]);
//Controller that handles the edit team page and how the data is pulled/pushed to the DB
footballControllers.controller('editTeamController', ["$scope", "$routeParams", "$http", "$location",
  function ($scope, $routeParams, $http, $location){
    $scope.teamId = $routeParams.teamId;
    $http({method: 'GET', url: 'teams/teams.php?action=detail&id=' + $scope.teamId}).success(function(data){
      $scope.teamedit = data;
    });
    $scope.editTeam = function(){
    //Append all data to a new 'formData();'
    var formData = new FormData();
    formData.append("name", $scope.teamedit.name);
    formData.append("founded", $scope.teamedit.founded);
    formData.append("city", $scope.teamedit.city);
    formData.append("stadium", $scope.teamedit.stadium);
    formData.append("capacity", $scope.teamedit.capacity);
    formData.append("manager", $scope.teamedit.manager);
    formData.append("websiteLink", $scope.teamedit.websiteLink);
    if ($scope.imageSubmit){
      formData.append("image", $scope.imageSubmit);
    } else {
       formData.append("image", $scope.teamedit.image);
    } 
    formData.append("details", $scope.teamedit.details);
    //post form data to the action case of the php switch
    $http.post("teams/teams.php?action=edit&id=" + $scope.teamedit.id, formData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success(function(data){
       //once team is added, redirect user back to the teams list
     $location.path('/teams/' + $scope.teamedit.id);
       return false;
    });  
  };
}]);
// Controller that handles the edit team page
footballControllers.controller('deleteTeamController', ["$scope", "$routeParams", "$http", "$location",
  function ($scope, $routeParams, $http, $location){
    $scope.teamId = $routeParams.teamId;
    $http({method: 'GET', url: 'teams/teams.php?action=detail&id=' + $scope.teamId}).success(function(data){
      $scope.teamdelete = data;
    });
    $scope.deleteTeam = function(){
      $http.post("teams/teams.php?action=delete&id=" + $scope.teamId).success(function(data){
        $location.path('/teams');
      });
    };
  }]);

