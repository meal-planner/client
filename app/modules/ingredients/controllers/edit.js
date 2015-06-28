(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.controller:IngredientsEditController
   * @description
   * # IngredientsEditController
   * Controller of the mealPlanner
   */
  angular
    .module('mealPlanner.ingredients')
    .controller('IngredientsEditController', IngredientsEditController);

  /* @ngInject */
  function IngredientsEditController($state, $stateParams, $mdToast, $filter, ingredientService, nutrientService) {
    var self = this;

    self.foodGroups = [
      'Meat',
      'Poultry',
      'Fish',
      'Dairy & Eggs',
      'Grains',
      'Vegetables',
      'Fruits',
      'Legumes',
      'Beverages'
    ];
    self.availableNutrients = nutrientService.nutrients;
    self.ingredient = {nutrients: {}};
    self.isLoading = false;
    self.isEdit = false;
    self.isNutrientSelectorShown = false;
    self.selectedNutrient = null;

    self.addMeasure = addMeasure;
    self.addNutrient = addNutrient;
    self.removeMeasure = removeMeasure;
    self.saveIngredient = saveIngredient;

    /**
     * Set initial state.
     * If ingredient id is provided in request - load it and populate the form.
     * Otherwise add default measure and nutrients.
     */
    return initialize();

    function initialize() {
      var ingredientId = $stateParams.ingredientId;
      if (ingredientId) {
        self.isEdit = true;
        ingredientService.getIngredient(ingredientId).then(function (apiResponse) {
          self.ingredient = apiResponse;
          for (var nutrient in apiResponse.nutrients) {
            if (apiResponse.nutrients.hasOwnProperty(nutrient)) {
              addNutrient(nutrient);
            }
          }
        });
      } else {
        addNutrient('energy');
        addNutrient('carbohydrate');
        addNutrient('protein');
        addNutrient('fat');
        addMeasure(100, 'g');
      }
    }

    /**
     * Add nutrient to the ingredient.
     *
     * @param code
     */
    function addNutrient(code) {
      if (code != undefined) {
        var nutrient = $filter('filter')(self.availableNutrients, {code: code})[0];
        if (nutrient) {
          var index = self.availableNutrients.indexOf(nutrient);
          if (index != -1) {
            self.availableNutrients.splice(index, 1);
          }
          nutrient.measures = [];
          if (self.ingredient.nutrients[code]) {
            self.ingredient.nutrients[code].label = nutrient['label'];
          } else {
            self.ingredient.nutrients[code] = nutrient;
          }
        }
      }
    }

    /**
     * Add measure to ingredient.
     *
     * @param qty
     * @param label
     * @param eqv
     */
    function addMeasure(qty, label, eqv) {
      var nutrients = self.ingredient.nutrients;
      for (var nutrient in nutrients) {
        if (nutrients.hasOwnProperty(nutrient)) {
          nutrients[nutrient].measures.push({qty: qty || 1, label: label, eqv: eqv});
        }
      }
    }

    /**
     * Remove measure from ingredient.
     *
     * @param index
     */
    function removeMeasure(index) {
      var nutrients = self.ingredient.nutrients;
      for (var nutrient in nutrients) {
        if (nutrients.hasOwnProperty(nutrient)) {
          nutrients[nutrient].measures.splice(index, 1);
        }
      }
    }

    /**
     * Persist ingredient in the backend.
     */
    function saveIngredient() {
      self.isLoading = true;
      ingredientService.saveIngredient(self.ingredient.id, self.ingredient).then(function () {
        $state.go('ingredientsList');
        $mdToast.show({
          template: '<md-toast>Ingredient was saved!</md-toast>',
          position: 'bottom left',
          hideDelay: 3000
        });
      });
    }
  }
})();
