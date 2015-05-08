'use strict';

angular.module('mealPlanner')
  .config(function ($stateProvider) {
    $stateProvider.state('recipesList', {
      url: '/recipes/',
      templateUrl: 'modules/recipes/views/list.html'
    }).state('createRecipe', {
      url: '/recipes/create',
      templateUrl: 'modules/recipes/views/edit.html'
    }).state('editRecipe', {
      url: '/recipes/edit/:recipeId',
      templateUrl: 'modules/recipes/views/edit.html'
    }).state('viewRecipe', {
      url: '/recipes/view/:recipeId',
      templateUrl: 'modules/recipes/views/view.html'
    });
  });
