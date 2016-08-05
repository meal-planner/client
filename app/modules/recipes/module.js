(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name mealPlanner.recipes
   * @description
   * # mealPlanner.recipes
   *
   * Recipes module.
   */
  /* jshint ignore:start */
  angular.module('mealPlanner.recipes', ['ngResource', 'mealPlanner.images', angularDragula(angular)]);
  /* jshint ignore:end */
})();
