(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.directive:mpIngredientEditMeasure
   * @description
   * # mpIngredientEditMeasure
   * Measures on edit ingredient page directive.
   */
  angular
    .module('mealPlanner.ingredients')
    .directive('mpIngredientEditMeasure', mpIngredientEditMeasure);

  /* @ngInject */
  function mpIngredientEditMeasure($mdDialog, NutrientService) {
    return {
      templateUrl: 'modules/ingredients/views/directive.edit-measure.html',
      link: ingredientEditMeasureLink,
      scope: {
        ingredient: '='
      }
    };

    function ingredientEditMeasureLink(scope) {
      scope.showNutrientSelector = showNutrientSelector;
      scope.removeMeasure = removeMeasure;
      scope.totalAvailableNutrients = NutrientService.getAvailableNutrients().length;

      /**
       * Open popup window with available nutrients list.
       */
      function showNutrientSelector(event) {
        $mdDialog.show({
          controller: 'IngredientNutrientSelectorController',
          controllerAs: 'ctrl',
          bindToController: true,
          templateUrl: 'modules/ingredients/views/nutrient-selector.html',
          targetEvent: event,
          locals: {
            ingredient: scope.ingredient
          }
        });
      }

      /**
       * Remove measure from ingredient.
       *
       * @param {Number} index
       */
      function removeMeasure(index) {
        scope.ingredient.measures.splice(index, 1);
      }
    }
  }
})();
