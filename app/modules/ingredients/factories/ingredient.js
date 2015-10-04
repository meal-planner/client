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
  function IngredientFactory(ENV, NutrientCollectionFactory) {
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
      ingredient.can_edit = data.can_edit;
      if (data.ndbno) {
        ingredient.ndbno = data.ndbno;
      }
      ingredient.name = data.name;
      ingredient.group = data.group;
      ingredient.generic = data.generic;
      var imageUrl = data.image_url || defaultIcon(ingredient.group);
      ingredient.imageUrl = ENV.contentEndpoint + imageUrl;
      ingredient.measures = data.measures;
      ingredient.selectedMeasure = 0;
      var measure = ingredient.measures[ingredient.selectedMeasure];
      ingredient.selectedAmount = measure.qty;
      ingredient.nutrients = NutrientCollectionFactory.fromJson(measure.nutrients);

      return ingredient;
    }

    /**
     * Get default icon for given ingredient group.
     *
     * @param {String} group
     * @returns {*}
     */
    function defaultIcon(group) {
      switch(group) {
        case 'Meat':
          return 'ingredient/meat-group.png';
        case 'Poultry':
          return 'ingredient/poultry-group.png';
        case 'Fish & Seafood':
          return 'ingredient/fish-group.png';
        case 'Nuts & Seeds':
          return 'ingredient/nuts-group.png';
        case 'Legumes':
          return 'ingredient/legumes-group.png';
        case 'Dairy & Eggs':
          return 'ingredient/dairy-group.png';
        case 'Vegetables':
          return 'ingredient/vegetables-group.png';
        case 'Grains':
          return 'ingredient/grains-group.png';
        case 'Fruits':
          return 'ingredient/fruits-group.png';
        case 'Beverages':
          return 'ingredient/beverages-group.png';
        case 'Sweets & Deserts':
          return 'ingredient/sweets-group.png';
        case 'Other':
          return 'ingredient/other-group.png';
        default:
          return 'ingredient/image/default-icon.png';
      }
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
        name: this.name,
        group: this.group,
        generic: this.generic,
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
