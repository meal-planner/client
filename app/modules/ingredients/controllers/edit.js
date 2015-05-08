'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:IngredientsEditController
 * @description
 * # IngredientsEditController
 * Controller of the mealPlanner
 */
angular.module('mealPlanner')
  .controller('IngredientsEditController', IngredientsEditController);

/* @ngInject */
function IngredientsEditController($scope, $stateParams, $mdToast, $filter, ingredientService, nutrientService) {
  var self = this;

  self.availableNutrients = nutrientService.getAvailableNutrients();
  self.foodGroups = [
    'Meat',
    'Poultry',
    'Fish',
    'Dairy & Eggs',
    'Grains',
    'Vegetables',
    'Fruits',
    'Legumes',
    'Beverages'
  ];
  self.ingredient = {nutrients: {}};
  self.isLoading = false;
  self.isEdit = false;
  self.isNutrientSelectorShown = false;
  self.selectedNutrient = null;

  self.addMeasure = addMeasure;
  self.addNutrient = addNutrient;
  self.removeMeasure = removeMeasure;
  self.saveIngredient = saveIngredient;

  initialize();

  function initialize() {
    var ingredientId = $stateParams.ingredientId;
    if (ingredientId) {
      self.isEdit = true;
      ingredientService.getIngredient(ingredientId).then(function (apiResponse) {
        self.ingredient = apiResponse;
        for (var nutrient in apiResponse.nutrients) {
          if (apiResponse.nutrients.hasOwnProperty(nutrient)) {
            addNutrient(nutrient);
          }
        }
      });
    } else {
      addNutrient('energy');
      addNutrient('carbohydrate');
      addNutrient('protein');
      addNutrient('fat');
      addMeasure(100, 'g');
    }
  }

  function addNutrient(code) {
    if (code != undefined) {
      var nutrient = $filter('filter')(self.availableNutrients, {code: code})[0];
      if (nutrient) {
        var index = self.availableNutrients.indexOf(nutrient);
        if (index != -1) {
          self.availableNutrients.splice(index, 1);
        }
        nutrient.measures = [];
        if (self.ingredient.nutrients[code]) {
          self.ingredient.nutrients[code].label = nutrient['label'];
        } else {
          self.ingredient.nutrients[code] = nutrient;
        }
      }
    }
  }

  function addMeasure(qty, label, eqv) {
    var nutrients = self.ingredient.nutrients;
    for (var nutrient in nutrients) {
      if (nutrients.hasOwnProperty(nutrient)) {
        nutrients[nutrient].measures.push({qty: qty || 1, label: label, eqv: eqv});
      }
    }
  }

  function removeMeasure(index) {
    var nutrients = self.ingredient.nutrients;
    for (var nutrient in nutrients) {
      if (nutrients.hasOwnProperty(nutrient)) {
        nutrients[nutrient].measures.splice(index, 1);
      }
    }
  }

  function saveIngredient() {
    self.isLoading = true;
    ingredientService.saveIngredient(self.ingredient.id, self.ingredient).then(function () {
      $scope.go('ingredientsList');
      $mdToast.show({
        template: '<md-toast>Ingredient was saved!</md-toast>',
        position: 'bottom left',
        hideDelay: 3000
      });
    });
  }
}
