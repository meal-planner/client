(function () {
  'use strict';

  angular
    .module('mealPlanner')
    .config(MealPlannerConfig);

  /* @ngInject */
  function MealPlannerConfig($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('green', {
        'default': '800',
        'hue-1': '700',
        'hue-2': '600',
        'hue-3': '500'
      })
      .accentPalette('red', {
        'default': '600'
      });
    $mdThemingProvider.theme('dark')
      .primaryPalette('lime')
      .accentPalette('pink');
    $mdThemingProvider.theme('error-toast');
  }
})();
