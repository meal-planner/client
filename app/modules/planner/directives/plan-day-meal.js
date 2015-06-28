(function () {
  'use strict';

  angular
    .module('mealPlanner.planner')
    .directive('mpPlanDayMeal', mpPlanDayMeal);

  /* @ngInject */
  function mpPlanDayMeal(planService) {
    return {
      templateUrl: 'modules/planner/views/directive.plan-day-meal.html',
      link: planDayMealLink,
      scope: {
        meal: '='
      }
    };

    function planDayMealLink(scope) {
      scope.removeMeal = removeMeal;

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
  }
})();
