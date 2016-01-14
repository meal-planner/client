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
                                NavigationService,
                                RecipeService,
                                recipe,
                                groups) {
    var self = this;

    if (recipe.id) {
      NavigationService.navigationBar.title = recipe.name;
    }
    self.recipe = recipe;
    self.dishTypes = groups.dishTypes;
    self.cuisines = groups.cuisines;
    self.keyIngredients = groups.keyIngredients;
    self.diets = groups.diets;
    self.image = {src: ''};
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
        self.saveButtonDisabled = true;
        NavigationService.navigationBar.isLoading = true;
        RecipeService.saveRecipe(self.recipe.id, self.recipe.toJson())
          .then(function (response) {
            $state.go('viewRecipe', {recipeId: response.id});
            $mdToast.show({
              template: '<md-toast>Recipe was saved!</md-toast>',
              position: 'bottom left',
              hideDelay: 3000
            });
          }, function (response) {
            self.saveButtonDisabled = false;
            NavigationService.handleError(response.data.error);
          });
      }
    }
  }
})();
