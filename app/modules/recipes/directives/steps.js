(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.directive:mpRecipeSteps
   * @description
   * # mpRecipeSteps
   * Recipe steps directive.
   */
  angular
    .module('mealPlanner.recipes')
    .directive('mpRecipeSteps', mpRecipeSteps);

  /* @ngInject */
  function mpRecipeSteps() {
    return {
      templateUrl: 'modules/recipes/views/directive.recipe-steps.html',
      link: recipeStepsLink,
      scope: {
        recipe: '='
      }
    };

    function recipeStepsLink(scope) {
      scope.addCookingStep = addCookingStep;
      scope.removeCookingStep = removeCookingStep;

      /**
       * Add new cooking step to the recipe.
       */
      function addCookingStep() {
        scope.recipe.steps.push('');
      }

      /**
       * Remove cooking step from the recipe by index.
       * @param stepIndex
       */
      function removeCookingStep(stepIndex) {
        scope.recipe.steps.splice(stepIndex, 1);
      }
    }
  }
})();
