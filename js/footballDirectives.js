'use strict';

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