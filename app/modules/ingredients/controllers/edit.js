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
function IngredientsEditController($scope, $stateParams, $mdToast, $filter, ingredientService) {
  var self = this;

  self.availableNutrients = [
    {label: 'Water', code: 'water', unit: 'g', group: 'Proximates'},
    {label: 'Energy', code: 'energy', unit: 'kcal', group: 'Proximates'},
    {label: 'Protein', code: 'protein', unit: 'g', group: 'Proximates'},
    {label: 'Carbohydrate', code: 'carbohydrate', unit: 'g', group: 'Proximates'},
    {label: 'Fiber', code: 'fiber', unit: 'g', group: 'Proximates'},
    {label: 'Sugar', code: 'sugar', unit: 'g', group: 'Proximates'},
    {label: 'Fat', code: 'fat', unit: 'g', group: 'Proximates'},
    {label: 'Saturated fat', code: 'fat_saturated', unit: 'g', group: 'Lipids'},
    {label: 'Monounsat. fat', code: 'fat_monounsaturated', unit: 'g', group: 'Lipids'},
    {label: 'Polyunsat. fat', code: 'fat_polyunsaturated', unit: 'g', group: 'Lipids'},
    {label: 'Trans fat', code: 'fat_trans', unit: 'g', group: 'Lipids'},
    {label: 'Cholesterol', code: 'cholesterol', unit: 'mg', group: 'Lipids'},
    {label: 'Calcium, Ca', code: 'calcium', unit: 'mg', group: 'Minerals'},
    {label: 'Iron, Fe', code: 'iron', unit: 'mg', group: 'Minerals'},
    {label: 'Magnesium, Mg', code: 'magnesium', unit: 'mg', group: 'Minerals'},
    {label: 'Phosphorus, P', code: 'phosphorus', unit: 'mg', group: 'Minerals'},
    {label: 'Potassium, K', code: 'potassium', unit: 'mg', group: 'Minerals'},
    {label: 'Sodium, Na', code: 'sodium', unit: 'mg', group: 'Minerals'},
    {label: 'Zinc, Zn', code: 'zinc', unit: 'mg', group: 'Minerals'},
    {label: 'Vitamin C', code: 'vitamin_c', unit: 'mg', group: 'Vitamins'},
    {label: 'Vitamin A, RAE', code: 'vitamin_a_rae', unit: 'µg', group: 'Vitamins'},
    {label: 'Vitamin A, IU', code: 'vitamin_a_iu', unit: 'IU', group: 'Vitamins'},
    {label: 'Thiamin', code: 'thiamin', unit: 'mg', group: 'Vitamins'},
    {label: 'Riboflavin', code: 'riboflavin', unit: 'mg', group: 'Vitamins'},
    {label: 'Niacin', code: 'niacin', unit: 'mg', group: 'Vitamins'},
    {label: 'Vitamin B-6', code: 'vitamin_b6', unit: 'mg', group: 'Vitamins'},
    {label: 'Vitamin B-12', code: 'vitamin_b12', unit: 'µg', group: 'Vitamins'},
    {label: 'Folate, DFE', code: 'folate_dfe', unit: 'µg', group: 'Vitamins'},
    {label: 'Vitamin E', code: 'vitamin_e', unit: 'mg', group: 'Vitamins'},
    {label: 'Vitamin D', code: 'vitamin_d2_d3', unit: 'µg', group: 'Vitamins'},
    {label: 'Vitamin D', code: 'vitamin_d', unit: 'IU', group: 'Vitamins'},
    {label: 'Vitamin K', code: 'vitamin_k', unit: 'µg', group: 'Vitamins'},
    {label: 'Caffeine', code: 'caffeine', unit: 'mg', group: 'Other'}
  ];
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
      ingredientService.getIngredient(ingredientId).then(function (data) {
        self.ingredient = data;
        for (var nutrient in data.nutrients) {
          if (data.nutrients.hasOwnProperty(nutrient)) {
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
      $scope.go('ingredientsList', 'slide-up');
      $mdToast.show({
        template: '<md-toast>Ingredient was saved!</md-toast>',
        position: 'bottom left',
        hideDelay: 3000
      });
    });
  }
}
