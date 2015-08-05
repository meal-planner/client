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
  function mpRecipeIngredientPicker($mdDialog, IngredientService) {
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
      scope.openIngredientBrowser = openIngredientBrowser;

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

      /**
       * Open ingredient browser popup.
       *
       * @param event
       */
      function openIngredientBrowser(event) {
        $mdDialog.show({
          controller: 'IngredientBrowserController',
          controllerAs: 'ctrl',
          bindToController: true,
          templateUrl: 'modules/recipes/views/ingredient-browser.html',
          targetEvent: event,
          locals: {
            recipe: scope.recipe
          }
        });
      }
    }
  }
})();
