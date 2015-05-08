'use strict';

describe('Controller: RecipeEditController', function () {
  beforeEach(module('mealPlanner'));

  var ctrl,
    scope,
    deferred;

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    deferred = $q.defer();

    var recipeServiceMock = {
      saveRecipe: function () {
        return deferred.promise;
      }
    };

    ctrl = $controller('RecipeEditController', {
      $scope: scope,
      $mdToast: {},
      $mdDialog: {},
      $stateParams: {},
      recipeService: recipeServiceMock,
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
      expect(ctrl.ingredients.length).toEqual(0);
    });

    it('ignores empty ingredient if added', function () {
      ctrl.addIngredient({});
      expect(ctrl.ingredients.length).toEqual(0);

      ctrl.addIngredient({id: 'foo'});
      expect(ctrl.ingredients.length).toEqual(1);
    });

    it('adds ingredient with same id only once', function () {
      ctrl.addIngredient({id: 'baz', prop: 1});
      ctrl.addIngredient({id: 'bar', prop: 1});
      ctrl.addIngredient({id: 'baz', prop: 2});
      expect(ctrl.ingredients.length).toEqual(2);
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
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('Energy: 25 kcal');
      // When chosen amount is changed
      ingredient.chosenAmount = 200;
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('Energy: 50 kcal');
      // When measure is change
      ingredient.chosenMeasure = 1;
      ingredient.chosenAmount = 1;
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('Energy: 75 kcal');
      ingredient.chosenAmount = 2;
      expect(ctrl.getNutrientInfo(ingredient, 'energy')).toEqual('Energy: 150 kcal');
    });

  });

  describe('saving recipe', function () {
    it('converts ingredients to recipe format', function () {
      var ingredientA = {
        id: 'foo_a',
        name: 'baz',
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
      },
      ingredientB = {
        id: 'foo_b',
        name: 'bar',
        nutrients: {
          energy: {
            unit: 'kcal',
            measures: [
              {
                label: 'g',
                eqv: 100,
                qty: 100,
                value: 25
              }
            ]
          }
        }
      };
      ctrl.addIngredient(ingredientA);
      ctrl.addIngredient(ingredientB);
      ingredientA.chosenMeasure = 1;
      ingredientA.chosenAmount = 2;
      ingredientB.chosenMeasure = 0;
      ingredientB.chosenAmount = 200;

      ctrl.saveRecipe();

      expect(ctrl.recipe.ingredients[0].id).toEqual(ingredientA.id);
      expect(ctrl.recipe.ingredients[0].name).toEqual(ingredientA.name);
      expect(ctrl.recipe.ingredients[0].measure).toEqual('cup');
      expect(ctrl.recipe.ingredients[0].measure_amount).toEqual(2);
      expect(ctrl.recipe.nutrients.energy).toEqual(200);// 2 cups (150kcal) + 200g (50kcal)
    });
  });

});
