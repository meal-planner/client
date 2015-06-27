'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.planner.controller:PlannerController
 * @description
 * # PlannerController
 * Planner controller
 */
angular.module('mealPlanner.planner')
  .controller('PlannerController', PlannerController);

/* @ngInject */
function PlannerController($scope, planService) {
  var self = this;

  self.plan = planService.days;
  self.schedule = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  self.planNextDay = planNextDay;

  /**
   * Persist plan if it's updated.
   */
  $scope.$watch(function () {
    return planService.days
  }, function () {
    planService.persist()
  }, true);

  /**
   * Set initial state.
   */
  return initialize();

  function initialize() {
    if (self.plan.length > 0) {
      self.schedule.splice(0, self.plan.length);
    } else {
      planNextDay();
    }
  }

  /**
   * Add new day to the plan.
   */
  function planNextDay() {
    planService.addDayToPlan(self.schedule.shift());
  }
}
