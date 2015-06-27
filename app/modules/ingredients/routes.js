(function () {
  'use strict';

  angular.module('mealPlanner.ingredients')
    .config(function ($stateProvider) {
      $stateProvider.state('ingredientsList', {
        url: '/ingredients/',
        templateUrl: 'modules/ingredients/views/list.html'
      }).state('createIngredient', {
        url: '/ingredients/create',
        templateUrl: 'modules/ingredients/views/edit.html'
      }).state('editIngredient', {
        url: '/ingredients/edit/:ingredientId',
        templateUrl: 'modules/ingredients/views/edit.html'
      });
    });
})();
