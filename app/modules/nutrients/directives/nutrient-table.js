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

  /* @ngInject */
  function mpNutrientTable(NutrientService) {
    return {
      templateUrl: 'modules/nutrients/views/nutrient-table.html',
      link: nutrientTableLink,
      scope: {
        nutrients: '=',
        filterGroup: '@',
        noMargin: '@'
      }
    };

    /**
     * Fetch nutrients daily values.
     *
     * @param scope
     */
    function nutrientTableLink(scope) {
      NutrientService.getDailyValues().then(function (dailyValues) {
        scope.dailyValues = dailyValues;
      });
    }
  }
})();
