'use strict';

angular.module('mealPlanner')
  .directive('mpNutrientTable', MpNutrientTable);

function MpNutrientTable() {
  return {
    restrict: 'E',
    templateUrl: 'modules/nutrients/views/label/nutrient_table.html',
    controller: function () {},
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      nutrients: '=',
      noMargin: '@'
    }
  };
}
