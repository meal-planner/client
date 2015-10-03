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
    self.loadIngredients = loadIngredients;
    self.addIngredient = addIngredient;
    self.backToGroups = backToGroups;
    self.groups = [];
    self.ingredients = [];
    self.pageSize = 25;
    self.currentPosition = 0;

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
     * Load ingredients in chosen group.
     * Save energy value to ingredient property for quick access.
     */
    function loadIngredients() {
      IngredientService.getIngredients(self.chosenGroup, self.currentPosition, self.pageSize)
        .then(function (ingredients) {
          ingredients.forEach(function (ingredient) {
            ingredient.energy = ingredient.nutrients.find('energy').value;
            self.ingredients.push(ingredient);
          });
          self.currentPosition += self.pageSize;
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

    /**
     * Go back to groups page and reset loaded ingredients.
     */
    function backToGroups() {
      self.chosenGroup = null;
      self.ingredients = [];
      self.currentPosition = 0;
    }
  }
})();
