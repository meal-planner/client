(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.nutrients.factory:NutrientFactory
   * @description
   * # NutrientFactory
   * Nutrient factory builds nutrient instances.
   */
  angular
    .module('mealPlanner.nutrients')
    .factory('NutrientFactory', NutrientFactory);

  /* @ngInject */
  function NutrientFactory($filter) {
    var nutrients = [
      {
        label: 'Calories',
        code: 'energy',
        unit: 'kcal',
        group: 'Main Nutrients',
        sort: 0
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
        label: 'Vitamin A, IU',
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

    var defaultDailyValues = {
      energy: 2000,
      fat: 65,
      fat_saturated: 20,
      cholesterol: 300,
      sodium: 2400,
      potassium: 3500,
      carbohydrate: 300,
      fiber: 25,
      protein: 50,
      vitamin_a_iu: 5000,
      vitamin_c: 60,
      calcium: 1000,
      iron: 18,
      vitamin_d: 400,
      vitamin_e: 30,
      vitamin_k: 80,
      thiamin: 1.5,
      riboflavin: 1.7,
      niacin: 20,
      vitamin_b6: 2,
      folate_dfe: 400,
      vitamin_b12: 6,
      phosphorus: 1000,
      magnesium: 400,
      zinc: 15,
      iodine: 150,
      selenium: 70,
      copper: 2,
      manganese: 2,
      chromium: 120,
      chloride: 3400,
      pantothenic_acid: 10
    };

    /**
     * Nutrient constructor.
     *
     * @param {string} code
     * @param {number} precision
     * @param {string} group
     * @param {string} label
     * @param {string} unit
     * @param {boolean} subNutrient
     * @param {number} sortOrder
     * @constructor
     */
    function Nutrient(code, precision, group, label, unit, subNutrient, sortOrder) {
      var self = this;

      self.code = code;
      self.precision = precision;
      self.value = 0;
      self.formattedValue = 0;
      self.dailyValue = 0;
      self.group = group;
      self.label = label;
      self.unit = unit;
      self.subNutrient = subNutrient;
      self.sortOrder = sortOrder;
    }


    Nutrient.prototype.setValue = setValue;
    Nutrient.build = build;
    Nutrient.isValidCode = isValidCode;
    Nutrient.getAvailableNutrients = getAvailableNutrients;

    return Nutrient;

    /**
     * Format value and recalculate daily value percentage.
     *
     * @param {number} value
     */
    function setValue(value) {
      this.value = value;
      this.formattedValue = $filter('number')(value, this.precision);
      this.dailyValue = $filter('number')(value / defaultDailyValues[this.code] * 100, 0)
    }

    /**
     * Build nutrient object from given code.
     * Value and formatting precision are optional.
     *
     * @param {string} code
     * @param {number} value
     * @param {integer} precision
     * @returns {Nutrient|boolean}
     */
    function build(code, value, precision) {
      var info = $filter('filter')(nutrients, {code: code})[0];
      if (info) {
        var nutrient = new Nutrient(
          code,
          precision || info.precision || 0,
          info.group,
          info.label,
          info.unit,
          info.subNutrient || false,
          info.sort || 9999
        );
        if (value > 0) {
          nutrient.setValue(value);
        }

        return nutrient;
      } else {
        return false;
      }
    }

    /**
     * Check if given code is valid nutrient.
     *
     * @param {string} code
     * @returns {boolean}
     */
    function isValidCode(code) {
      return $filter('filter')(nutrients, {code: code}).length > 0;
    }

    /**
     * Get copy of all available nutrients.
     *
     * @returns [{}]
     */
    function getAvailableNutrients() {
      return angular.copy(nutrients);
    }
  }
})();
