(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.controller:IngredientBrowserController
   * @description
   * # IngredientBrowserController
   *
   * Controller for ingredients browser popup on recipe edit form.
   */
  angular
    .module('mealPlanner.recipes')
    .controller('IngredientBrowserController', IngredientBrowserController);

  /* @ngInject */
  function IngredientBrowserController($mdDialog, IngredientGroupService, IngredientService, recipe) {
    var self = this;

    self.cancelDialog = cancelDialog;
    self.showIngredientGroup = showIngredientGroup;
    self.addIngredient = addIngredient;
    self.groups = [];

    return activate();

    /**
     * Load food groups.
     */
    function activate() {
      IngredientGroupService.getGroups().then(function (data) {
        self.groups = data;
      });
    }

    /**
     * Load selected group ingredients.
     *
     * @param {String} group
     */
    function showIngredientGroup(group) {
      self.chosenGroup = group;
      IngredientService.getIngredients(group).then(function (data) {
        self.ingredients = data;
      });
    }

    /**
     * Add selected ingredient to the recipe.
     *
     * @param {Ingredient} ingredient
     */
    function addIngredient(ingredient) {
      recipe.addIngredient(ingredient);
      $mdDialog.cancel();
    }

    /**
     * Close popup.
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
