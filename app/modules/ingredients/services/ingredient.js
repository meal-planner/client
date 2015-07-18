(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.service:ingredientService
   * @description
   * # ingredientService
   * Ingredient service, performs communication with ingredient backend API.
   */
  angular
    .module('mealPlanner.ingredients')
    .service('ingredientService', IngredientService);

  /* @ngInject */
  function IngredientService($resource, IngredientFactory, ENV) {
    var ingredient = $resource(ENV.apiEndpoint + 'ingredients/:id', null, {'update': {method: 'PUT'}});

    return {
      getIngredient: getIngredient,
      getIngredients: getIngredients,
      searchIngredients: searchIngredients,
      saveIngredient: saveIngredient,
      deleteIngredient: deleteIngredient
    };

    /**
     * Load single ingredient by ElasticSearch document id.
     * Build and return Ingredient object when complete.
     *
     * @param ingredientId
     * @returns {Ingredient}
     */
    function getIngredient(ingredientId) {
      return ingredient.get({id: ingredientId}).$promise.then(getIngredientComplete);

      function getIngredientComplete(apiResponse) {
        return IngredientFactory.build(apiResponse);
      }
    }

    /**
     * Load list of ingredients from REST backend.
     *
     * @returns [{Ingredient}]
     */
    function getIngredients() {
      return ingredient.query().$promise.then(getIngredientsListComplete);
    }

    /**
     * Search ingredients by given query text.
     *
     * @param searchText
     * @returns [{Ingredient}]
     */
    function searchIngredients(searchText) {
      return ingredient.query({query: searchText}).$promise.then(getIngredientsListComplete);
    }

    /**
     * Walk through the list of ingredients and build Ingredient instances.
     *
     * @param response
     * @returns [{Ingredient}]
     */
    function getIngredientsListComplete(response) {
      var ingredients = [];
      response.forEach(function (apiResponse) {
        ingredients.push(IngredientFactory.build(apiResponse));
      });

      return ingredients;
    }

    /**
     * Create or update ingredient in REST backend.
     *
     * @param ingredientId
     * @param data
     * @returns {*|Function|promise|F|n}
     */
    function saveIngredient(ingredientId, data) {
      return ingredientId ? ingredient.update({id: ingredientId}, data).$promise
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
