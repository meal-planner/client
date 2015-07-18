(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.factory:IngredientFactory
   * @description
   * # IngredientFactory
   * Ingredient factory builds ingredient instances from given object.
   */
  angular
    .module('mealPlanner.ingredients')
    .factory('IngredientFactory', IngredientFactory);

  /* @ngInject */
  function IngredientFactory(NutrientCollectionFactory) {
    /**
     * Ingredient constructor.
     * Select first measure by default and watch for measure/amount changes.
     *
     * @param {string} name
     * @param {string} group
     * @param {array} measures
     * @constructor
     */
    function Ingredient(id, name, group, measures) {
      var self = this;

      self.id = id;
      self.name = name;
      self.group = group;
      self.measures = measures;
      self.selectedMeasure = 0;
      self.selectedAmount = self.measures[self.selectedMeasure].qty;
      self.nutrients = NutrientCollectionFactory.fromObject(self.measures[self.selectedMeasure].nutrients);
    }

    Ingredient.prototype.updateNutritionValues = updateNutritionValues;
    Ingredient.build = build;

    return Ingredient;

    /**
     * Update nutrition values for currently selected measure/amount.
     */
    function updateNutritionValues() {
      var measure = this.measures[this.selectedMeasure];
      var selectedAmount = this.selectedAmount;
      this.nutrients.items.forEach(function (nutrient) {
        var value = (measure.nutrients[nutrient.code] / measure.qty) * selectedAmount;
        nutrient.setValue(value);
      });
    }

    /**
     * Build ingredient from backend API response.
     * Expected response structure is following:
     * {
     *  id: 'string',
     *  name: 'string',
     *  group: 'string',
     *  measures: [
     *    {
     *      label: 'string',
     *      eqv: 'integer',
     *      qty: 'integer',
     *      nutrients: {
     *        energy: 'integer',
     *        protein: 'integer',
     *        ...
     *      }
     *    },
     *    ...
     *  ]
     * }
     *
     * @param data
     * @returns {Ingredient}
     */
    function build(data) {
      return new Ingredient(
        data.id,
        data.short_name ? data.short_name : data.name,
        data.group,
        data.measures
      );
    }
  }
})();
