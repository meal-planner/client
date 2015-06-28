(function () {
  'use strict';

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

      /**
       * Show recipe selector popup.
       *
       * @param event
       * @param day
       */
      function showRecipeSelector(event, day) {
        $mdDialog.show({
          controller: 'RecipeSelectorController',
          controllerAs: 'ctrl',
          bindToController: true,
          templateUrl: 'modules/planner/views/recipe-selector.html',
          targetEvent: event
        }).then(function (recipe) {
          /**
           * Receive recipe from selector and add it to the plan.
           */
          planService.addMealToPlanDay(day, recipe);
        });
      }

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
