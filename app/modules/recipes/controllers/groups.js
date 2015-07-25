(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.controller:RecipesGroupsController
   * @description
   * # RecipesGroupsController
   *
   * Groups of recipes controller
   */
  angular
    .module('mealPlanner.recipes')
    .controller('RecipesGroupsController', RecipesGroupsController);

  /* @ngInject */
  function RecipesGroupsController(dishTypes, cuisines, keyIngredients, diets) {
    var self = this;
    self.groups = [
      {
        title: 'Dish Type',
        tiles: dishTypes,
        paramKey: 'dish_type'
      },
      {
        title: 'Cuisine',
        tiles: cuisines,
        paramKey: 'cuisine'
      },
      {
        title: 'Key Ingredient',
        tiles: keyIngredients,
        paramKey: 'key_ingredient'
      },
      {
        title: 'Diet',
        tiles: diets,
        paramKey: 'diet'
      }
    ];
  }
})();
