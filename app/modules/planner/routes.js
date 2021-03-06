(function () {
  'use strict';

  angular
    .module('mealPlanner.planner')
    .config(function ($stateProvider) {
      $stateProvider.state('planner', {
        url: '/',
        templateUrl: 'modules/planner/views/planner.html',
        controller: 'PlannerController',
        controllerAs: 'ctrl',
        pageTitle: 'Meal Plan'
      });
    });
})();
