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
  function mpPlanDay($state, $mdDialog, PlanService) {
    return {
      templateUrl: 'modules/planner/views/directive.plan-day.html',
      link: planDayLink,
      scope: {
        day: '=',
        showSummary: '='
      }
    };

    function planDayLink(scope) {
      var mealType;
      scope.mealTypes = PlanService.mealTypes;
      scope.showMealSelector = showMealSelector;
      scope.removeMeal = removeMeal;
      scope.viewMeal = viewMeal;

      /**
       * Show recipe selector popup.
       *
       * @param event
       * @param mealType
       */
      function showMealSelector(event, type) {
        mealType = type;
        $mdDialog.show({
          controller: 'MealSelectorController',
          controllerAs: 'ctrl',
          bindToController: true,
          templateUrl: 'modules/planner/views/meal-selector.html',
          targetEvent: event
        }).then(receiveMealFromSelector);
      }

      /**
       * Receive recipe from selector and add it to the plan as a meal.
       *
       * @param {Recipe} recipe
       */
      function receiveMealFromSelector(recipe) {
        scope.day.addMeal(recipe, mealType);
      }

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
