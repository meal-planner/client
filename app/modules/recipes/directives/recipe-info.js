(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.directive:mpRecipeInfo
   * @description
   * # mpRecipeInfo
   * Recipe info in recipes list.
   */
  angular
    .module('mealPlanner.recipes')
    .directive('mpRecipeInfo', mpRecipeInfo);

  /* @ngInject */
  function mpRecipeInfo() {
    return {
      templateUrl: 'modules/recipes/views/directive.recipe-info.html',
      scope: {
        recipe: '='
      }
    };
  }
})();
