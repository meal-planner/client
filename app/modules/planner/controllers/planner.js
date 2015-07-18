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
  function PlannerController($scope, planService) {
    var self = this;
    self.plan = planService.getPlan();

    $scope.$watch('ctrl.plan.days', saveLocalPlan, true);

    /**
     * Persist plan in local storage.
     *
     * @param oldValue
     * @param newValue
     */
    function saveLocalPlan(oldValue, newValue) {
      if (oldValue !== newValue) {
        planService.saveLocalPlan(self.plan);
      }
    }
  }
})();
