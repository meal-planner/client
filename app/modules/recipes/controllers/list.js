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
  self.searchText = null;
  self.searchRecipes = searchRecipes;

  return init();

  function init() {
    self.isLoading = true;
    getRecipes().then(
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

  function searchRecipes() {
    self.isLoading = true;

    return recipeService.searchRecipes(self.searchText)
      .then(function (data) {
        self.isLoading = false;
        self.items = data;
        return self.items;
      }
    );
  }
}
