'use strict';

angular.module('footballServices', [])

.factory('teamListService', ['$http', function($http){
	return {
		get: function(callback){
			$http.get('teams/teams.php?action=list').success(callback);
	}
}
}])
.factory('teamDetailsService', ['$http', function($http){
	return {
		get: function(id, callback){
			$http.get('teams/teams.php?action=detail&id=' + id).success(callback);
		}
	}
}])
.factory('addTeamService', ['$http', function($http){
    return {
    	post: function(formData){
    		$http.post('teams/teams.php?action=add', formData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success();
    	}
    }
}]);

