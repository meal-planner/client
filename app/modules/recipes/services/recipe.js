'use strict';

angular.module('mealPlanner')
  .factory('recipeService', RecipeService);

/* @ngInject */
function RecipeService($resource) {
  var recipe = $resource('/api/recipes/:id');

  return {
    getRecipes: getRecipes,
    createRecipe: createRecipe,
    deleteRecipe: deleteRecipe
  };

  function getRecipes() {
    return recipe.query().$promise.then(getRecipesComplete);

    function getRecipesComplete(response) {
      return response;
    }
  }

  function createRecipe(data) {
    return recipe.save(data).$promise;
  }

  function deleteRecipe(recipeId) {
    return recipe.delete({id: recipeId}).$promise;
  }

}
