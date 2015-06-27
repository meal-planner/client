'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:PlannerDayController
 * @description
 * # PlannerDayController
 * Controller for plan day directive
 */
angular.module('mealPlanner')
  .controller('PlannerDayController', PlannerDayController);

/* @ngInject */
function PlannerDayController($mdDialog, planService) {
  var self = this;
  self.mealTypes = planService.mealTypes;
  self.showRecipeSelector = showRecipeSelector;
  self.removeMeal = removeMeal;

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
      templateUrl: 'modules/planner/views/planner/recipe_selector.html',
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
