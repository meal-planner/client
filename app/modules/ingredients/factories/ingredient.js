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
     *
     * @constructor
     */
    function Ingredient() {
      var self = this;

      self.measures = [];
    }

    Ingredient.prototype.updateNutritionValues = updateNutritionValues;
    Ingredient.prototype.toJson = toJson;
    Ingredient.fromJson = fromJson;
    Ingredient.build = build;

    return Ingredient;

    /**
     * Update nutrition values for currently selected measure/amount.
     */
    function updateNutritionValues() {
      /*jshint validthis:true */
      var measure = this.measures[this.selectedMeasure];
      var selectedAmount = this.selectedAmount;
      this.nutrients.items.forEach(function (nutrient) {
        nutrient.value = (measure.nutrients[nutrient.code] / measure.qty) * selectedAmount;
      });
    }

    /**
     * Build new ingredient model.
     *
     * @returns {Ingredient}
     */
    function build() {
      return new Ingredient();
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
    function fromJson(data) {
      var ingredient = build();
      ingredient.id = data.id;
      ingredient.name = data.name;
      ingredient.short_name = data.short_name;
      ingredient.group = data.group;
      ingredient.measures = data.measures;
      ingredient.selectedMeasure = 0;
      var measure = ingredient.measures[ingredient.selectedMeasure];
      ingredient.selectedAmount = measure.qty;
      ingredient.nutrients = NutrientCollectionFactory.fromJson(measure.nutrients);

      return ingredient;
    }

    /**
     * Convert ingredient to JSON.
     *
     * @returns {{id: *, name: *, short_name: *, group: *, measures: *}}
     */
    function toJson() {
      /*jshint validthis:true */
      var json = {
        id: this.id,
        name: this.name,
        short_name: this.short_name,
        group: this.group,
        measures: this.measures.map(function (measure) {
          return {
            label: measure.label,
            eqv: measure.eqv,
            qty: measure.qty,
            nutrients: measure.nutrients.toJson()
          };
        })
      };

      return json;
    }
  }
})();
