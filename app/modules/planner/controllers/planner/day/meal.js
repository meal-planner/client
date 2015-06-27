'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:PlannerDayMealController
 * @description
 * # PlannerDayMealController
 * Controller for plan day meal directive
 */
angular.module('mealPlanner')
  .controller('PlannerDayMealController', PlannerDayMealController);

/* @ngInject */
function PlannerDayMealController(planService) {
  var self = this;
  self.removeMeal = removeMeal;

  /**
   * Remove given meal from the plan.
   *
   * @param day
   * @param meal
   */
  function removeMeal(meal) {
    planService.removeMealFromPlan(meal);
  }
}
