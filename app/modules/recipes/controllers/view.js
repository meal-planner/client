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
  function RecipeViewController(recipe) {
    var self = this;

    self.recipe = recipe;
  }
})();
