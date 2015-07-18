(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.directive:mpIngredientNutrient
   * @description
   * # mpIngredientNutrient
   * Ingredient nutrient directive, used to display single nutrient from the ingredient.
   */
  angular
    .module('mealPlanner.ingredients')
    .directive('mpIngredientNutrient', mpIngredientNutrient);

  /* @ngInject */
  function mpIngredientNutrient() {
    return {
      replace: true,
      link: ingredientNutrientLink,
      templateUrl: 'modules/ingredients/views/directive.nutrient.html',
      scope: {
        ingredient: '=',
        code: '@',
      }
    };

    function ingredientNutrientLink(scope) {
      scope.nutrient = scope.ingredient.nutrients.find(scope.code);
    }
  }
})();
