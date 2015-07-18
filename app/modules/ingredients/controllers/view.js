(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.controller:IngredientViewController
   * @description
   * # IngredientViewController
   * Ingredient view controller.
   */
  angular
    .module('mealPlanner.ingredients')
    .controller('IngredientViewController', IngredientViewController);

  /* @ngInject */
  function IngredientViewController($state, $stateParams, ingredientService) {
    var self = this;
    self.ingredient = {};
    self.editIngredient = editIngredient;

    /**
     * Set initial state.
     * Load ingredient by given id. Redirect to list if not found.
     */
    return activate();

    function activate() {
      var ingredientId = $stateParams.ingredientId;
      ingredientService.getIngredient(ingredientId).then(
        function (ingredient) {
          self.ingredient = ingredient;
        },
        function () {
          $state.go('ingredientsList');
        }
      );
    }

    /**
     * Go to ingredient edit form.
     *
     * @param ingredientId
     */
    function editIngredient(ingredientId) {
      $state.go('editIngredient', {ingredientId: ingredientId});
    }
  }
})();
