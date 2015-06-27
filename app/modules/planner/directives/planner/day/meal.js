'use strict';

angular.module('mealPlanner')
  .directive('mpPlanDayMeal', MpPlanDayMealDirective);

function MpPlanDayMealDirective() {
  return {
    restrict: 'E',
    templateUrl: 'modules/planner/views/planner/day/meal.html',
    controller: 'PlannerDayMealController',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      meal: '='
    }
  };
}
