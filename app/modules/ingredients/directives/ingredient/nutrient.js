(function () {
  'use strict';

  angular.module('mealPlanner.ingredients')
    .directive('mpIngredientNutrient', IngredientNutrientDirective);

  /* @ngInject */
  function IngredientNutrientDirective(nutrientService) {
    return {
      replace: true,
      templateUrl: 'modules/ingredients/views/ingredient/nutrient.html',
      link: ingredientNutrientLink,
      scope: {
        ingredient: '=',
        nutrient: '@',
      }
    };

    function ingredientNutrientLink(scope) {
      var ingredient = scope.ingredient,
        nutrientName = scope.nutrient;
      scope.nutrientInfo = getNutrientInfo();

      /**
       * Update nutrient values when amount is changed.
       */
      scope.$watch(function () {
        return ingredient.chosenAmount
      }, function () {
        scope.nutrientInfo = getNutrientInfo();
      }, true);

      /**
       * Update nutrient values when measure is changed.
       * Set chosen amount to selected measure default amount.
       */
      scope.$watch(function () {
        return ingredient.chosenMeasure
      }, function () {
        ingredient.chosenAmount = ingredient.nutrients[nutrientName].measures[ingredient.chosenMeasure].qty;
        scope.nutrientInfo = getNutrientInfo();
      }, true);

      /**
       * Get nutrient info for selected measure/amount.
       * By default selects first measure and that measure amount.
       *
       * @returns {*|{}}
       */
      function getNutrientInfo() {
        var measure, value;
        if (!ingredient.chosenMeasure) {
          ingredient.chosenMeasure = 0;
        }
        measure = ingredient
          .nutrients[nutrientName]
          .measures[ingredient.chosenMeasure];
        if (!ingredient.chosenAmount) {
          ingredient.chosenAmount = measure.qty;
        }
        value = (measure.value / measure.qty) * ingredient.chosenAmount;

        return nutrientService.getNutrientInfo(nutrientName, value);
      }
    }
  }
})();
