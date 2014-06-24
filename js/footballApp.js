"use strict";

var footballApp = angular.module('footballApp', []);
    footballApp.controller('footballController', [ "$scope", "$http", function ($scope, $http){
      $http.get({method: "GET", url: "SQLtoJSON.php"+$scope.s, isArray: true}).success(function(data){
        $scope.teams = data;
      });
    $scope.sortField = 'name';
    $scope.reverse = true;
}]);