'use strict';

angular.module('mealPlanner')
  .config(function ($stateProvider) {
    $stateProvider.state('ingredientsList', {
      url: '/ingredients',
      templateUrl: 'modules/ingredients/views/list.html',
      controller: 'IngredientsListController'
    }).state('createIngredient', {
      url: '/ingredients/create',
      templateUrl: 'modules/ingredients/views/create.html',
      controller: 'IngredientsCreateController'
    });
  });
