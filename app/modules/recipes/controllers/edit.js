'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:RecipeEditController
 * @description
 * # RecipeEditController
 * Create recipe controller
 */
angular.module('mealPlanner')
  .controller('RecipeEditController', RecipeEditController);

/* @ngInject */
function RecipeEditController($scope, $mdToast, $mdDialog, $filter, $stateParams, recipeService, ingredientService) {
  var self = this;

  self.isLoading = false;
  self.isEdit = false;
  self.selectedItem = null;
  self.searchText = null;
  self.recipe = {ingredients: [], steps: ['']};
  self.querySearch = querySearch;
  self.saveRecipe = saveRecipe;
  self.addIngredient = addIngredient;
  self.removeIngredient = removeIngredient;
  self.addCookingStep = addCookingStep;
  self.removeCookingStep = removeCookingStep;
  self.getNutrientInfo = getNutrientInfo;
  self.ingredientMeasureSelected = ingredientMeasureSelected;

  initialize();

  function initialize() {
    var recipeId = $stateParams.recipeId;
    if (recipeId) {
      self.isEdit = true;
      recipeService.getRecipe(recipeId).then(function (data) {
        self.recipe = data;
      });
    }
  }

  function ingredientMeasureSelected(ingredient) {
    ingredient.chosenAmount = ingredient.nutrients['energy'].measures[ingredient.chosenMeasure].qty;
  }

  function querySearch() {
    return ingredientService.searchIngredients(self.searchText);
  }

  function addIngredient(ingredient) {
    self.searchText = '';
    if (valid() && unique()) {
      ingredient.chosenMeasure = 0;
      self.recipe.ingredients.push(ingredient);
    }

    function valid() {
      return ingredient != undefined && ingredient.id != undefined;
    }

    function unique() {
      var result = true;
      self.recipe.ingredients.forEach(function (existing) {
        if (existing.id == ingredient.id) {
          result = false;
        }
      });

      return result;
    }
  }

  function removeIngredient(ingredientIndex) {
    self.recipe.ingredients.splice(ingredientIndex, 1);
  }

  function getNutrientInfo(ingredient, nutrientName, precision) {
    var nutrient = ingredient.nutrients[nutrientName];
    var measure = nutrient.measures[ingredient.chosenMeasure];
    if (!ingredient.chosenAmount) {
      ingredient.chosenAmount = measure.qty;
    }
    var value = (measure.value / measure.qty) * ingredient.chosenAmount;

    return $filter('number')(value, precision || 0) + ' ' + nutrient.unit;
  }

  function addCookingStep() {
    self.recipe.steps.push('');
  }

  function removeCookingStep(step) {
    self.recipe.steps.splice(step, 1);
  }

  function saveRecipe() {
    if (self.recipe.ingredients.length == 0) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .title('No ingredients')
          .content('Please, add at least one ingredient to this recipe.')
          .ariaLabel('No ingredients alert')
          .ok('OK')
      );
      return false;
    }

    self.isLoading = true;
    recipeService.saveRecipe(self.recipe.id, self.recipe).then(function () {
      $scope.go('recipesList');
      $mdToast.show({
        template: '<md-toast>Recipe was saved!</md-toast>',
        position: 'bottom left',
        hideDelay: 3000
      });
    });
  }
}
