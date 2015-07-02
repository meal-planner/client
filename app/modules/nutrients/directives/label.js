(function () {
  'use strict';

  angular
    .module('mealPlanner.nutrients')
    .directive('mpNutritionLabel', mpNutritionLabel);

  /* @ngInject */
  function mpNutritionLabel(nutrientService) {
    return {
      templateUrl: 'modules/nutrients/views/label.html',
      link: nutritionLabelLink,
      scope: {
        servings: '@?',
        nutrients: '='
      }
    };

    /**
     * Get nutrients info and group it into main nutrients, vitamins and minerals.
     *
     * @param scope
     */
    function nutritionLabelLink(scope) {
      scope.showMicroNutrients = false;

      /**
       * Update nutrients.
       */
      scope.$watch(function () {
        return scope.nutrients
      }, groupNutrients, true);

      function groupNutrients() {
        scope.mainNutrients = [];
        scope.vitamins = [];
        scope.minerals = [];
        for (var nutrient in scope.nutrients) {
          if (scope.nutrients.hasOwnProperty(nutrient) && nutrient != 'energy') {
            var nutrientInfo = nutrientService.getNutrientInfo(nutrient, scope.nutrients[nutrient] / (scope.servings || 1));
            switch (nutrientInfo.group) {
              case 'Main Nutrients':
                scope.mainNutrients.push(nutrientInfo);
                break;
              case 'Vitamins':
                scope.vitamins.push(nutrientInfo);
                break;
              case 'Minerals':
                scope.minerals.push(nutrientInfo);
                break;
            }
          }
        }
      }
    }
  }
})();
