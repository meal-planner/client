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
  function IngredientsEditController($state,
                                     $stateParams,
                                     $mdToast,
                                     IngredientService,
                                     NutrientFactory,
                                     NutrientCollectionFactory,
                                     ingredient,
                                     nutrients,
                                     foodGroups) {
    var self = this;

    self.foodGroups = foodGroups;
    self.availableNutrients = nutrients;
    self.ingredient = ingredient;
    self.selectedNutrients = {};
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
    return activate();

    function activate() {
      var ingredientId = $stateParams.ingredientId;
      if (ingredientId) {
        self.isEdit = true;
        /**
         * Setup ingredient measures and remove used nutrients from available nutrients list.
         */
        self.ingredient.measures.forEach(function (measure, index) {
          self.ingredient.measures[index].nutrients = NutrientCollectionFactory.fromJson(measure.nutrients);
        });
        /**
         * Add nutrients from first measure to list of selected nutrients.
         * This list is used to build new measures, to pre-set it with all selected nutrients.
         * Also remove selected nutrients from the list of available nutrients.
         */
        self.ingredient.measures[0].nutrients.items.forEach(function (nutrient) {
          self.selectedNutrients[nutrient.code] = 0;
          removeNutrientFromAvailable(nutrient.code);
        });
      } else {
        addNutrient('energy');
        addNutrient('carbohydrate');
        addNutrient('protein');
        addNutrient('fat');
        addMeasure(100, 'g', 100);
      }
    }

    /**
     * Add nutrient to the ingredient.
     *
     * @param {String} code
     */
    function addNutrient(code) {
      var nutrient = NutrientFactory.build(code);
      if (nutrient) {
        self.selectedNutrients[code] = 0;
        self.ingredient.measures.forEach(function (measure) {
          measure.nutrients.push(nutrient);
        });
        removeNutrientFromAvailable(code);
      }
    }

    /**
     * Remove given nutrient from the list of available nutrients.
     * This list is used to build drop-down of nutrients in "Add nutrient" block.
     *
     * @param {String} code
     */
    function removeNutrientFromAvailable(code) {
      var index = -1;
      self.availableNutrients.some(function (availableNutrient, position) {
        if (availableNutrient.code === code) {
          index = position;
          return true;
        }
      });
      if (index !== -1) {
        self.availableNutrients.splice(index, 1);
      }
    }

    /**
     * Add measure to ingredient.
     *
     * @param {Number} qty
     * @param {String} label
     * @param {Number} eqv
     */
    function addMeasure(qty, label, eqv) {
      self.ingredient.measures.push({
        qty: qty || 1,
        label: label,
        eqv: eqv || qty,
        nutrients: NutrientCollectionFactory.fromJson(self.selectedNutrients)
      });
    }

    /**
     * Remove measure from ingredient.
     *
     * @param {Number} index
     */
    function removeMeasure(index) {
      self.ingredient.measures.splice(index, 1);
    }

    /**
     * Persist ingredient in the backend.
     */
    function saveIngredient() {
      self.isLoading = true;

      IngredientService.saveIngredient(self.ingredient.id, self.ingredient.toJson())
        .then(function () {
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
