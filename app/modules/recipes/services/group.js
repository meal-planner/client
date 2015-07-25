(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.service:RecipeGroupService
   * @description
   * # RecipeGroupService
   * Recipe groups service provides information about grouping/categorization of recipes.
   */
  angular
    .module('mealPlanner.recipes')
    .service('RecipeGroupService', RecipeGroupService);

  /* @ngInject */
  function RecipeGroupService($http, ENV) {
    return {
      getDishTypes: getDishTypes,
      getCuisines: getCuisines,
      getKeyIngredients: getKeyIngredients,
      getDiets: getDiets
    };

    /**
     * Load recipe dish types.
     *
     * @returns {*}
     */
    function getDishTypes() {
      return $http.get('modules/recipes/data/dish_type.json', {cache: true})
        .then(function (dishTypes) {
          return setImageUrl(dishTypes.data);
        });
    }

    /**
     * Load recipe cuisines.
     *
     * @returns {*}
     */
    function getCuisines() {
      return $http.get('modules/recipes/data/cuisine.json', {cache: true})
        .then(function (cuisines) {
          return setImageUrl(cuisines.data);
        });
    }

    /**
     * Load key recipe ingredients.
     *
     * @returns {*}
     */
    function getKeyIngredients() {
      return $http.get('modules/recipes/data/key_ingredient.json', {cache: true})
        .then(function (keyIngredients) {
          return setImageUrl(keyIngredients.data);
        });
    }

    /**
     * Load recipe diets.
     *
     * @returns {*}
     */
    function getDiets() {
      return $http.get('modules/recipes/data/diet.json', {cache: true})
        .then(function (diets) {
          return setImageUrl(diets.data);
        });
    }

    /**
     * Walk through given groups and set correct image URL.
     *
     * @param groups
     * @returns {*}
     */
    function setImageUrl(groups) {
      return groups.map(function (group) {
        group.background = ENV.contentEndpoint + group.background;
        return group;
      });
    }
  }
})();
