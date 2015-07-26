(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.directive:mpIngredientAddMeasure
   * @description
   * # mpIngredientAddMeasure
   * Add new measure on ingredient edit page directive.
   */
  angular
    .module('mealPlanner.ingredients')
    .directive('mpIngredientAddMeasure', mpIngredientAddMeasure);

  /* @ngInject */
  function mpIngredientAddMeasure(NutrientCollectionFactory) {
    return {
      templateUrl: 'modules/ingredients/views/directive.add-measure.html',
      link: ingredientAddMeasureLink,
      scope: {
        ingredient: '='
      }
    };

    function ingredientAddMeasureLink(scope) {
      scope.addMeasure = addMeasure;

      /**
       * Add measure to ingredient.
       * Calculate new measure nutrients values based on default measure (100g) and new measure equivalent.
       */
      function addMeasure() {
        var measureNutrients = {};
        var defaultMeasure = scope.ingredient.measures[0];
        if (defaultMeasure) {
          defaultMeasure.nutrients.items.forEach(function (nutrient) {
            var value = nutrient.value * scope.measureEqv / defaultMeasure.qty;
            measureNutrients[nutrient.code] = Math.round(value * 100) / 100;
          });
        }

        scope.ingredient.measures.push({
          qty: scope.measureQty,
          label: scope.measureLabel,
          eqv: scope.measureEqv,
          nutrients: NutrientCollectionFactory.fromJson(measureNutrients)
        });

        scope.measureQty = '';
        scope.measureLabel = '';
        scope.measureEqv = '';
      }
    }
  }
})();
