(function () {
  'use strict';

  angular.module('mealPlanner.ingredients')
    .factory('ingredientService', IngredientService);

  /* @ngInject */
  function IngredientService($resource) {
    var ingredient = $resource('/api/ingredients/:id', null, {'update': {method: 'PUT'}});

    return {
      getIngredient: getIngredient,
      getIngredients: getIngredients,
      searchIngredients: searchIngredients,
      saveIngredient: saveIngredient,
      deleteIngredient: deleteIngredient
    };

    /**
     * Load single ingredient by ElasticSearch document id.
     *
     * @param ingredientId
     * @returns {*|Function|promise|F|n}
     */
    function getIngredient(ingredientId) {
      return ingredient.get({id: ingredientId}).$promise;
    }

    /**
     * Load list of ingredients from REST backend.
     *
     * @returns {*}
     */
    function getIngredients() {
      return ingredient.query().$promise.then(getIngredientsComplete);

      function getIngredientsComplete(response) {
        return response;
      }
    }

    /**
     * Search ingredients by given query text.
     *
     * @param searchText
     * @returns {*|Function|promise|F|n}
     */
    function searchIngredients(searchText) {
      return ingredient.query({query: searchText}).$promise;
    }

    /**
     * Create or update ingredient in REST backend.
     *
     * @param ingredientId
     * @param data
     * @returns {*|Function|promise|F|n}
     */
    function saveIngredient(ingredientId, data) {
      return ingredientId
        ? ingredient.update({id: ingredientId}, data).$promise
        : ingredient.save(data).$promise;
    }

    /**
     * Delete ingredient by ElasticSearch document id.
     *
     * @param ingredientId
     * @returns {*|Function|promise|F|n}
     */
    function deleteIngredient(ingredientId) {
      return ingredient.delete({id: ingredientId}).$promise;
    }
  }
})();
