'use strict';

angular.module('mealPlanner')
  .directive('mpNutritionLabel', MpNutritionLabelDirective);

function MpNutritionLabelDirective() {
  return {
    restrict: 'E',
    templateUrl: 'modules/nutrients/views/label.html',
    controller: 'NutritionLabelController',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      servings: '@',
      nutrients: '='
    }
  };
}
