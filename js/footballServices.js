'use strict';

angular.module('footballServices', [])

.factory('assembleFormDataService', function(){
	return {
		populateFormData: function(name, founded, city, stadium, capacity, manager, websiteLink, imageSubmit, details){
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
			return formData; 
		}
	};
})
.factory('teamService', ['$http', function($http){
	return {
		teamsList: function(callback){
			$http.get('teams/teams.php?action=list').success(callback);
		},
		teamsDetails: function(id, callback){
			$http.get('teams/teams.php?action=detail&id=' + id).success(callback);
		},
		addTeams: function(readyFormData, callback){
			$http.post('teams/teams.php?action=add', readyFormData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success(callback);
		},
		deleteTeam: function(id, callback){
			$http.post('teams/teams.php?action=delete&id=' + id).success(callback);
		}
	}
}]);

