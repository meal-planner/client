(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.directive:mpRecipeItem
   * @description
   * # mpRecipeItem
   * Recipe item directive, used to display one recipe in a list.
   */
  angular
    .module('mealPlanner.recipes')
    .directive('mpRecipeItem', mpRecipeItem);

  /* @ngInject */
  function mpRecipeItem($state) {
    return {
      templateUrl: 'modules/recipes/views/directive.recipe-item.html',
      link: recipeItemLink,
      scope: {
        recipe: '=',
        last: '='
      }
    };

    function recipeItemLink(scope) {
      scope.viewRecipe = viewRecipe;

      /**
       * Go to recipe view form.
       *
       * @param recipeId
       */
      function viewRecipe(recipeId) {
        $state.go('viewRecipe', {recipeId: recipeId});
      }
    }
  }
})();
