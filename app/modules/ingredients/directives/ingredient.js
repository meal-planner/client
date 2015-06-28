(function () {
  'use strict';

  angular.module('mealPlanner.ingredients')
    .directive('mpIngredientItem', IngredientItemDirective);

  /* @ngInject */
  function IngredientItemDirective($state) {
    return {
      templateUrl: 'modules/ingredients/views/ingredient.html',
      link: ingredientItemLink,
      scope: {
        ingredient: '=',
        last: '='
      }
    };

    function ingredientItemLink(scope) {
      scope.editIngredient = editIngredient;

      /**
       * Go to ingredient edit form.
       *
       * @param ingredientId
       */
      function editIngredient(ingredientId) {
        $state.go('editIngredient', {ingredientId: ingredientId});
      }
    }
  }
})();
