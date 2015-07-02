(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.controller:RecipeViewController
   * @description
   * # RecipeViewController
   * View recipe controller
   */
  angular
    .module('mealPlanner.recipes')
    .controller('RecipeViewController', RecipeViewController);

  /* @ngInject */
  function RecipeViewController($state, $stateParams, recipeService) {
    var self = this;

    self.recipe = {};
    self.editRecipe = editRecipe;

    /**
     * Set initial state.
     * Load recipe by given id, redirect to list if no id provided.
     */
    return initialize();

    function initialize() {
      var recipeId = $stateParams.recipeId;
      if (recipeId) {
        recipeService.getRecipe(recipeId).then(function (data) {
          self.recipe = data;
          self.recipe.servings = self.recipe.servings || 1;
        });
      } else {
        $state.go('recipesList');
      }
    }

    /**
     * Go to edit recipe form.
     */
    function editRecipe() {
      var recipeId = $stateParams.recipeId;
      if (recipeId) {
        $state.go('editRecipe', {recipeId: recipeId});
      }
    }
  }
})();
