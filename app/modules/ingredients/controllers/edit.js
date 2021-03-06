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
  function IngredientsEditController($state, $mdToast, NavigationService, IngredientService, ingredient, foodGroups) {
    var self = this;

    if (ingredient.id || ingredient.forked_from) {
      NavigationService.navigationBar.title = ingredient.name;
    }
    self.ingredient = ingredient;
    self.foodGroups = foodGroups;
    self.image = {src: ''};
    self.saveIngredient = saveIngredient;

    /**
     * Persist ingredient in the backend.
     */
    function saveIngredient() {
      NavigationService.navigationBar.isLoading = true;
      self.saveButtonDisabled = true;

      IngredientService.saveIngredient(self.ingredient.id, self.ingredient.toJson())
        .then(function (response) {
          $state.go('viewIngredient', {ingredientId: response.id});
          $mdToast.show(
            $mdToast.simple()
              .textContent('Ingredient was saved!')
              .position('bottom left')
              .hideDelay(3000)
          );
        }, function (response) {
          self.saveButtonDisabled = false;
          NavigationService.handleError(response.data.error);
        });
    }
  }
})();
