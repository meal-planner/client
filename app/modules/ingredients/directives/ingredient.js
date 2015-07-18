(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.directive:mpIngredientItem
   * @description
   * # mpIngredientItem
   * Ingredient item directive, used to display one ingredient in a list.
   */
  angular
    .module('mealPlanner.ingredients')
    .directive('mpIngredientItem', mpIngredientItem);

  /* @ngInject */
  function mpIngredientItem($state) {
    return {
      templateUrl: 'modules/ingredients/views/directive.ingredient.html',
      link: ingredientItemLink,
      scope: {
        ingredient: '=',
        last: '='
      }
    };

    function ingredientItemLink(scope) {
      scope.viewIngredient = viewIngredient;

      /**
       * Go to ingredient edit form.
       *
       * @param ingredientId
       */
      function viewIngredient(ingredientId) {
        $state.go('viewIngredient', {ingredientId: ingredientId});
      }
    }
  }
})();
