'use strict';

/**
 * @ngdoc overview
 * @name mealPlanner
 * @description
 * # mealPlanner
 *
 * Main module of the application.
 */
angular
  .module('mealPlanner', ['ngMaterial', 'ui.router', 'ngResource'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('red');
  })
  .run(function ($state) {
    $state.go('planner');
  });
