'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:RecipeCreateController
 * @description
 * # RecipeCreateController
 * Create recipe controller
 */
angular.module('mealPlanner')
  .controller('RecipeCreateController', RecipeCreateController);

/* @ngInject */
function RecipeCreateController($scope, $mdToast, recipeService, ingredientService) {
  var self = this;

  self.isLoading = false;
  self.selectedItem = null;
  self.searchText = null;
  self.ingredients = [];
  self.querySearch = querySearch;
  self.createRecipe = createRecipe;
  self.addIngredient = addIngredient;

  function querySearch() {
    return ingredientService.searchIngredients(self.searchText);
  }

  function addIngredient(ingredient) {
    self.searchText = '';
    if (valid() && unique()) {
      self.ingredients.push(ingredient);
    }

    function valid() {
      return ingredient != undefined && ingredient.name != undefined;
    }

    function unique() {
      var result = true;
      self.ingredients.forEach(function (existing) {
        if (existing.name == ingredient.name) {
          result = false;
        }
      });

      return result;
    }
  }

  function createRecipe() {
    self.isLoading = true;
    recipeService.createRecipe($scope.recipe).then(function () {
      $scope.go('recipesList', 'slide-up');
      $mdToast.show({
        parent: angular.element(document.getElementById('content-view')),
        template: '<md-toast>Recipe was created!</md-toast>',
        position: 'top left',
        hideDelay: 3000
      });
    });
  }
}
