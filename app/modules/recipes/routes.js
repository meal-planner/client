(function () {
  'use strict';

  angular
    .module('mealPlanner.recipes')
    .config(recipeRouteConfig);

  function recipeRouteConfig($stateProvider) {
    $stateProvider.state('recipesGroups', {
      url: '/recipes/',
      templateUrl: 'modules/recipes/views/groups.html',
      controller: 'RecipesGroupsController',
      controllerAs: 'ctrl',
      resolve: {
        dishTypes: resolveDishTypes,
        cuisines: resolveCuisines,
        keyIngredients: resolveKeyIngredients,
        diets: resolveDiets
      }
    }).state('recipesList', {
      url: '/recipes/list/:filterName/:filterValue',
      templateUrl: 'modules/recipes/views/list.html',
      controller: 'RecipesListController',
      controllerAs: 'ctrl'
    }).state('createRecipe', {
      url: '/recipes/create',
      templateUrl: 'modules/recipes/views/edit.html',
      controller: 'RecipeEditController',
      controllerAs: 'ctrl',
      resolve: {
        dishTypes: resolveDishTypes,
        cuisines: resolveCuisines,
        keyIngredients: resolveKeyIngredients,
        diets: resolveDiets,
        recipe: resolveEmptyRecipe
      }
    }).state('editRecipe', {
      url: '/recipes/edit/:recipeId',
      templateUrl: 'modules/recipes/views/edit.html',
      controller: 'RecipeEditController',
      controllerAs: 'ctrl',
      resolve: {
        dishTypes: resolveDishTypes,
        cuisines: resolveCuisines,
        keyIngredients: resolveKeyIngredients,
        diets: resolveDiets,
        recipe: resolveRecipe
      }
    }).state('viewRecipe', {
      url: '/recipes/view/:recipeId',
      templateUrl: 'modules/recipes/views/view.html',
      controller: 'RecipeViewController',
      controllerAs: 'ctrl',
      resolve: {
        recipe: resolveRecipe
      }
    });

    function resolveEmptyRecipe(RecipeFactory) {
      return RecipeFactory.build();
    }

    function resolveRecipe($stateParams, RecipeService) {
      return RecipeService.getRecipe($stateParams.recipeId);
    }

    function resolveDishTypes(RecipeGroupService) {
      return RecipeGroupService.getDishTypes();
    }

    function resolveCuisines(RecipeGroupService) {
      return RecipeGroupService.getCuisines();
    }

    function resolveKeyIngredients(RecipeGroupService) {
      return RecipeGroupService.getKeyIngredients();
    }

    function resolveDiets(RecipeGroupService) {
      return RecipeGroupService.getDiets();
    }
  }
})();
