(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.factory:RecipeFactory
   * @description
   * # RecipeFactory
   * Recipe factory builds recipe instances.
   */
  angular
    .module('mealPlanner.recipes')
    .factory('RecipeFactory', RecipeFactory);

  /* @ngInject */
  function RecipeFactory(NutrientCollectionFactory) {
    /**
     * Recipe constructor.
     *
     * @param {string} id
     * @param {string} name
     * @param {number} timeToCook
     * @param {number} servings
     * @param {array} ingredients
     * @param {} nutrients
     * @param {array} steps
     * @constructor
     */
    function Recipe(id, name, timeToCook, servings, ingredients, nutrients, steps) {
      var self = this;

      self.id = id;
      self.name = name;
      self.time_to_cook = timeToCook;
      self.servings = servings;
      self.ingredients = ingredients;
      self.nutrients = NutrientCollectionFactory.fromObject(nutrients);
      self.setServings(1);
      self.steps = steps;
    }

    Recipe.prototype.setServings = setServings;
    Recipe.build = build;

    return Recipe;

    /**
     * Build recipe from backend API response.
     * Expected response structure is following:
     * {
     *  id: 'string',
     *  name: 'string',
     *  time_to_cook: 'integer',
     *  servings: 'integer',
     *  ingredients: [
     *    {
     *      id: 'string',
     *      name: 'name',
     *      measure: 'string',
     *      measure_amount: 'integer'
     *    },
     *    ...
     *  ]
     *  nutrients: {
     *  energy: 'decimal',
     *  protein: 'decimal',
     *  ...,
     *  steps: [
     *    'string',
     *    ...
     *  ]
     * }
     *
     * @param data
     * @returns {Recipe}
     */
    function build(data) {
      return new Recipe(
        data.id,
        data.name,
        data.time_to_cook,
        data.servings || 1,
        data.ingredients,
        data.nutrients,
        data.steps
      );
    }

    /**
     * Set selected servings.
     *
     * @param servings
     */
    function setServings(servings) {
      var totalServings = this.servings;
      this.nutrients.items.forEach(function (nutrient) {
        nutrient.setValue(nutrient.value * servings / totalServings);
      });
    }
  }
})();
