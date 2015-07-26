(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.controller:IngredientNutrientSelectorController
   * @description
   * # IngredientNutrientSelectorController
   *
   * Controller for nutrient selector on ingredient edit page.
   */
  angular
    .module('mealPlanner.ingredients')
    .controller('IngredientNutrientSelectorController', IngredientNutrientSelectorController);

  /* @ngInject */
  function IngredientNutrientSelectorController($mdDialog, NutrientFactory, NutrientService, ingredient) {
    var self = this;

    self.selectedNutrients = {};
    self.ingredient = ingredient;
    self.addNutrients = addNutrients;
    self.cancelDialog = cancelDialog;

    self.availableNutrients = {};
    NutrientService.getAvailableNutrients().forEach(function (availableNutrient) {
      if (!ingredient.measures[0].nutrients.find(availableNutrient.code)) {
        self.availableNutrients[availableNutrient.code] = availableNutrient.label;
      }
    });

    /**
     * Add selected nutrients to all ingredient measures.
     */
    function addNutrients() {
      for (var nutrientCode in self.selectedNutrients) {
        if (self.selectedNutrients[nutrientCode] === true) {
          addNutrientToMeasures(nutrientCode);
          delete(self.availableNutrients[nutrientCode]);
        }
      }
      $mdDialog.cancel();

      function addNutrientToMeasures(nutrientCode) {
        self.ingredient.measures.forEach(function (measure) {
          var nutrient = NutrientFactory.build(nutrientCode);
          if (nutrient) {
            measure.nutrients.push(nutrient);
          }
        });
      }
    }

    /**
     * Close popup.
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
