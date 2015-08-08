(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.service:IngredientService
   * @description
   * # IngredientService
   * Ingredient service, performs communication with ingredient backend API.
   */
  angular
    .module('mealPlanner.ingredients')
    .service('IngredientService', IngredientService);

  /* @ngInject */
  function IngredientService($resource, IngredientFactory, ENV) {
    var ingredient = $resource(ENV.apiEndpoint + 'ingredients/:id', null, {'update': {method: 'PUT'}});

    return {
      getIngredient: getIngredient,
      getIngredients: getIngredients,
      searchIngredients: searchIngredients,
      saveIngredient: saveIngredient,
      deleteIngredient: deleteIngredient,
    };

    /**
     * Load single ingredient by ElasticSearch document id.
     * Build and return Ingredient object when complete.
     *
     * @param {String} ingredientId
     * @returns {Ingredient}
     */
    function getIngredient(ingredientId) {
      return ingredient.get({id: ingredientId}).$promise.then(getIngredientComplete);

      function getIngredientComplete(apiResponse) {
        return IngredientFactory.fromJson(apiResponse);
      }
    }

    /**
     * Load list of ingredients from REST backend.
     *
     * @param {String} group - filter ingredients by food group
     * @param {Number} start - from position
     * @param {Number} size - number of items in response
     * @returns [{Ingredient}]
     */
    function getIngredients(group, start, size) {
      return ingredient.query({group: group, start: start, size: size}).$promise.then(getIngredientsListComplete);
    }

    /**
     * Search ingredients by given query text.
     *
     * @param {String} searchText
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
        ingredients.push(IngredientFactory.fromJson(apiResponse));
      });

      return ingredients;
    }

    /**
     * Create or update ingredient in REST backend.
     *
     * @param {String} ingredientId
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
     * @param {String} ingredientId
     * @returns {*|Function|promise|F|n}
     */
    function deleteIngredient(ingredientId) {
      return ingredient.delete({id: ingredientId}).$promise;
    }
  }
})();
