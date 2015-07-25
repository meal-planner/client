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
  function IngredientsListController($stateParams, IngredientService) {
    var self = this;

    self.items = [];
    self.searchText = '';
    self.searchIngredients = searchIngredients;

    /**
     * Set initial state.
     * Pre-load list of latest ingredients.
     */
    return activate();

    function activate() {
      self.isLoading = true;

      getIngredients().then(
        function () {
          self.isLoading = false;
        },
        function () {
          self.isLoading = false;
          self.isError = true;
        }
      );

      /**
       * Load ingredients from service.
       *
       * @returns {*}
       */
      function getIngredients() {
        return IngredientService.getIngredients($stateParams.group)
          .then(function (data) {
            self.items = data;
            return self.items;
          });
      }
    }

    /**
     * Search ingredients by given text query.
     *
     * @param {String} query
     * @returns {*}
     */
    function searchIngredients(query) {
      self.isLoading = true;

      IngredientService.searchIngredients(query)
        .then(function (data) {
          self.isLoading = false;
          self.items = data;
        });
    }
  }
})();
