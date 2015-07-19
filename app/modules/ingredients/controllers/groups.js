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
  function IngredientsGroupsController($state) {
    var self = this;

    self.goToGroup = goToGroup;

    /**
     * Set initial state.
     * Set up ingredient groups tiles.
     */
    return activate();

    function activate() {
      self.tiles = [
        {
          title: 'Meat',
          background: 'meat',
          span: {row: 2, col: 2}
        },
        {
          title: 'Fish & Seafood',
          background: 'fish',
          span: {row: 2, col: 3}
        },
        {
          title: 'Legumes',
          background: 'legumes',
          span: {row: 1, col: 1}
        },
        {
          title: 'Nuts & Seeds',
          background: 'nuts',
          span: {row: 1, col: 1}
        },
        {
          title: 'Poultry',
          background: 'poultry',
          span: {row: 2, col: 3}
        },
        {
          title: 'Dairy & Eggs',
          background: 'dairy',
          span: {row: 2, col: 3}
        },
        {
          title: 'Vegetables',
          background: 'vegetables',
          span: {row: 2, col: 2}
        },
        {
          title: 'Grains',
          background: 'grains',
          span: {row: 2, col: 2}
        },
        {
          title: 'Fruits',
          background: 'fruits',
          span: {row: 2, col: 2}
        },
        {
          title: 'Beverages',
          background: 'beverages',
          span: {row: 2, col: 3}
        },
        {
          title: 'Sweets & Deserts',
          background: 'sweets',
          span: {row: 2, col: 2}
        },
        {
          title: 'Other',
          background: 'other',
          span: {row: 2, col: 1}
        },
      ];
    }

    function goToGroup(group) {
      $state.go('ingredientsList', {group: group});
    }
  }
})();
