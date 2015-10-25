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
     * @param {String} recipeId
     * @param {String} name
     * @param {String} type
     * @constructor
     */
    function Meal() {
      var self = this;

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
     * @returns {Meal}
     */
    function build() {
      return new Meal();
    }

    /**
     * Create meal from recipe.
     *
     * @param {Recipe} recipe
     * @param {String} type
     * @returns {Meal}
     */
    function fromRecipe(recipe, type) {
      var meal = build();
      meal.recipe_id = recipe.id;
      meal.imageUrl = recipe.imageUrl;
      meal.name = recipe.name;
      meal.type = type;
      meal.servings = recipe.servings;
      meal.nutrients = recipe.nutrients;

      return meal;
    }

    /**
     * Create meal from JSON.
     * Expected object format is following:
     * {
     *   recipe_id: 'string',
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
      var meal = build();
      meal.recipe_id = json.recipe_id;
      meal.imageUrl = json.imageUrl;
      meal.name = json.name;
      meal.type = json.type;
      meal.servings = json.servings;
      meal.nutrients = NutrientCollectionFactory.fromJson(json.nutrients);

      return meal;
    }

    /**
     * Convert meal to JSON.
     *
     * @returns {{recipe_id: *, name: *, type: *, servings: *, nutrients: {}}}
     */
    function toJson() {
      /*jshint validthis:true */
      var json = {
        recipe_id: this.recipe_id,
        imageUrl: this.imageUrl,
        name: this.name,
        type: this.type,
        servings: this.servings,
        nutrients: this.nutrients.toJson()
      };

      return json;
    }
  }

})();
