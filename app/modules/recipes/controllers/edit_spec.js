(function () {
  'use strict';

  describe('Controller: RecipeEditController', function () {
    var ctrl,
      scope,
      deferred,
      ingredientFactory;

    beforeEach(module('mealPlanner', 'mealPlanner.templates'));
    beforeEach(inject(function ($controller, $rootScope, $q, IngredientFactory) {
      scope = $rootScope;
      deferred = $q.defer();
      ingredientFactory = IngredientFactory;

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

    describe('saving recipe', function () {
      it('converts ingredients to recipe format', function () {
        var ingredientA = ingredientFactory.build({
            id: 'foo_a',
            name: 'baz',
            measures: [
              {
                label: 'g',
                eqv: 100,
                qty: 100,
                nutrients: {
                  energy: 25
                }
              },
              {
                label: 'cup',
                eqv: 300,
                qty: 1,
                nutrients: {
                  energy: 75
                }
              }
            ]
          }),
          ingredientB = ingredientFactory.build({
            id: 'foo_b',
            name: 'bar',
            measures: [
              {
                label: 'g',
                eqv: 100,
                qty: 100,
                nutrients: {
                  energy: 25
                }
              }
            ]
          });
        ctrl.addIngredient(ingredientA);
        ctrl.addIngredient(ingredientB);
        ingredientA.selectedMeasure = 1;
        ingredientA.selectedAmount = 2;
        ingredientA.updateNutritionValues();
        ingredientB.selectedMeasure = 0;
        ingredientB.selectedAmount = 200;
        ingredientB.updateNutritionValues();
        ctrl.saveRecipe();

        expect(ctrl.recipe.ingredients[0].id).toEqual(ingredientA.id);
        expect(ctrl.recipe.ingredients[0].name).toEqual(ingredientA.name);
        expect(ctrl.recipe.ingredients[0].measure).toEqual('cup');
        expect(ctrl.recipe.ingredients[0].measure_amount).toEqual(2);
        expect(ctrl.recipe.nutrients.energy).toEqual(200);// 2 cups (150kcal) + 200g (50kcal)
      });
    });
  });
})();
