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
    self.ingredients.push(ingredient);
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
