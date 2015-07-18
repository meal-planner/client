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
  function RecipeSelectorController($scope, $mdDialog, $mdUtil, recipeService, planService) {
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
      $scope.$watch('ctrl.searchText', $mdUtil.debounce(searchRecipes, 300));
      self.mealTypes = planService.mealTypes;
      self.mealType = planService.mealTypes[0];

      recipeService.getRecipes()
        .then(function (recipes) {
          self.recipes = recipes;
          return self.recipes;
        });
    }

    /**
     * Search recipes with given query.
     *
     * @param searchQuery
     * @param previousSearchText
     * @returns {*}
     */
    function searchRecipes(searchQuery, previousSearchText) {
      if (!searchQuery && searchQuery === previousSearchText) return;
      self.isLoading = true;

      return recipeService.searchRecipes(self.searchText, RECIPE_SEARCH_LIMIT)
        .then(function (recipes) {
          self.isLoading = false;
          self.recipes = recipes;
          return self.recipes;
        }
      );
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
