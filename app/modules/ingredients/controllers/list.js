'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:IngredientsListController
 * @description
 * # IngredientsListController
 * Controller of the mealPlanner
 */
angular.module('mealPlanner')
  .controller('IngredientsListController', IngredientsListController);

/* @ngInject */
function IngredientsListController(ingredientService) {
  var self = this;

  self.items = [];
  self.searchText = null;
  self.searchIngredients = searchIngredients;

  return init();

  function init() {
    self.isLoading = true;

    getIngredients().then(
      function () {
        self.isLoading = false;
      },
      function () {
        self.isLoading = false;
        self.isError = true;
      }
    );
  }

  function getIngredients() {
    return ingredientService.getIngredients()
      .then(function (data) {
        self.items = data;
        return self.items;
      });
  }

  function searchIngredients() {
    self.isLoading = true;

    return ingredientService.searchIngredients(self.searchText)
      .then(function (data) {
        self.isLoading = false;
        self.items = data;
        return self.items;
      }
    );
  }
}
