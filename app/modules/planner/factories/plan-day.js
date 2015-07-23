(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.factory:PlanDayFactory
   * @description
   * # PlanDayFactory
   * Plan day factory builds single day instances.
   */
  angular
    .module('mealPlanner.planner')
    .factory('PlanDayFactory', PlanDayFactory);

  /* @ngInject */
  function PlanDayFactory(NutrientCollectionFactory, MealFactory) {
    /**
     * Plan day constructor.
     *
     * @param {string} name
     * @constructor
     */
    function PlanDay(name) {
      this.name = name;
      this.meals = [];
      this.nutrients = NutrientCollectionFactory.build();
    }

    PlanDay.prototype.addMeal = addMeal;
    PlanDay.prototype.removeMeal = removeMeal;
    PlanDay.prototype.toJson = toJson;
    PlanDay.build = build;
    PlanDay.fromJson = fromJson;

    return PlanDay;

    /**
     * Create a meal from given recipe and add it to the day.
     *
     * @param {Recipe} recipe
     * @param {string} type
     */
    function addMeal(recipe, type) {
      /*jshint validthis:true */
      var meal = MealFactory.fromRecipe(recipe, type);

      this.meals.push(meal);
      this.nutrients.sum(meal.nutrients);
    }

    /**
     * Remove given meal from plan.
     *
     * @param {Meal} meal
     */
    function removeMeal(meal) {
      /*jshint validthis:true */
      var index = this.meals.indexOf(meal);
      if (index !== -1) {
        this.nutrients.subtract(meal.nutrients);
        this.meals.splice(index, 1);
      }
    }

    /**
     * Build empty day.
     *
     * @param name
     * @returns {PlanDay}
     */
    function build(name) {
      return new PlanDay(name);
    }

    /**
     * Create day from JSON.
     *
     * @param object
     * @returns {PlanDay}
     */
    function fromJson(object) {
      var day = build(object.name);
      object.meals.forEach(function (mealObject) {
        var meal = MealFactory.fromJson(mealObject);
        day.meals.push(meal);
        day.nutrients.sum(meal.nutrients);
      });

      return day;
    }

    /**
     * Convert day to JSON.
     *
     * @returns {{name: *, meals: [Meal]}}
     */
    function toJson() {
      /*jshint validthis:true */
      var object = {
        name: this.name,
        meals: this.meals.map(function (meal) {
          return meal.toJson();
        })
      };

      return object;
    }
  }

})();
