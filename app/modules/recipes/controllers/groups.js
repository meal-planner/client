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
  function RecipesGroupsController(groups) {
    var self = this;
    self.groups = [
      {
        title: 'Dish Type',
        tiles: groups.dishTypes,
        paramKey: 'dish_type'
      },
      {
        title: 'Cuisine',
        tiles: groups.cuisines,
        paramKey: 'cuisine'
      },
      {
        title: 'Key Ingredient',
        tiles: groups.keyIngredients,
        paramKey: 'key_ingredient'
      },
      {
        title: 'Diet',
        tiles: groups.diets,
        paramKey: 'diet'
      }
    ];
  }
})();
