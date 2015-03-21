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
      .primaryPalette('blue-grey', {
        'default': '800',
        'hue-1': '700',
        'hue-2': '600',
        'hue-3': '500'
      })
      .accentPalette('pink');
  })
  .run(function ($state) {
    $state.go('planner');
  });
