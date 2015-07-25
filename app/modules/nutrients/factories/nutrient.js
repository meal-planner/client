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
  function NutrientFactory($filter, NutrientService) {
    var nutrients = NutrientService.getAvailableNutrients();

    /**
     * Nutrient constructor.
     *
     * @param {String} code
     * @param {Number} precision
     * @param {String} group
     * @param {String} label
     * @param {String} unit
     * @param {Boolean} subNutrient
     * @param {Number} sortOrder
     * @constructor
     */
    function Nutrient(code, precision, group, label, unit, subNutrient, sortOrder) {
      var self = this;

      self.code = code;
      self.precision = precision;
      self.value = 0;
      self.group = group;
      self.label = label;
      self.unit = unit;
      self.subNutrient = subNutrient;
      self.sortOrder = sortOrder;
    }

    Nutrient.build = build;

    return Nutrient;

    /**
     * Build nutrient object from given code.
     * Value and formatting precision are optional.
     *
     * @param {String} code
     * @param {Number} value
     * @param {Integer} precision
     * @returns {Nutrient|Boolean}
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
          nutrient.value = value;
        }

        return nutrient;
      } else {
        return false;
      }
    }
  }
})();
