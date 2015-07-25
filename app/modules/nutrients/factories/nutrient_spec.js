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

    it('creates nutrient model with valid code', function () {
      var energy = nutrientFactory.build('energy', 100);
      expect(energy.label).toEqual('Calories');
      expect(energy.unit).toEqual('kcal');
    });

    it('returns false when building with invalid code', function () {
      var bad_nutrient = nutrientFactory.build('foo_nutrient', 10);
      expect(bad_nutrient).toBeFalsy();
    });
  });
})();
