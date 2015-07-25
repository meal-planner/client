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
  function RecipeEditController(
    $state,
    $mdToast,
    $mdDialog,
    $stateParams,
    RecipeService,
    IngredientService,
    recipe,
    dishTypes,
    cuisines,
    keyIngredients,
    diets
  ) {
    var self = this;

    self.isLoading = false;
    self.isEdit = false;
    self.selectedItem = null;
    self.searchText = null;
    self.recipe = recipe;
    self.dishTypes = dishTypes;
    self.cuisines = cuisines;
    self.keyIngredients = keyIngredients;
    self.diets = diets;

    self.querySearch = querySearch;
    self.saveRecipe = saveRecipe;
    self.addIngredient = addIngredient;
    self.removeIngredient = removeIngredient;
    self.addCookingStep = addCookingStep;
    self.removeCookingStep = removeCookingStep;

    /**
     * Set initial state.
     * If recipe id is given in request - load the recipe and populate the form.
     */
    return activate();

    function activate() {
      var recipeId = $stateParams.recipeId;
      if (recipeId) {
        self.isEdit = true;
        recipe.loadIngredients();
      }
    }

    /**
     * Perform ingredients search.
     *
     * @returns [{Ingredient}]
     */
    function querySearch() {
      return IngredientService.searchIngredients(self.searchText);
    }

    /**
     * Add ingredient to the recipe.
     *
     * @param {Ingredient} ingredient
     */
    function addIngredient(ingredient) {
      self.searchText = '';
      self.recipe.addIngredient(ingredient);
    }

    /**
     * Remove ingredient from the recipe by index.
     *
     * @param ingredientIndex
     */
    function removeIngredient(ingredientIndex) {
      self.recipe.ingredients.splice(ingredientIndex, 1);
    }

    /**
     * Add new cooking step to the recipe.
     */
    function addCookingStep() {
      self.recipe.steps.push('');
    }

    /**
     * Remove cooking step from the recipe by index.
     * @param stepIndex
     */
    function removeCookingStep(stepIndex) {
      self.recipe.steps.splice(stepIndex, 1);
    }

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
