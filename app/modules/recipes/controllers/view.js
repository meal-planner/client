'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:RecipeViewController
 * @description
 * # RecipeViewController
 * View recipe controller
 */
angular.module('mealPlanner')
  .controller('RecipeViewController', RecipeViewController);

/* @ngInject */
function RecipeViewController($state, $stateParams, recipeService, nutrientService) {
  var self = this;

  self.recipe = {};
  self.nutrients = [];
  self.displayNutrient = displayNutrient;

  initialize();

  function initialize() {
    var recipeId = $stateParams.recipeId;
    if (recipeId) {
      recipeService.getRecipe(recipeId).then(function (data) {
        self.recipe = data;
      });
    } else {
      $state.go('recipesList');
    }
  }

  function displayNutrient(code, value) {
    var nutrientInfo = nutrientService.getNutrientInfo(code, value);
    return nutrientInfo.label + ': ' + nutrientInfo.value + ' ' + nutrientInfo.unit;
  }
}
