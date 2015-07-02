(function () {
  'use strict';

  angular
    .module('mealPlanner.recipes')
    .factory('recipeService', RecipeService);

  /* @ngInject */
  function RecipeService($resource) {
    var recipe = $resource('/api/recipes/:id', null, {'update': {method: 'PUT'}});

    return {
      getRecipe: getRecipe,
      getRecipes: getRecipes,
      searchRecipes: searchRecipes,
      saveRecipe: saveRecipe,
      deleteRecipe: deleteRecipe
    };

    /**
     * Load single recipe by ElasticSearch document id.
     *
     * @param recipeId
     * @returns {*|Function|promise|F|n}
     */
    function getRecipe(recipeId) {
      return recipe.get({id: recipeId}).$promise;
    }

    /**
     * Load list of recipes from REST backend.
     *
     * @returns {*}
     */
    function getRecipes() {
      return recipe.query().$promise.then(getRecipesComplete);

      function getRecipesComplete(response) {
        return response;
      }
    }

    /**
     * Search recipes by given query text.
     *
     * @param searchText
     * @param limit
     * @returns {*|Function|promise|F|n}
     */
    function searchRecipes(searchText, limit) {
      return recipe.query({query: searchText, limit: limit}).$promise;
    }

    /**
     * Create or update recipe in REST backend.
     *
     * @param recipeId
     * @param data
     * @returns {*|Function|promise|F|n}
     */
    function saveRecipe(recipeId, data) {
      return recipeId
        ? recipe.update({id: recipeId}, data).$promise
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
