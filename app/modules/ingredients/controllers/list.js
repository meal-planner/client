(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.controller:IngredientsListController
   * @description
   * # IngredientsListController
   *
   * Controller of the mealPlanner
   */
  angular
    .module('mealPlanner.ingredients')
    .controller('IngredientsListController', IngredientsListController);

  /* @ngInject */
  function IngredientsListController($stateParams, NavigationService, IngredientService, ingredients) {
    var self = this;

    self.items = ingredients;
    self.searchIngredients = searchIngredients;
    NavigationService.navigationBar.title = 'Ingredients \u203A ' +  $stateParams.group;
    NavigationService.navigationBar.searchCallback = searchIngredients;

    /**
     * Search ingredients by given text query.
     *
     * @param {String} query
     * @returns {*}
     */
    function searchIngredients(query) {
      self.isLoading = true;

      IngredientService.searchIngredients(query, $stateParams.group)
        .then(function (data) {
          self.isLoading = false;
          self.items = data;
        });
    }
  }
})();
