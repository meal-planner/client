'use strict';

angular.module('mealPlanner')
  .factory('nutrientService', NutrientService);

/* @ngInject */
function NutrientService($filter) {
  var nutrients = [
    {label: 'Water', code: 'water', unit: 'g', group: 'Proximates'},
    {label: 'Energy', code: 'energy', unit: 'kcal', group: 'Proximates'},
    {label: 'Protein', code: 'protein', unit: 'g', precision: 1, group: 'Proximates'},
    {label: 'Carbohydrate', code: 'carbohydrate', unit: 'g', precision: 1, group: 'Proximates'},
    {label: 'Fiber', code: 'fiber', unit: 'g', group: 'Proximates'},
    {label: 'Sugar', code: 'sugar', unit: 'g', group: 'Proximates'},
    {label: 'Fat', code: 'fat', unit: 'g', precision: 1, group: 'Proximates'},
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

  return {
    getAvailableNutrients: getAvailableNutrients,
    getNutrientInfo: getNutrientInfo
  };

  function getAvailableNutrients() {
    return nutrients;
  }

  function getNutrientInfo(code, value) {
    var nutrient = $filter('filter')(nutrients, {code: code})[0];
    if (nutrient) {
      return {
        value: $filter('number')(value, nutrient.precision || 0),
        label: nutrient.label,
        unit: nutrient.unit
      };
    } else {
      return {};
    }
  }
}
