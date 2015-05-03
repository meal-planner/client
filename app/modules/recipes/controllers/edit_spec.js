'use strict';

describe('Controller: RecipeEditController', function () {
  beforeEach(module('mealPlanner'));

  var ctrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope, $filter) {
    scope = $rootScope.$new();

    ctrl = $controller('RecipeEditController', {
      $scope: scope,
      $mdToast: {},
      $mdDialog: {},
      $filter: $filter,
      recipeService: {},
      ingredientService: {}
    });
  }));

  describe('adding ingredient to list', function () {
    it('resets the search input text', function () {
      ctrl.searchText = 'foo query';
      ctrl.addIngredient();
      expect(ctrl.searchText).toEqual('');
    });

    it('ignores undefined', function () {
      ctrl.addIngredient();
      expect(ctrl.recipe.ingredients.length).toEqual(0);
    });

    it('ignores empty ingredient if added', function () {
      ctrl.addIngredient({});
      expect(ctrl.recipe.ingredients.length).toEqual(0);

      ctrl.addIngredient({id: 'foo'});
      expect(ctrl.recipe.ingredients.length).toEqual(1);
    });

    it('adds ingredient with same id only once', function () {
      ctrl.addIngredient({id: 'baz', prop: 1});
      ctrl.addIngredient({id: 'bar', prop: 1});
      ctrl.addIngredient({id: 'baz', prop: 2});
      expect(ctrl.recipe.ingredients.length).toEqual(2);
    });
  });

  describe('getting nutrition info', function () {
    var ingredient;
    beforeEach(function () {
      ingredient = {
        id: 'foo',
        nutrients: {
          energy: {
            unit: 'kcal',
            measures: [
              {
                label: 'g',
                eqv: 100,
                qty: 100,
                value: 25
              },
              {
                label: 'cup',
                eqv: 300,
                qty: 1,
                value: 75
              }
            ]
          }
        }
      };
      ctrl.addIngredient(ingredient);
    });

    it('gets nutrient value from ingredient', function () {
      // By default first measure chosen
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('25 kcal');
      // When chosen amount is changed
      ingredient.chosenAmount = 200;
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('50 kcal');
      // When measure is change
      ingredient.chosenMeasure = 1;
      ingredient.chosenAmount = 1;
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('75 kcal');
      ingredient.chosenAmount = 2;
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('150 kcal');
    });

    it('returns value with requested precision', function () {
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('25 kcal');
      expect(ctrl.getNutrientInfo(ingredient, 'energy', 0)).toEqual('25 kcal');
      expect(ctrl.getNutrientInfo(ingredient, 'energy', 1)).toEqual('25.0 kcal');
      expect(ctrl.getNutrientInfo(ingredient, 'energy', 2)).toEqual('25.00 kcal');
    });
  });

});
