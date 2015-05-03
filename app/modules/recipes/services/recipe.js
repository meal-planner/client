'use strict';

angular.module('mealPlanner')
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

  function getRecipe(recipeId) {
    return recipe.get({id: recipeId}).$promise;
  }

  function getRecipes() {
    return recipe.query().$promise.then(getRecipesComplete);

    function getRecipesComplete(response) {
      return response;
    }
  }

  function searchRecipes(searchText) {
    return recipe.query({query: searchText}).$promise;
  }

  function saveRecipe(recipeId, data) {
    return recipeId
      ? recipe.update({id: recipeId}, data).$promise
      : recipe.save(data).$promise;
  }

  function deleteRecipe(recipeId) {
    return recipe.delete({id: recipeId}).$promise;
  }

}
