(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.controller:RecipeSelectorController
   * @description
   * # RecipeSelectorController
   * Recipe selector controller
   */
  angular
    .module('mealPlanner.planner')
    .controller('RecipeSelectorController', RecipeSelectorController);

  /* @ngInject */
  function RecipeSelectorController($mdDialog, RecipeService, PlanService) {
    var RECIPE_SEARCH_LIMIT = 4;
    var self = this;

    self.searchText = null;
    self.recipes = [];
    self.searchRecipes = searchRecipes;
    self.cancelDialog = cancelDialog;
    self.addRecipe = addRecipe;

    /**
     * Set initial state.
     * Load list of recipes.
     */
    return activate();

    function activate() {
      self.mealTypes = PlanService.mealTypes;
      self.mealType = PlanService.mealTypes[0];

      RecipeService.getRecipes().then(function (recipes) {
        self.recipes = recipes;
      });
    }

    /**
     * Search recipes with given query.
     *
     * @param searchQuery
     * @param previousSearchText
     * @returns {*}
     */
    function searchRecipes() {
      self.isLoading = true;

      RecipeService.searchRecipes(self.searchText, RECIPE_SEARCH_LIMIT)
        .then(function (recipes) {
          self.isLoading = false;
          self.recipes = recipes;
        });
    }

    /**
     * Send selected recipe to the day directive.
     *
     * @param recipe
     */
    function addRecipe(recipe) {
      $mdDialog.hide({recipe: recipe, type: self.mealType});
    }

    /**
     * Close popup.
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
