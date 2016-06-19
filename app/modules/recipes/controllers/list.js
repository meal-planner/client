(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.controller:RecipesListController
   * @description
   * # RecipesListController
   *
   * List of recipes controller
   */
  angular
    .module('mealPlanner.recipes')
    .controller('RecipesListController', RecipesListController);

  /* @ngInject */
  function RecipesListController($stateParams, NavigationService, RecipeService, recipes) {
    var self = this;

    self.items = recipes;
    self.searchRecipes = searchRecipes;

    NavigationService.navigationBar.title = 'Recipes \u203A ' +  $stateParams.filterValue;
    NavigationService.navigationBar.searchCallback = searchRecipes;

    /**
     * Search recipes by given text query.
     *
     * @returns {*}
     */
    function searchRecipes(query) {
      NavigationService.navigationBar.isLoading = true;

      RecipeService.searchRecipes(query, $stateParams.filterName, $stateParams.filterValue)
        .then(function (data) {
          NavigationService.navigationBar.isLoading = false;
          self.items = data;
        }
      );
    }
  }
})();
