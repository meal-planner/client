(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.controller:RecipeEditController
   * @description
   * # RecipeEditController
   * Create recipe controller
   */
  angular
    .module('mealPlanner.recipes')
    .controller('RecipeEditController', RecipeEditController);

  /* @ngInject */
  function RecipeEditController($state,
                                $mdToast,
                                $mdDialog,
                                RecipeService,
                                recipe,
                                dishTypes,
                                cuisines,
                                keyIngredients,
                                diets) {
    var self = this;

    self.recipe = recipe;
    self.isEdit = self.recipe.id !== undefined;
    self.dishTypes = dishTypes;
    self.cuisines = cuisines;
    self.keyIngredients = keyIngredients;
    self.diets = diets;
    self.saveRecipe = saveRecipe;

    /**
     * Persist recipe in the backend.
     */
    function saveRecipe() {
      if (self.recipe.ingredients.length === 0) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('No ingredients')
            .content('Please, add at least one ingredient to this recipe.')
            .ariaLabel('No ingredients alert')
            .ok('OK')
        );
      } else {
        self.isLoading = true;
        RecipeService.saveRecipe(self.recipe.id, self.recipe.toJson()).then(function () {
          $state.go('recipesGroups');
          $mdToast.show({
            template: '<md-toast>Recipe was saved!</md-toast>',
            position: 'bottom left',
            hideDelay: 3000
          });
        });
      }
    }
  }
})();
