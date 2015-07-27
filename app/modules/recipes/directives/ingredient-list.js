(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.directive:mpRecipeIngredientList
   * @description
   * # mpRecipeIngredientList
   * Ingredients list on recipe edit page.
   */
  angular
    .module('mealPlanner.recipes')
    .directive('mpRecipeIngredientList', mpRecipeIngredientList);

  /* @ngInject */
  function mpRecipeIngredientList() {
    return {
      templateUrl: 'modules/recipes/views/directive.ingredient-list.html',
      link: ingredientListLink,
      scope: {
        recipe: '='
      }
    };

    function ingredientListLink(scope) {
      scope.removeIngredient = removeIngredient;

      /**
       * Remove ingredient from the recipe by index.
       *
       * @param ingredientIndex
       */
      function removeIngredient(ingredientIndex) {
        scope.recipe.ingredients.splice(ingredientIndex, 1);
      }
    }
  }
})();
