'use strict';

angular.module('mealPlanner')
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

  function getIngredient(ingredientId) {
    return ingredient.get({id: ingredientId}).$promise;
  }

  function getIngredients() {
    return ingredient.query().$promise.then(getIngredientsComplete);

    function getIngredientsComplete(response) {
      return response;
    }
  }

  function searchIngredients(searchText) {
    return ingredient.query({query: searchText}).$promise;
  }

  function saveIngredient(ingredientId, data) {
    return ingredientId
      ? ingredient.update({id: ingredientId}, data).$promise
      : ingredient.save(data).$promise;
  }

  function deleteIngredient(ingredientId) {
    return ingredient.delete({id: ingredientId}).$promise;
  }

}
