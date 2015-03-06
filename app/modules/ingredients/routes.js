'use strict';

angular.module('mealPlanner')
  .config(function ($stateProvider) {
    $stateProvider.state('ingredientsList', {
      url: '/ingredients/',
      templateUrl: 'modules/ingredients/views/list.html'
    }).state('createIngredient', {
      url: '/ingredients/create',
      templateUrl: 'modules/ingredients/views/create.html'
    });
  });
