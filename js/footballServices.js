'use strict';

angular.module('footballServices', [])

.factory('teamListService', ['$http', function($http){
	return {
		get: function(callback){
			$http.get('teams/teams.php?action=list').success(callback);
	}
}
}]);
