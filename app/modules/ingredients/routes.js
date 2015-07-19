(function () {
  'use strict';

  angular
    .module('mealPlanner.ingredients')
    .config(ingredientRoutesConfig);

  /* @ngInject */
  function ingredientRoutesConfig($stateProvider) {
    $stateProvider.state('ingredientsGroups', {
      url: '/ingredients/',
      templateUrl: 'modules/ingredients/views/groups.html'
    })
      .state('ingredientsList', {
      url: '/ingredients/:group',
      templateUrl: 'modules/ingredients/views/list.html'
    }).state('createIngredient', {
      url: '/ingredients/create',
      templateUrl: 'modules/ingredients/views/edit.html'
    }).state('editIngredient', {
      url: '/ingredients/edit/:ingredientId',
      templateUrl: 'modules/ingredients/views/edit.html'
    }).state('viewIngredient', {
      url: '/ingredients/view/:ingredientId',
      templateUrl: 'modules/ingredients/views/view.html'
    });
  }
})();
