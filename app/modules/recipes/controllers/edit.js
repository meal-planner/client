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
function RecipeEditController($scope, $mdToast, $mdDialog, $stateParams, recipeService, ingredientService, nutrientService) {
  var self = this;

  self.isLoading = false;
  self.isEdit = false;
  self.selectedItem = null;
  self.searchText = null;
  self.recipe = {steps: ['']};
  self.ingredients = [];
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
      recipeService.getRecipe(recipeId).then(function (apiResponse) {
        self.recipe = apiResponse;
        apiResponse.ingredients.forEach(function (recipeIngredient) {
          ingredientService.getIngredient(recipeIngredient.id).then(function (ingredient) {
            var chosenMeasure = 0, index = 0;
            ingredient.nutrients.energy.measures.forEach(function (measure) {
              if (measure.label == recipeIngredient.measure) {
                chosenMeasure = index;
              }
              index++;
            });
            ingredient.chosenMeasure = chosenMeasure;
            ingredient.chosenAmount = recipeIngredient.measure_amount;
            self.ingredients.push(ingredient);
          });
        });
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
      self.ingredients.push(ingredient);
    }

    function valid() {
      return ingredient != undefined && ingredient.id != undefined;
    }

    function unique() {
      var result = true;
      self.ingredients.forEach(function (existing) {
        if (existing.id == ingredient.id) {
          result = false;
        }
      });

      return result;
    }
  }

  function removeIngredient(ingredientIndex) {
    self.ingredients.splice(ingredientIndex, 1);
  }

  function getNutrientInfo(ingredient, nutrientName) {
    var nutrient = ingredient.nutrients[nutrientName];
    var measure = nutrient.measures[ingredient.chosenMeasure];
    if (!ingredient.chosenAmount) {
      ingredient.chosenAmount = measure.qty;
    }
    var value = (measure.value / measure.qty) * ingredient.chosenAmount;

    var nutrientInfo = nutrientService.getNutrientInfo(nutrientName, value);
    return nutrientInfo.label + ': ' + nutrientInfo.value + ' ' + nutrientInfo.unit;
  }

  function addCookingStep() {
    self.recipe.steps.push('');
  }

  function removeCookingStep(step) {
    self.recipe.steps.splice(step, 1);
  }

  function saveRecipe() {
    if (self.ingredients.length == 0) {
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
    convertIngredients();
    recipeService.saveRecipe(self.recipe.id, self.recipe).then(function () {
      $scope.go('recipesList');
      $mdToast.show({
        template: '<md-toast>Recipe was saved!</md-toast>',
        position: 'bottom left',
        hideDelay: 3000
      });
    });

    /**
     * Convert ingredients for recipe storage:
     * - store selected measure label and amount
     * - calculate each nutrient value based on chosen measure amount
     */
    function convertIngredients() {
      self.recipe.ingredients = [];
      self.recipe.nutrients = {};
      self.ingredients.forEach(function (ingredient) {
        for (var nutrient in ingredient.nutrients) {
          if (ingredient.nutrients.hasOwnProperty(nutrient)) {
            if (!self.recipe.nutrients[nutrient]) {
              self.recipe.nutrients[nutrient] = 0;
            }
            var measure = ingredient.nutrients[nutrient].measures[ingredient.chosenMeasure];
            self.recipe.nutrients[nutrient] += (measure.value / measure.qty) * ingredient.chosenAmount || 0;
          }
        }
        var recipeIngredient = {
          id: ingredient.id,
          name: ingredient.name,
          short_name: ingredient.short_name,
          group: ingredient.group,
          measure: ingredient.nutrients.energy.measures[ingredient.chosenMeasure].label,
          measure_amount: ingredient.chosenAmount
        };
        self.recipe.ingredients.push(recipeIngredient);
      });
    }
  }
}
