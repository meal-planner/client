(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.controller:RecipeSelectorController
   * @description
   * # RecipeSelectorController
   * Recipe selector controller
   */
  angular.module('mealPlanner.planner')
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
     */
    return initialize();

    function initialize() {
      $scope.$watch('ctrl.searchText', $mdUtil.debounce(searchRecipes, 300));
      self.mealTypes = planService.mealTypes;
      self.mealType = planService.mealTypes[0];

      recipeService.getRecipes()
        .then(function (data) {
          self.recipes = data;
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
        .then(function (data) {
          self.isLoading = false;
          self.recipes = data;
          return self.recipes;
        }
      );
    }

    /**
     * Send selected recipe to day controller.
     *
     * @param recipe
     */
    function addRecipe(recipe) {
      recipe.mealType = self.mealType;
      $mdDialog.hide(recipe);
    }

    /**
     * Close popup.
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
