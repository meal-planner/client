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
  function IngredientFactory(ENV, NutrientCollectionFactory, IngredientGroupService) {
    /**
     * Ingredient constructor.
     *
     * @constructor
     */
    function Ingredient() {
      var self = this;

      self.measures = [];
      self.imageCrop = '';
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
     *  generic: 'boolean',
     *  ready_to_eat: 'boolean',
     *  image_url: 'string',
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
      ingredient.forked_from = data.forked_from;
      ingredient.can_edit = data.can_edit;
      if (data.ndbno) {
        ingredient.ndbno = data.ndbno;
      }
      ingredient.name = data.name;
      ingredient.group = data.group;
      ingredient.generic = data.generic;
      ingredient.ready_to_eat = data.ready_to_eat;
      if (data.image_url) {
        ingredient.imageUrl = ENV.contentEndpoint + data.image_url;
      } else {
        ingredient.imageUrl = IngredientGroupService.getGroupIcon(ingredient.group);
      }
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
     * @returns {{id: *, name: *, group: *, generic: *, measures: *}}
     */
    function toJson() {
      /*jshint validthis:true */
      var json = {
        id: this.id,
        forked_from: this.forked_from,
        name: this.name,
        group: this.group,
        generic: this.generic,
        ready_to_eat: this.ready_to_eat,
        image_crop: this.imageCrop,
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
