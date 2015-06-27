'use strict';

angular.module('mealPlanner')
  .directive('mpPlanDay', MpPlanDayDirective);

function MpPlanDayDirective() {
  return {
    restrict: 'E',
    templateUrl: 'modules/planner/views/planner/day.html',
    controller: 'PlannerDayController',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      day: '='
    }
  };
}
