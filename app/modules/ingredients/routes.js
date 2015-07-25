(function () {
  'use strict';

  angular
    .module('mealPlanner.ingredients')
    .config(ingredientRoutesConfig);

  /* @ngInject */
  function ingredientRoutesConfig($stateProvider) {
    $stateProvider.state('ingredientsGroups', {
      url: '/ingredients/',
      templateUrl: 'modules/ingredients/views/groups.html',
      controller: 'IngredientsGroupsController',
      controllerAs: 'ctrl',
      resolve: {
        groups: resolveFoodGroups
      }
    }).state('ingredientsList', {
      url: '/ingredients/:group',
      templateUrl: 'modules/ingredients/views/list.html',
      controller: 'IngredientsListController',
      controllerAs: 'ctrl'
    }).state('createIngredient', {
      url: '/ingredients/create/',
      templateUrl: 'modules/ingredients/views/edit.html',
      controller: 'IngredientsEditController as ctrl',
      controllerAs: 'ctrl',
      resolve: {
        nutrients: resolveNutrients,
        foodGroups: resolveFoodGroups,
        ingredient: resolveEmptyIngredient
      }
    }).state('editIngredient', {
      url: '/ingredients/edit/:ingredientId',
      templateUrl: 'modules/ingredients/views/edit.html',
      controller: 'IngredientsEditController',
      controllerAs: 'ctrl',
      resolve: {
        nutrients: resolveNutrients,
        foodGroups: resolveFoodGroups,
        ingredient: resolveIngredient
      }
    }).state('viewIngredient', {
      url: '/ingredients/view/:ingredientId',
      templateUrl: 'modules/ingredients/views/view.html',
      controller: 'IngredientViewController',
      controllerAs: 'ctrl',
      resolve: {
        ingredient: resolveIngredient
      }
    });

    function resolveEmptyIngredient(IngredientFactory) {
      return IngredientFactory.build();
    }

    function resolveIngredient($stateParams, IngredientService) {
      return IngredientService.getIngredient($stateParams.ingredientId);
    }

    function resolveNutrients(NutrientFactory) {
      return NutrientFactory.getAvailableNutrients();
    };

    function resolveFoodGroups(IngredientGroupService) {
      return IngredientGroupService.getGroups();
    }
  }
})();
