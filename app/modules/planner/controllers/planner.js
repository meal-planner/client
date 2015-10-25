(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.controller:PlannerController
   * @description
   * # PlannerController
   * Planner controller
   */
  angular
    .module('mealPlanner.planner')
    .controller('PlannerController', PlannerController);

  /* @ngInject */
  function PlannerController($scope, $mdDialog, PlanService) {
    var self = this;
    self.plan = PlanService.getPlan();
    self.activeDay = self.plan.days[0];
    self.showMealSelector = showMealSelector;

    $scope.$watch('ctrl.plan.days', saveLocalPlan, true);

    /**
     * Persist plan in local storage.
     *
     * @param oldValue
     * @param newValue
     */
    function saveLocalPlan(oldValue, newValue) {
      if (oldValue !== newValue) {
        PlanService.saveLocalPlan(self.plan);
      }
    }

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
      console.log(self.activeDay);
      self.activeDay.addMeal(meal.recipe, meal.type);
    }
  }
})();
