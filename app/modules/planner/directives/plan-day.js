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
  function mpPlanDay($mdDialog, PlanService) {
    return {
      templateUrl: 'modules/planner/views/directive.plan-day.html',
      link: planDayLink,
      scope: {
        day: '='
      }
    };

    function planDayLink(scope) {
      scope.mealTypes = PlanService.mealTypes;
      scope.showMealSelector = showMealSelector;
      scope.removeMeal = removeMeal;
      scope.isFullNutrientInfoShown = false;

      /**
       * Show recipe selector popup.
       *
       * @param event
       * @param day
       */
      function showMealSelector(event) {
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
       * @param meal
       */
      function receiveMealFromSelector(meal) {
        scope.day.addMeal(meal.recipe, meal.type);
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
