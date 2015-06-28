(function () {
  'use strict';
  describe('Directive: mp-ingredient-nutrient', function () {
    var elm, scope;

    beforeEach(module('mealPlanner', 'mealPlanner.templates'));
    beforeEach(inject(function ($rootScope, $compile) {
      elm = angular.element('<mp-ingredient-nutrient ingredient="ingredient" nutrient="energy"></mp-ingredient-nutrient>');
      scope = $rootScope.$new();
      $compile(elm)(scope);
    }));

    describe('getting nutrition info', function () {
      var isolated;
      beforeEach(function () {
        scope.ingredient = {
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
      });

      it('gets nutrient value from ingredient', function () {
        scope.$digest();
        isolated = elm.isolateScope();
        // By default first measure chosen
        expect(isolated.nutrientInfo.value).toEqual('25');
        expect(isolated.nutrientInfo.label).toEqual('Calories');
        expect(isolated.nutrientInfo.unit).toEqual('kcal');
        // value is updated when amount is changed
        scope.ingredient.chosenAmount = 200;
        scope.$digest();
        isolated = elm.isolateScope();
        expect(isolated.nutrientInfo.value).toEqual('50');
      });

      it('calculates value when measure is changed', function () {
        // Choose one cup
        scope.ingredient.chosenMeasure = 1;
        scope.ingredient.chosenAmount = 1;
        scope.$digest();
        isolated = elm.isolateScope();
        expect(isolated.nutrientInfo.value).toEqual('75');
        // Choose two cups
        scope.ingredient.chosenAmount = 2;
        scope.$digest();
        isolated = elm.isolateScope();
        expect(isolated.nutrientInfo.value).toEqual('150');
      });

      it('changes chosen amount when measure is changed', function () {
        // Choose 100 g
        scope.ingredient.chosenMeasure = 0
        scope.ingredient.chosenAmount = 100;
        scope.$digest();
        isolated = elm.isolateScope();
        expect(isolated.nutrientInfo.value).toEqual('25');
        // Change measure to 1 cup
        scope.ingredient.chosenMeasure = 1;
        scope.$digest();
        isolated = elm.isolateScope();
        expect(scope.ingredient.chosenAmount).toEqual(1);
        expect(isolated.nutrientInfo.value).toEqual('75');
      });
    });
  });
})();
