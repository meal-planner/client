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
  function IngredientsEditController(
    $state,
    $stateParams,
    $mdToast,
    ingredientService,
    NutrientFactory,
    NutrientCollectionFactory
  ) {
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
    self.availableNutrients = NutrientFactory.getAvailableNutrients();
    self.ingredient = {measures: []};
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
        ingredientService.getIngredient(ingredientId).then(function (ingredient) {
          self.ingredient = ingredient;
          self.ingredient.measures.forEach(function (measure, index) {
            self.ingredient.measures[index].nutrients = NutrientCollectionFactory.fromObject(measure.nutrients);
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
     * @param {string} code
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
     * @param {string} code
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
     * @param {number} qty
     * @param {string} label
     * @param {number} eqv
     */
    function addMeasure(qty, label, eqv) {
      self.ingredient.measures.push({
        qty: qty || 1,
        label: label,
        eqv: eqv || qty,
        nutrients: NutrientCollectionFactory.fromObject(self.selectedNutrients)
      });
    }

    /**
     * Remove measure from ingredient.
     *
     * @param {number} index
     */
    function removeMeasure(index) {
      self.ingredient.measures.splice(index, 1);
    }

    /**
     * Persist ingredient in the backend.
     */
    function saveIngredient() {
      self.isLoading = true;
      self.ingredient.measures.forEach(function (measure, index) {
        self.ingredient.measures[index].nutrients = measure.nutrients.toObject();
      });
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
