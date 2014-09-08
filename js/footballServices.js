'use strict';

angular.module('footballServices', [])

.factory('teamListService', ['$http', function($http){
	return {
		get: function(callback){
			$http.get('teams/teams.php?action=list').success(callback);
	}
}
}])
.factory('teamDetailsService', ['$http', '$routeParams', function($http, $routeParams){
	return {
		get: function(callback){
			var teamId = $routeParams.teamId;
			$http.get('teams/teams.php?action=detail&id=' + teamId).success(callback);
		}
	}
}]);







