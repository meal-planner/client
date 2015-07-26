(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.nutrients.service:NutrientService
   * @description
   * # NutrientService
   * Nutrients data service.
   */
  angular
    .module('mealPlanner.nutrients')
    .service('NutrientService', NutrientService);

  /* @ngInject */
  function NutrientService($http) {

    return {
      getAvailableNutrients: getAvailableNutrients,
      getDailyValues: getDailyValues,
    };

    /**
     * Get all available nutrients.
     *
     * @returns {*[]}
     */
    function getAvailableNutrients() {
      return [
        {
          label: 'Calories',
          code: 'energy',
          unit: 'kcal',
          group: 'Main Nutrients',
          sort: 1
        },
        {
          label: 'Total Fat',
          code: 'fat',
          unit: 'g',
          precision: 1,
          group: 'Main Nutrients',
          sort: 5
        },
        {
          label: 'Saturated fat',
          code: 'fat_saturated',
          unit: 'g',
          precision: 1,
          group: 'Main Nutrients',
          subNutrient: true,
          sort: 10
        },
        {
          label: 'Monounsaturated fat',
          code: 'fat_monounsaturated',
          unit: 'g',
          precision: 1,
          group: 'Main Nutrients',
          subNutrient: true,
          sort: 15
        },
        {
          label: 'Polyunsaturated fat',
          code: 'fat_polyunsaturated',
          unit: 'g',
          precision: 1,
          group: 'Main Nutrients',
          subNutrient: true,
          sort: 20
        },
        {
          label: 'Trans fat',
          code: 'fat_trans',
          unit: 'g',
          precision: 2,
          group: 'Main Nutrients',
          subNutrient: true,
          sort: 25
        },
        {
          label: 'Cholesterol',
          code: 'cholesterol',
          unit: 'mg',
          group: 'Main Nutrients',
          sort: 30
        },
        {
          label: 'Sodium, Na',
          code: 'sodium',
          unit: 'mg',
          group: 'Main Nutrients',
          sort: 35
        },
        {
          label: 'Total Carbs',
          code: 'carbohydrate',
          unit: 'g',
          precision: 1,
          group: 'Main Nutrients',
          sort: 40
        },
        {
          label: 'Dietary Fiber',
          code: 'fiber',
          unit: 'g',
          precision: 1,
          group: 'Main Nutrients',
          subNutrient: true,
          sort: 45
        },
        {
          label: 'Sugar',
          code: 'sugar',
          unit: 'g',
          precision: 1,
          group: 'Main Nutrients',
          subNutrient: true,
          sort: 50
        },
        {
          label: 'Protein',
          code: 'protein',
          unit: 'g',
          precision: 1,
          group: 'Main Nutrients',
          sort: 55
        },
        {
          label: 'Vitamin A',
          code: 'vitamin_a_iu',
          unit: 'IU',
          group: 'Vitamins',
          sort: 100
        },
        {
          label: 'Vitamin B-6',
          code: 'vitamin_b6',
          unit: 'mg',
          group: 'Vitamins',
          sort: 105
        },
        {
          label: 'Vitamin B-12',
          code: 'vitamin_b12',
          unit: 'µg',
          group: 'Vitamins',
          sort: 110
        },
        {
          label: 'Vitamin C',
          code: 'vitamin_c',
          unit: 'mg',
          group: 'Vitamins',
          sort: 115
        },
        {
          label: 'Vitamin D',
          code: 'vitamin_d',
          unit: 'IU',
          group: 'Vitamins',
          sort: 120
        },
        {
          label: 'Vitamin E',
          code: 'vitamin_e',
          unit: 'mg',
          precision: 2,
          group: 'Vitamins',
          sort: 125
        },
        {
          label: 'Vitamin K',
          code: 'vitamin_k',
          unit: 'µg',
          group: 'Vitamins',
          sort: 130
        },
        {
          label: 'Niacin',
          code: 'niacin',
          unit: 'mg',
          group: 'Vitamins',
          sort: 135
        },
        {
          label: 'Thiamin',
          code: 'thiamin',
          unit: 'mg',
          precision: 2,
          group: 'Vitamins',
          sort: 140
        },
        {
          label: 'Riboflavin',
          code: 'riboflavin',
          unit: 'mg',
          precision: 2,
          group: 'Vitamins',
          sort: 145
        },
        {
          label: 'Folate',
          code: 'folate_dfe',
          unit: 'µg',
          group: 'Vitamins',
          sort: 150
        },
        {
          label: 'Calcium, Ca',
          code: 'calcium',
          unit: 'mg',
          group: 'Minerals',
          sort: 200
        },
        {
          label: 'Iron, Fe',
          code: 'iron',
          unit: 'mg',
          precision: 1,
          group: 'Minerals',
          sort: 205
        },
        {
          label: 'Potassium, K',
          code: 'potassium',
          unit: 'mg',
          group: 'Minerals',
          sort: 210
        },
        {
          label: 'Magnesium, Mg',
          code: 'magnesium',
          unit: 'mg',
          group: 'Minerals',
          sort: 220
        },
        {
          label: 'Phosphorus, P',
          code: 'phosphorus',
          unit: 'mg',
          group: 'Minerals',
          sort: 225
        },
        {
          label: 'Zinc, Zn',
          code: 'zinc',
          unit: 'mg',
          group: 'Minerals',
          sort: 230
        },
        {
          label: 'Iodine, I',
          code: 'iodine',
          unit: 'µg',
          group: 'Minerals'
        },
        {
          label: 'Selenium, Se',
          code: 'selenium',
          unit: 'µg',
          group: 'Minerals'
        },
        {
          label: 'Copper, Cu',
          code: 'copper',
          unit: 'mg',
          group: 'Minerals'
        },
        {
          label: 'Manganese, Mn',
          code: 'manganese',
          unit: 'mg',
          group: 'Minerals'
        },
        {
          label: 'Chromium, Cr',
          code: 'chromium',
          unit: 'µg',
          group: 'Minerals'
        },
        {
          label: 'Molybdenum, Mo',
          code: 'molybdenum',
          unit: 'µg',
          group: 'Minerals'
        },
        {
          label: 'Chloride, Cl',
          code: 'chloride',
          unit: 'µg',
          group: 'Minerals'
        },
        {
          label: 'Water',
          code: 'water',
          unit: 'g',
          group: 'Other'
        },
        {
          label: 'Caffeine',
          code: 'caffeine',
          unit: 'mg',
          group: 'Other'
        },
        {
          label: 'Pantothenic acid',
          code: 'pantothenic_acid',
          unit: 'mg',
          group: 'Other'
        }
      ];
    }

    /**
     * Get nutrients daily values.
     *
     * @returns {*}
     */
    function getDailyValues() {
      return $http.get('modules/nutrients/data/daily_values.json', {cache: true})
        .then(function (dailyValues) {
          return dailyValues.data;
        });
    }
  }
})();
