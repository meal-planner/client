'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:MealSelectorController
 * @description
 * # MealSelectorController
 * Meal selector controller
 */
angular.module('mealPlanner')
  .controller('MealSelectorController', MealSelectorController);

/* @ngInject */
function MealSelectorController($scope, $mdDialog, $mdUtil, recipeService) {
  var self = this;

  self.meal = {};
  self.mealTypes = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack'
  ];
  self.searchText = null;
  self.recipes = [];
  self.searchRecipes = searchRecipes;
  self.cancelDialog = cancelDialog;
  self.addRecipe = addRecipe;

  return initialize();

  function initialize() {
    $scope.$watch('ctrl.searchText', $mdUtil.debounce(searchRecipes, 300));

    recipeService.getRecipes()
      .then(function (data) {
        self.recipes = data;
        return self.recipes;
      });
  }

  function searchRecipes(searchQuery, previousSearchText) {
    if (!searchQuery && searchQuery === previousSearchText) return;
    self.isLoading = true;

    return recipeService.searchRecipes(self.searchText, 4)
      .then(function (data) {
        self.isLoading = false;
        self.recipes = data;
        return self.recipes;
      }
    );
  }

  function addRecipe(recipe) {
    $mdDialog.hide(recipe);
  }

  function cancelDialog() {
    $mdDialog.cancel();
  }
}
