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
  function mpPlanDay($mdDialog, planService) {
    return {
      templateUrl: 'modules/planner/views/directive.plan-day.html',
      link: planDayLink,
      scope: {
        day: '='
      }
    };

    function planDayLink(scope) {
      scope.mealTypes = planService.mealTypes;
      scope.showRecipeSelector = showRecipeSelector;
      scope.removeMeal = removeMeal;
      scope.isFullNutrientInfoShown = false;

      /**
       * Show recipe selector popup.
       *
       * @param event
       * @param day
       */
      function showRecipeSelector(event) {
        $mdDialog.show({
          controller: 'RecipeSelectorController',
          controllerAs: 'ctrl',
          bindToController: true,
          templateUrl: 'modules/planner/views/recipe-selector.html',
          targetEvent: event
        }).then(receiveRecipeFromSelector);
      }

      function receiveRecipeFromSelector(meal) {
        /**
         * Receive recipe from selector and add it to the plan as a meal.
         */
        scope.day.addMeal(meal.recipe, meal.type);
      }

      /**
       * Remove given meal from the plan.
       *
       * @param day
       * @param meal
       */
      function removeMeal(meal) {
        scope.day.removeMeal(meal);
      }
    }
  }
})();
