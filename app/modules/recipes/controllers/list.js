(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.controller:RecipesListController
   * @description
   * # RecipesListController
   *
   * List of recipes controller
   */
  angular
    .module('mealPlanner.recipes')
    .controller('RecipesListController', RecipesListController);

  /* @ngInject */
  function RecipesListController($state, $stateParams, RecipeService) {
    var self = this;
    self.items = [];
    self.searchText = null;
    self.searchRecipes = searchRecipes;
    self.openRecipe = openRecipe;

    /**
     * Set initial state.
     * Pre-load list of latest recipes.
     */
    return activate();

    function activate() {
      self.isLoading = true;
      self.filterValue = $stateParams.filterValue;
      getRecipes().then(
        function () {
          self.isLoading = false;
        },
        function () {
          self.isLoading = false;
          self.isError = true;
        }
      );

      function getRecipes() {
        return RecipeService.getRecipes($stateParams.filterName, $stateParams.filterValue)
          .then(function (data) {
            self.items = data;
            return self.items;
          });
      }
    }

    /**
     * Search recipes by given text query.
     *
     * @returns {*}
     */
    function searchRecipes(query) {
      self.isLoading = true;

      RecipeService.searchRecipes(query)
        .then(function (data) {
          self.isLoading = false;
          self.items = data;
        }
      );
    }

    /**
     * Go to recipe view.
     *
     * @param recipeId
     */
    function openRecipe(recipeId) {
      $state.go('viewRecipe', {recipeId: recipeId});
    }
  }
})();
