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
  function RecipesGroupsController(NavigationService, RecipeService, groups) {
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
    self.searchRecipes = searchRecipes;

    NavigationService.navigationBar.searchCallback = searchRecipes;

    /**
     * Search recipes by given text query.
     *
     * @returns {*}
     */
    function searchRecipes(query) {
      if (query.length > 0) {
        NavigationService.navigationBar.isLoading = true;
        RecipeService.searchRecipes(query)
          .then(function (data) {
              NavigationService.navigationBar.isLoading = false;
              self.items = data;
            }
          );
      } else {
        self.items = null;
      }
    }
  }
})();
