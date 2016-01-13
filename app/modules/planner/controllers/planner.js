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
    self.activeWeekDay = null;
    self.plan = PlanService.getPlan();
    self.toggleDayPlanInWeek = toggleDayPlanInWeek;

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

    /**
     * Toggle display of a day on week view.
     *
     * @param day
     */
    function toggleDayPlanInWeek(day) {
      if (self.activeWeekDay) {
        self.activeWeekDay.isVisibleInWeek = false;
      }

      if (self.activeWeekDay != day) {
        day.isVisibleInWeek = true;
        self.activeWeekDay = day;
      } else {
        self.activeWeekDay = null;
      }
    }
  }
})();
