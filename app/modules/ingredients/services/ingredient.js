'use strict';

angular.module('mealPlanner')
  .factory('ingredientService', IngredientService);

/* @ngInject */
function IngredientService($resource) {
  var ingredient = $resource('/api/ingredients/:id');

  return {
    getIngredients: getIngredients,
    createIngredient: createIngredient,
    deleteIngredient: deleteIngredient
  };


  function getIngredients() {
    return ingredient.query().$promise.then(getIngredientsComplete);

    function getIngredientsComplete(response) {
      return response;
    }
  }

  function createIngredient(data) {
    return ingredient.save(data).$promise;
  }

  function deleteIngredient(ingredientId) {
    return ingredient.delete({id: ingredientId}).$promise;
  }

}
