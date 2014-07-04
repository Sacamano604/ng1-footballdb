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

   $http.post('teams/teams.php?action=add', formData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } });
      return false;
  };
}]);
 
  footballControllers.directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });

      }
    }
  }]);





