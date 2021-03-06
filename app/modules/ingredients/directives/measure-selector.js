(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.directive:mpMeasureSelector
   * @description
   * # mpMeasureSelector
   * Ingredient measure selector directive, used to update ingredient nutrition values
   * when user changes selected measure or selected amount.
   */
  angular
    .module('mealPlanner.ingredients')
    .directive('mpMeasureSelector', mpMeasureSelector);

  /* @ngInject */
  function mpMeasureSelector() {
    return {
      templateUrl: 'modules/ingredients/views/directive.measure-selector.html',
      link: measureSelectorLink,
      scope: {
        ingredient: '='
      }
    };

    function measureSelectorLink(scope) {
      scope.updateSelectedMeasure = updateSelectedMeasure;

      /**
       * Set the selected amount from chosen measure and recalculate nutrition values.
       */
      function updateSelectedMeasure() {
        scope.ingredient.selectedAmount = scope.ingredient.measures[scope.ingredient.selectedMeasure].qty;
        scope.ingredient.updateNutritionValues();
      }
    }
  }
})();
