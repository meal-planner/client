(function () {
  'use strict';

  angular
    .module('mealPlanner.planner')
    .factory('planService', PlanService);

  /* @ngInject */
  function PlanService(localStorageService) {
    var mealTypes = [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Snack'
      ],
      days = localStorageService.get('plan.days') || [];

    return {
      days: days,
      mealTypes: mealTypes,
      persist: persist,
      addDayToPlan: addDayToPlan,
      addMealToPlanDay: addMealToPlanDay,
      removeMealFromPlan: removeMealFromPlan,
      getDayNutrients: getDayNutrients,
      getPlanNutrients: getPlanNutrients
    };

    /**
     * Persist planned days in local storage.
     */
    function persist() {
      localStorageService.set('plan.days', days);
    }

    /**
     * Create new day object and add it to the plan.
     *
     * @param name
     */
    function addDayToPlan(name) {
      days.push({
        id: _uniqueId(),
        name: name,
        meals: []
      });
    }

    /**
     * Create new meal object from given recipe and add it to the plan.
     *
     * @param day
     * @param recipe
     */
    function addMealToPlanDay(day, recipe) {
      day.meals.push({
        id: _uniqueId(),
        name: recipe.name,
        mealType: recipe.mealType,
        nutrients: recipe.nutrients,
        servings: recipe.servings || 1
      });
    }

    /**
     * Remove meal from the plan.
     *
     * @param day
     * @param meal
     */
    function removeMealFromPlan(meal) {
      days.some(function (day) {
        var index = day.meals.indexOf(meal);
        if (index !== -1) {
          day.meals.splice(index, 1);
          return true;
        }
      });
    }

    /**
     * Calculate total daily nutrients from all meals.
     *
     * @param day
     * @returns {{}}
     */
    function getDayNutrients(day) {
      var nutrients = {};
      day.meals.forEach(function (meal) {
        _sumNutrients(meal.nutrients, nutrients);
      });

      return nutrients;
    }

    /**
     * Calculate total plan nutrients from all days.
     *
     * @returns {{}}
     */
    function getPlanNutrients() {
      var nutrients = {};
      days.forEach(function (day) {
        _sumNutrients(getDayNutrients(day), nutrients);
      });

      return nutrients;
    }

    /**
     * Collect all nutrients from {source} object and add them to {target} object.
     *
     * @param source
     * @param target
     * @private
     */
    function _sumNutrients(source, target) {
      for (var nutrient in source) {
        if (source.hasOwnProperty(nutrient)) {
          if (!target[nutrient]) {
            target[nutrient] = 0;
          }
          target[nutrient] += source[nutrient];
        }
      }
    }

    /**
     * Generate random string to be used as object's identification.
     *
     * @returns {string}
     * @private
     */
    function _uniqueId() {
      var id = '';
      var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 32; i++) {
        id += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      return id;
    }
  }
})();
