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
  function IngredientsGroupsController(groups) {
    var self = this;

    self.groups = groups;
  }
})();
