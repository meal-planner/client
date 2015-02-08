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
      .primaryPalette('indigo')
      .accentPalette('deep-orange');
  })
  .run(function ($state) {
    $state.go('planner');
  });
