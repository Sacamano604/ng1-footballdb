'use strict';

angular.module('footballServices', [])

// Factory responsible for assembling the form data before it's passed over the php
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
// One big team service that handles the individual components we'll need for the teams
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
		editTeam: function(id, readyFormData, callback){
			$http.post('teams/teams.php?action=edit&id=' + id, readyFormData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success(callback);	
		},
		deleteTeam: function(id, callback){
			$http.post('teams/teams.php?action=delete&id=' + id).success(callback);
		}
	}
}]);

