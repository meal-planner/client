(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.controller:IngredientsEditController
   * @description
   * # IngredientsEditController
   * Controller of the mealPlanner
   */
  angular
    .module('mealPlanner.ingredients')
    .controller('IngredientsEditController', IngredientsEditController);

  /**
   * {ingredient} and {foodGroups} are resolved from routes.js
   *
   * @ngInject
   */
  function IngredientsEditController($state, $mdToast, IngredientService, ingredient, foodGroups) {
    var self = this;

    self.isLoading = false;
    self.isEdit = ingredient.id !== undefined;
    self.ingredient = ingredient;
    self.foodGroups = foodGroups;
    self.saveIngredient = saveIngredient;

    /**
     * Persist ingredient in the backend.
     */
    function saveIngredient() {
      self.isLoading = true;

      IngredientService.saveIngredient(self.ingredient.id, self.ingredient.toJson())
        .then(function () {
          $state.go('ingredientsList');
          $mdToast.show({
            template: '<md-toast>Ingredient was saved!</md-toast>',
            position: 'bottom left',
            hideDelay: 3000
          });
        });
    }
  }
})();
