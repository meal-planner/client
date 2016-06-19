(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.controller:IngredientsGroupsController
   * @description
   * # IngredientsGroupsController
   *
   * Controller for ingredients groups page.
   */
  angular
    .module('mealPlanner.ingredients')
    .controller('IngredientsGroupsController', IngredientsGroupsController);

  /* @ngInject */
  function IngredientsGroupsController(NavigationService, IngredientService, groups) {
    var self = this;

    self.groups = groups;
    self.searchIngredients = searchIngredients;
    NavigationService.navigationBar.searchCallback = searchIngredients;

    /**
     * Search ingredients by given text query.
     *
     * @param {String} query
     * @returns {*}
     */
    function searchIngredients(query) {
      if (query.length > 0) {
        NavigationService.navigationBar.isLoading = true;
        IngredientService.searchIngredients(query)
          .then(function (data) {
            NavigationService.navigationBar.isLoading = false;
            self.items = data;
          });
      } else {
        self.items = null;
      }
    }
  }
})();
