'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:IngredientsCreateController
 * @description
 * # IngredientsCreateController
 * Controller of the mealPlanner
 */
angular.module('mealPlanner')
  .controller('IngredientsCreateController', IngredientsCreateController);

/* @ngInject */
function IngredientsCreateController($scope, $mdToast, $filter, ingredientService) {
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
    {label: 'Monounsaturated fat', code: 'fat_monounsaturated', unit: 'g', group: 'Lipids'},
    {label: 'Polyunsaturated fat', code: 'fat_polyunsaturated', unit: 'g', group: 'Lipids'},
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
    {label: 'Vitamin D (D2 + D3)', code: 'vitamin_d2_d3', unit: 'µg', group: 'Vitamins'},
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
  self.isNutrientSelectorShown = false;
  self.selectedNutrient = null;

  self.addMeasure = addMeasure;
  self.addNutrient = addNutrient;
  self.removeMeasure = removeMeasure;
  self.createIngredient = createIngredient;

  initialize();

  function initialize() {
    addNutrient('energy');
    addNutrient('carbohydrate');
    addNutrient('protein');
    addNutrient('fat');
    addMeasure(100, 'g');
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
        self.ingredient.nutrients[code] = nutrient;
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

  function createIngredient() {
    self.isLoading = true;
    ingredientService.createIngredient(self.ingredient).then(function () {
      $scope.go('ingredientsList', 'slide-up');
      $mdToast.show({
        parent: angular.element(document.getElementById('content-view')),
        template: '<md-toast>Ingredient was created!</md-toast>',
        position: 'top left',
        hideDelay: 3000
      });
    });
  }
}
