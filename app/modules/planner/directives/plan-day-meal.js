(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.directive:mpPlanDayMeal
   * @description
   * # mpPlanDayMeal
   * Plan day meal directive, used to display single meal in the day.
   */
  angular
    .module('mealPlanner.planner')
    .directive('mpPlanDayMeal', mpPlanDayMeal);

  /* @ngInject */
  function mpPlanDayMeal() {
    return {
      templateUrl: 'modules/planner/views/directive.plan-day-meal.html',
      scope: {
        meal: '=',
        day: '='
      }
    };
  }
})();
