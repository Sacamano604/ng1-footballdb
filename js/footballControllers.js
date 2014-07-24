'use strict';

// Controller Module
var footballControllers = angular.module('footballControllers', []);
// Controller for displaying the list of teams, with 3 second timeout delay    
footballControllers.controller('teamListController', [ "$scope", "$http", "$timeout",
	function ($scope, $http, $timeout) {
    $timeout(function(){
      $http({method: 'GET', url: 'teams/teams.php?action=list'}).success(function(data){
        $scope.teams = data;
        $scope.loading = false;
      }, 3000);
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
      console.log($scope.teamedit.image);
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
    formData.append("image", $scope.imageSubmit);
    formData.append("details", $scope.teamedit.details);
    //post form data to the action case of the php switch
    $http.post("teams/teams.php?action=edit&id=" + $scope.teamedit.id, formData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success(function(data){
       //once team is added, redirect user back to the teams list
     $location.path('/teams');
       return false;
    });  
  };
}]);










// Directive that adds file read to the image upload in the add team controller 
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
// Directive that handles the back button which can be implemented where needed.
footballControllers.directive('backButton', function(){
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function () {
          history.back();
          scope.$apply();
        });
      }
    }
});
//Directive that makes sure any 'value' attribute assigned to an input field is bound properly.
footballControllers.directive('input', function ($parse) {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function (scope, element, attrs) {
      if (attrs.ngModel && attrs.value) {
        $parse(attrs.ngModel).assign(scope, attrs.value);
      }
    }
  };
});
//Setting the initial loading to be true for the 3 second delay on the details and list page
footballControllers.run(function($rootScope){
  $rootScope.loading = true;  
});