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
  function IngredientViewController(NavigationService, ingredient) {
    var self = this;

    self.ingredient = ingredient;
    NavigationService.navigationBar.title = ingredient.name;
    NavigationService.navigationBar.showGoBack = true;
  }
})();
