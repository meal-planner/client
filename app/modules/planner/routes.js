'use strict';

angular.module('mealPlanner')
  .config(function ($stateProvider) {
    $stateProvider.state('planner', {
      url: '/',
      templateUrl: 'modules/planner/views/main.html',
      controller: 'MainController'
    });
  });
