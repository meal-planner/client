(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.factory:MealFactory
   * @description
   * # MealFactory
   * Meal factory builds meal instances from given recipe or plain object.
   */
  angular
    .module('mealPlanner.planner')
    .factory('MealFactory', MealFactory);

  /* @ngInject */
  function MealFactory(NutrientCollectionFactory) {
    /**
     * Meal constructor.
     *
     * @param {String} name
     * @param {String} type
     * @constructor
     */
    function Meal(name, type) {
      var self = this;

      self.name = name;
      self.type = type;
      self.servings = 1;
      self.nutrients = {};
    }

    Meal.prototype.toJson = toJson;
    Meal.build = build;
    Meal.fromRecipe = fromRecipe;
    Meal.fromJson = fromJson;

    return Meal;

    /**
     * Build empty meal.
     *
     * @param {String} name
     * @param {String} type
     * @returns {Meal}
     */
    function build(name, type) {
      return new Meal(name, type);
    }

    /**
     * Create meal from recipe.
     *
     * @param {Recipe} recipe
     * @param {String} type
     * @returns {Meal}
     */
    function fromRecipe(recipe, type) {
      var meal = build(recipe.name, type);
      meal.servings = recipe.servings;
      meal.nutrients = recipe.nutrients;

      return meal;
    }

    /**
     * Create meal from JSON.
     * Expected object format is following:
     * {
     *   name: 'string',
     *   type: 'string',
     *   servings: 'number',
     *   nutrients: {
     *     energy: 'number',
     *     protein: 'number',
     *     ...
     *   }
     * }
     *
     * @param json
     * @returns {Meal}
     */
    function fromJson(json) {
      var meal = build(json.name, json.type);
      meal.servings = json.servings;
      meal.nutrients = NutrientCollectionFactory.fromJson(json.nutrients);

      return meal;
    }

    /**
     * Convert meal to JSON.
     *
     * @returns {{name: *, type: *, servings: *, nutrients: {}}}
     */
    function toJson() {
      /*jshint validthis:true */
      var json = {
        name: this.name,
        type: this.type,
        servings: this.servings,
        nutrients: this.nutrients.toJson()
      };

      return json;
    }
  }

})();
