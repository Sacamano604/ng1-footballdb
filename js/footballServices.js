'use strict';

angular.module('footballServices', [])


.factory('assembleFormDataService', function(formData){
	var populateFormData = {
		var formData = new FormData();
		formData.append("name", name);
		formData.append("founded", founded);
		formData.append("city", city);
		formData.append("stadium", stadium);
		formData.append("capacity", capacity);
		formData.append("manager", manager);
		formData.append("websiteLink", websiteLink);
		formData.append("image", imageSubmit);
		formData.append("details", details);
	}
	return populateFormData;
})
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
    	post: function(readyFormData){
    		$http.post('teams/teams.php?action=add', readyFormData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success();
    	}
    }
}]);
