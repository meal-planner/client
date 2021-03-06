(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name mealPlanner
   * @description
   * # mealPlanner
   *
   * Main module of the application.
   */
  angular.module(
    'mealPlanner',
    [
      'ngMaterial',
      'ui.router',
      'mealPlanner.environment',
      'mealPlanner.users',
      'mealPlanner.navigation',
      'mealPlanner.nutrients',
      'mealPlanner.ingredients',
      'mealPlanner.recipes',
      'mealPlanner.planner'
    ])
    .run(runMealPlanner);

  /* @ngInject */
  function runMealPlanner($state) {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('sw.js');
    }

    $state.go('planner');
  }
})();
