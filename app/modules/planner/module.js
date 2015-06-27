(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name mealPlanner.planner
   * @description
   * # mealPlanner.planner
   *
   * Planner module.
   * Uses local storage to persist created plan and ChartJS to display energy pie charts.
   */
  angular.module('mealPlanner.planner', ['LocalStorageModule', 'tc.chartjs']);
})();
