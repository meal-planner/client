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
     *  description: 'string',
     *  generic: 'boolean',
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
      if (data.ndbno) {
        ingredient.ndbno = data.ndbno;
      }
      ingredient.name = data.name;
      ingredient.description = data.description;
      ingredient.group = data.group;
      ingredient.generic = data.generic;
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
     * @returns {{id: *, name: *, description: *, group: *, generic: *, measures: *}}
     */
    function toJson() {
      /*jshint validthis:true */
      var json = {
        id: this.id,
        name: this.name,
        description: this.description,
        group: this.group,
        generic: this.generic,
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
