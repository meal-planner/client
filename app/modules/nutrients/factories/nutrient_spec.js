(function () {
  'use strict';

  describe('Factory: NutrientFactory', function () {
    var nutrientFactory;

    beforeEach(module('mealPlanner'));
    beforeEach(inject(function (NutrientFactory) {
      nutrientFactory = NutrientFactory;
    }));

    it('creates nutrient with default value equal to 0', function () {
      var energy = nutrientFactory.build('energy');
      expect(energy.value).toEqual(0);
    });

    it('formats value with given precision', function () {
      var fat = nutrientFactory.build('fat', 10.33, 2);
      expect(fat.formattedValue).toEqual('10.33');
    });

    it('formats value with default configured precision', function () {
      var fat = nutrientFactory.build('fat', 10.33);
      expect(fat.formattedValue).toEqual('10.3');
    });

    it('calculates daily value with default reference numbers', function () {
      var energy = nutrientFactory.build('energy', 1000);
      expect(energy.dailyValue).toEqual('50');
    });

    it('creates nutrient model with valid code', function () {
      var energy = nutrientFactory.build('energy', 100);
      expect(energy.label).toEqual('Calories');
      expect(energy.unit).toEqual('kcal');
    });

    it('returns false when building with invalid code', function () {
      var bad_nutrient = nutrientFactory.build('foo_nutrient', 10);
      expect(bad_nutrient).toBeFalsy();
    })

    it('check if nutrient code is valid', function () {
      expect(nutrientFactory.isValidCode('energy')).toBeTruthy();
      expect(nutrientFactory.isValidCode('bad_nutrient')).toBeFalsy();
    });
  });
})();
