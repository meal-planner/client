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
      pageTitle: 'Recipes',
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
      controllerAs: 'ctrl',
      resolve: {
        recipes: resolveRecipesList
      }
    }).state('createRecipe', {
      url: '/recipes/create',
      templateUrl: 'modules/recipes/views/edit.html',
      controller: 'RecipeEditController',
      controllerAs: 'ctrl',
      pageTitle: 'Create New Recipe',
      resolve: {
        authenticated: function (UserService) {
          return UserService.isAuthenticated();
        },
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
        authenticated: function (UserService) {
          return UserService.isAuthenticated();
        },
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

    /**
     * Load list of recipes with given filters.
     *
     * @param $stateParams
     * @param RecipeService
     * @returns {{Recipe}[]|*}
     */
    function resolveRecipesList($stateParams, RecipeService) {
      return RecipeService.searchRecipes($stateParams.filterName, $stateParams.filterValue);
    }

    /**
     * Build empty recipe model for create new recipe form.
     *
     * @param RecipeFactory
     * @returns {Recipe}
     */
    function resolveEmptyRecipe(RecipeFactory) {
      return RecipeFactory.build();
    }

    /**
     * Load recipe model and then load all ingredients models for edit page.
     *
     * @param $stateParams
     * @param RecipeService
     * @returns {*}
     */
    function resolveRecipe($stateParams, RecipeService) {
      return RecipeService.getRecipe($stateParams.recipeId)
        .then(function (recipe) {
          return recipe.loadIngredients();
        });
    }

    /**
     * Fetch dish types.
     *
     * @param RecipeGroupService
     * @returns {*}
     */
    function resolveDishTypes(RecipeGroupService) {
      return RecipeGroupService.getDishTypes();
    }

    /**
     * Fetch cuisines.
     *
     * @param RecipeGroupService
     * @returns {*}
     */
    function resolveCuisines(RecipeGroupService) {
      return RecipeGroupService.getCuisines();
    }

    /**
     * Fetch key ingredients.
     *
     * @param RecipeGroupService
     * @returns {*}
     */
    function resolveKeyIngredients(RecipeGroupService) {
      return RecipeGroupService.getKeyIngredients();
    }

    /**
     * Fetch diets.
     *
     * @param RecipeGroupService
     * @returns {*}
     */
    function resolveDiets(RecipeGroupService) {
      return RecipeGroupService.getDiets();
    }
  }
})();
