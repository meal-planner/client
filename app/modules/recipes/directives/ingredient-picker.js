(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.directive:mpRecipeIngredientPicker
   * @description
   * # mpRecipeIngredientPicker
   * Ingredients picker on recipe edit page.
   */
  angular
    .module('mealPlanner.recipes')
    .directive('mpRecipeIngredientPicker', mpRecipeIngredientPicker);

  /* @ngInject */
  function mpRecipeIngredientPicker(IngredientService) {
    return {
      templateUrl: 'modules/recipes/views/directive.ingredient-picker.html',
      link: ingredientPickerLink,
      scope: {
        recipe: '='
      }
    };

    function ingredientPickerLink(scope) {
      scope.searchText = null;
      scope.querySearch = querySearch;
      scope.addIngredient = addIngredient;

      /**
       * Perform ingredients search.
       *
       * @returns [{Ingredient}]
       */
      function querySearch() {
        return IngredientService.searchIngredients(scope.searchText);
      }

      /**
       * Add ingredient to the recipe.
       *
       * @param {Ingredient} ingredient
       */
      function addIngredient(ingredient) {
        scope.searchText = '';
        scope.recipe.addIngredient(ingredient);
      }
    }
  }
})();
