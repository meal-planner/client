(function () {
  'use strict';

  angular.module('mealPlanner.nutrients')
    .directive('mpNutrientTable', NutrientTableDirective);

  function NutrientTableDirective() {
    return {
      templateUrl: 'modules/nutrients/views/label/nutrient_table.html',
      scope: {
        nutrients: '=',
        noMargin: '@'
      }
    };
  }
})();
