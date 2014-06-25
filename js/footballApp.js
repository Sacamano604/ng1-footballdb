"use strict";

var footballApp = angular.module('footballApp', []);
    footballApp.controller('footballController', [ "$scope", "$http", function ($scope, $http){
      $http({method: 'GET', url: 'teams.php'}).success(function(data){
        $scope.teams = data;
      });
    $scope.sortField = 'name';
    $scope.reverse = true;
}]);