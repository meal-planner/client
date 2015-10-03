(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.images.directive:mpFileSelect
   * @description
   * # mpFileSelect
   * File select directive.
   */
  angular
    .module('mealPlanner.images')
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

      function onFileLoad(event) {
        scope.$apply(function ($scope) {
          $scope.mpFileSelect.src = event.target.result;
        });
      }
    }
  }
})();
