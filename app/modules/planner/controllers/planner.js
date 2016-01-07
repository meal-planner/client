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
  function PlannerController($scope, PlanService) {
    var self = this;
    self.plan = PlanService.getPlan();

    $scope.$watch('ctrl.plan.days', saveLocalPlan, true);

    return activate();

    function activate() {
      var date = new Date();
      self.today = date.getDay();
      date.setDate(date.getDate() + 1);
      self.tomorrow = date.getDay();
    }

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
  }
})();
