'use strict';

angular.module('mealPlanner')
  .directive('mpPlanDayEnergyChart', MpPlanDayEnergyChartDirective);

function MpPlanDayEnergyChartDirective() {
  return {
    restrict: 'E',
    templateUrl: 'modules/planner/views/planner/day/energy_chart.html',
    controller: 'PlannerDayEnergyChartController',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      day: '='
    }
  };
}
