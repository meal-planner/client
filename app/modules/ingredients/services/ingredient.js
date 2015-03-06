'use strict';

angular.module('mealPlanner')
  .factory('ingredientService', IngredientService);

/* @ngInject */
function IngredientService($resource) {
  var ingredient = $resource('/api/ingredients/:id');

  return {
    getIngredients: getIngredients,
    searchIngredients: searchIngredients,
    createIngredient: createIngredient,
    deleteIngredient: deleteIngredient
  };

  function getIngredients() {
    return ingredient.query().$promise.then(getIngredientsComplete);

    function getIngredientsComplete(response) {
      return response;
    }
  }

  function searchIngredients(searchText) {
    return ingredient.query({query: searchText}).$promise;
  }

  function createIngredient(data) {
    return ingredient.save(data).$promise;
  }

  function deleteIngredient(ingredientId) {
    return ingredient.delete({id: ingredientId}).$promise;
  }

}
