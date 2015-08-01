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
  function RecipeViewController(recipe, NavigationService) {
    var self = this;

    self.recipe = recipe;
    NavigationService.navigationBar.title = recipe.name;
    NavigationService.navigationBar.showGoBack = true;
  }
})();
