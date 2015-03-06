'use strict';

angular.module('mealPlanner')
  .config(function ($stateProvider) {
    $stateProvider.state('recipesList', {
      url: '/recipes/',
      templateUrl: 'modules/recipes/views/list.html'
    }).state('createRecipe', {
      url: '/recipes/create',
      templateUrl: 'modules/recipes/views/create.html'
    });
  });
