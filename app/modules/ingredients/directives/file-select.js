(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.directive:mpFileSelect
   * @description
   * # mpFileSelect
   * File select directive.
   */
  angular
    .module('mealPlanner.ingredients')
    .directive('mpFileSelect', mpFileSelect);

  /* @ngInject */
  function mpFileSelect() {
    return {
      link: fileSelectLink,
      scope: {
        mpFileSelect: '='
      }
    };

    function fileSelectLink(scope, element) {
      element.bind('change', onFileChange);

      function onFileChange(event) {
        var file = (event.srcElement || event.target).files[0];
        var reader = new FileReader();
        reader.onload = onFileLoad;
        reader.readAsDataURL(file);
      }

      function onFileLoad(evt) {
        scope.$apply(function ($scope) {
          $scope.mpFileSelect.src = evt.target.result;
        });
      }
    }
  }
})();
