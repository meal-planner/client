(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.nutrients.directive:mpNutritionLabel
   * @description
   * # mpNutritionLabel
   * Nutrition label directive, used to display nutrition values in a table-like label.
   */
  angular
    .module('mealPlanner.nutrients')
    .directive('mpNutritionLabel', mpNutritionLabel);

  /* @ngInject */
  function mpNutritionLabel() {
    return {
      templateUrl: 'modules/nutrients/views/label.html',
      scope: {
        servings: '@?',
        nutrients: '='
      }
    };
  }
})();
