(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.nutrients.directive:mpNutrientTable
   * @description
   * # mpNutrientTable
   * Nutrients table directive, used as part of nutrition label directive.
   */
  angular
    .module('mealPlanner.nutrients')
    .directive('mpNutrientTable', mpNutrientTable);

  function mpNutrientTable() {
    return {
      templateUrl: 'modules/nutrients/views/nutrient-table.html',
      scope: {
        nutrients: '=',
        filterGroup: '@',
        noMargin: '@'
      }
    };
  }
})();
