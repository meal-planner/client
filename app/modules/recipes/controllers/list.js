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
  angular.module('mealPlanner.recipes')
    .controller('RecipesListController', RecipesListController);

  /* @ngInject */
  function RecipesListController($state, recipeService) {
    var self = this;
    self.items = [];
    self.searchText = null;
    self.searchRecipes = searchRecipes;
    self.openRecipe = openRecipe;

    /**
     * Set initial state.
     * Pre-load list of latest recipes.
     */
    return initialize();

    function initialize() {
      self.isLoading = true;
      getRecipes().then(
        function () {
          self.isLoading = false;
        },
        function () {
          self.isLoading = false;
          self.isError = true;
        }
      );
    }

    /**
     * Load recipes from backend.
     *
     * @returns {*}
     */
    function getRecipes() {
      return recipeService.getRecipes()
        .then(function (data) {
          self.items = data;
          return self.items;
        });
    }

    /**
     * Search recipes by given text query.
     *
     * @returns {*}
     */
    function searchRecipes() {
      self.isLoading = true;

      return recipeService.searchRecipes(self.searchText)
        .then(function (data) {
          self.isLoading = false;
          self.items = data;
          return self.items;
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
