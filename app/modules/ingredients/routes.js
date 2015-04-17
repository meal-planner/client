'use strict';

angular.module('mealPlanner')
  .config(function ($stateProvider) {
    $stateProvider.state('ingredientsList', {
      url: '/ingredients/',
      templateUrl: 'modules/ingredients/views/list.html'
    }).state('saveIngredient', {
      url: '/ingredients/create',
      templateUrl: 'modules/ingredients/views/edit.html'
    }).state('editIngredient', {
      url: '/ingredients/edit/:ingredientId',
      templateUrl: 'modules/ingredients/views/edit.html'
    });
  });
