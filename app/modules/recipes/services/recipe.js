(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.service:recipeService
   * @description
   * # recipeService
   * Recipe service, performs communication with recipe backend API.
   */
  angular
    .module('mealPlanner.recipes')
    .service('recipeService', RecipeService);

  /* @ngInject */
  function RecipeService($resource, RecipeFactory, ENV) {
    var recipe = $resource(ENV.apiEndpoint + 'recipes/:id', null, {'update': {method: 'PUT'}});

    return {
      getRecipe: getRecipe,
      getRecipes: getRecipes,
      searchRecipes: searchRecipes,
      saveRecipe: saveRecipe,
      deleteRecipe: deleteRecipe
    };

    /**
     * Load single recipe by ElasticSearch document id.
     * Build and return Recipe object when complete.
     *
     * @param recipeId
     * @returns {Recipe}
     */
    function getRecipe(recipeId) {
      return recipe.get({id: recipeId}).$promise.then(getRecipeComplete);

      function getRecipeComplete(apiResponse) {
        return RecipeFactory.build(apiResponse);
      }
    }

    /**
     * Load list of recipes from REST backend.
     *
     * @returns [{Recipe}]
     */
    function getRecipes() {
      return recipe.query().$promise.then(getRecipesListComplete);
    }

    /**
     * Search recipes by given query text.
     *
     * @param searchText
     * @param limit
     * @returns [{Recipe}]
     */
    function searchRecipes(searchText, limit) {
      return recipe.query({query: searchText, limit: limit}).$promise.then(getRecipesListComplete);
    }

    /**
     * Walk through the list of recipes and build Recipe objects.
     *
     * @param response
     * @returns [{Recipe}]
     */
    function getRecipesListComplete(response) {
      var recipes = [];
      response.forEach(function (apiResponse) {
        recipes.push(RecipeFactory.build(apiResponse));
      });

      return recipes;
    }

    /**
     * Create or update recipe in REST backend.
     *
     * @param recipeId
     * @param data
     * @returns {*|Function|promise|F|n}
     */
    function saveRecipe(recipeId, data) {
      return recipeId ? recipe.update({id: recipeId}, data).$promise
        : recipe.save(data).$promise;
    }

    /**
     * Delete recipe by ElasticSearch document id.
     *
     * @param recipeId
     * @returns {*|Function|promise|F|n}
     */
    function deleteRecipe(recipeId) {
      return recipe.delete({id: recipeId}).$promise;
    }
  }
})();
