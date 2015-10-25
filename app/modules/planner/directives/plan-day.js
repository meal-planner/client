(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.directive:mpPlanDay
   * @description
   * # mpPlanDay
   * Plan day directive, used to display single day of the plan.
   */
  angular
    .module('mealPlanner.planner')
    .directive('mpPlanDay', mpPlanDay);

  /* @ngInject */
  function mpPlanDay($state, PlanService) {
    return {
      templateUrl: 'modules/planner/views/directive.plan-day.html',
      link: planDayLink,
      scope: {
        day: '='
      }
    };

    function planDayLink(scope) {
      scope.mealTypes = PlanService.mealTypes;
      scope.removeMeal = removeMeal;
      scope.viewMeal = viewMeal;

      /**
       * Open meal(recipe) view page.
       *
       * @param meal
       */
      function viewMeal(meal) {
        $state.go('viewRecipe', {recipeId: meal.recipe_id});
      }

      /**
       * Remove given meal from the plan.
       *
       * @param meal
       */
      function removeMeal(meal) {
        scope.day.removeMeal(meal);
      }
    }
  }
})();
