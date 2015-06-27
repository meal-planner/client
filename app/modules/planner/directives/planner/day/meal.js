(function () {
  'use strict';

  angular.module('mealPlanner.planner')
    .directive('mpPlanDayMeal', PlanDayMealDirective);

  /* @ngInject */
  function PlanDayMealDirective(planService) {
    return {
      templateUrl: 'modules/planner/views/planner/day/meal.html',
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
