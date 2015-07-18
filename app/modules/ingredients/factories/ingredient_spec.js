(function () {
  'use strict';

  describe('Factory: IngredientFactory', function () {
    var ingredientFactory;

    beforeEach(module('mealPlanner', 'mealPlanner.templates'));
    beforeEach(inject(function (IngredientFactory) {
      ingredientFactory = IngredientFactory;
    }));

    it('builds model from backend response', function () {
      var apiResponse = {
        id: 'foo_id',
        name: 'Foo Ingredient',
        group: 'Fruits',
        measures: [
          {
            label: 'g',
            eqv: 100,
            qty: 100,
            nutrients: {
              energy: 300,
              protein: 25,
              carbohydrate: 25,
              fat: 10
            }
          },
          {
            label: 'cup',
            eqv: 300,
            qty: 1,
            nutrients: {
              energy: 900,
              protein: 75,
              carbohydrate: 75,
              fat: 30
            }
          }
        ]
      };

      var ingredient = ingredientFactory.build(apiResponse);

      expect(ingredient.name).toEqual('Foo Ingredient');
      expect(ingredient.group).toEqual('Fruits');
      expect(ingredient.selectedAmount).toEqual(100);
      expect(ingredient.nutrients.find('energy').value).toEqual(300);
      ingredient.selectedMeasure = 1;
      ingredient.selectedAmount = 1;
      ingredient.updateNutritionValues();
      expect(ingredient.nutrients.find('energy').value).toEqual(900);
      ingredient.selectedAmount = 2;
      ingredient.updateNutritionValues();
      expect(ingredient.nutrients.find('energy').value).toEqual(1800);
    });

    it('skips unknown nutrients', function () {
      var apiResponse = {
        id: 'foo_id',
        name: 'Foo Ingredient',
        group: 'Fruits',
        measures: [
          {
            label: 'g',
            eqv: 100,
            qty: 100,
            nutrients: {
              energy: 300,
              bad_nutrient: 10
            }
          }
        ]
      };

      var ingredient = ingredientFactory.build(apiResponse);
      expect(ingredient.nutrients.bad_nutrient).toEqual(undefined);
    });
  });
})();
