'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:RecipesListController
 * @description
 * # RecipesListController
 * List of recipes controller
 */
angular.module('mealPlanner')
  .controller('RecipesListController', RecipesListController);

/* @ngInject */
function RecipesListController(recipeService) {
  var self = this;
  self.items = [];

  initialize();

  function initialize() {
    self.isLoading = true;
    return getRecipes().then(
      function () {
        self.isLoading = false;
      },
      function () {
        self.isLoading = false;
        self.isError = true;
      }
    );
  }

  function getRecipes() {
    return recipeService.getRecipes()
      .then(function (data) {
        self.items = data;
        return self.items;
      });
  }
}
