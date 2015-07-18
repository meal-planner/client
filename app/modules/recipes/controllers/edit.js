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
    recipeService,
    ingredientService,
    NutrientCollectionFactory
  ) {
    var self = this;

    self.isLoading = false;
    self.isEdit = false;
    self.selectedItem = null;
    self.searchText = null;
    self.recipe = {steps: ['']};
    self.ingredients = [];

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
        recipeService.getRecipe(recipeId).then(function (apiResponse) {
          self.recipe = apiResponse;
          apiResponse.ingredients.forEach(loadIngredient);
        });
      }
    }

    /**
     * Load ingredient from backend and set selected measure/amount according to recipe.
     *
     * @param recipeIngredient
     */
    function loadIngredient(recipeIngredient) {
      ingredientService.getIngredient(recipeIngredient.id).then(function (ingredient) {
        var selectedMeasure = 0;
        ingredient.measures.some(function (measure, index) {
          if (measure.label == recipeIngredient.measure) {
            selectedMeasure = index;
            return true;
          }
        });
        ingredient.selectedMeasure = selectedMeasure;
        ingredient.selectedAmount = recipeIngredient.measure_amount;
        ingredient.updateNutritionValues();
        self.ingredients.push(ingredient);
      });
    }

    /**
     * Perform ingredients search.
     *
     * @returns [{Ingredient}]
     */
    function querySearch() {
      return ingredientService.searchIngredients(self.searchText);
    }

    /**
     * Add ingredient to the recipe.
     * Validate and check if this ingredient is not already in the recipe.
     *
     * @param {Ingredient} ingredient
     */
    function addIngredient(ingredient) {
      self.searchText = '';
      if (valid() && unique()) {
        self.ingredients.push(ingredient);
      }

      function valid() {
        return ingredient != undefined && ingredient.id != undefined;
      }

      function unique() {
        var result = true;
        self.ingredients.forEach(function (existing) {
          if (existing.id == ingredient.id) {
            result = false;
          }
        });

        return result;
      }
    }

    /**
     * Remove ingredient from the recipe by index.
     *
     * @param ingredientIndex
     */
    function removeIngredient(ingredientIndex) {
      self.ingredients.splice(ingredientIndex, 1);
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
     *
     * @returns {boolean}
     */
    function saveRecipe() {
      if (self.ingredients.length == 0) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('No ingredients')
            .content('Please, add at least one ingredient to this recipe.')
            .ariaLabel('No ingredients alert')
            .ok('OK')
        );
        return false;
      }

      self.isLoading = true;
      convertIngredients();
      recipeService.saveRecipe(self.recipe.id, self.recipe).then(function () {
        $state.go('recipesList');
        $mdToast.show({
          template: '<md-toast>Recipe was saved!</md-toast>',
          position: 'bottom left',
          hideDelay: 3000
        });
      });

      /**
       * Convert ingredients for recipe storage:
       * - store selected measure label and amount
       * - sum up all nutrients from all ingredients
       */
      function convertIngredients() {
        self.recipe.ingredients = [];
        var nutrients = NutrientCollectionFactory.build();
        self.ingredients.forEach(function (ingredient) {
          nutrients.sum(ingredient.nutrients);
          var recipeIngredient = {
            id: ingredient.id,
            name: ingredient.name,
            group: ingredient.group,
            measure: ingredient.measures[ingredient.selectedMeasure].label,
            measure_amount: ingredient.selectedAmount
          };
          self.recipe.ingredients.push(recipeIngredient);
        });
        self.recipe.nutrients = nutrients.toObject();
      }
    }
  }
})();
