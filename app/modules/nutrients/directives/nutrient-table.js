(function () {
  'use strict';

  angular
    .module('mealPlanner.nutrients')
    .directive('mpNutrientTable', mpNutrientTable);

  function mpNutrientTable() {
    return {
      templateUrl: 'modules/nutrients/views/nutrient-table.html',
      scope: {
        nutrients: '=',
        noMargin: '@'
      }
    };
  }
})();
