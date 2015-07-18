(function () {
  'use strict';

  describe('Factory: RecipeFactory', function () {
    var scope, recipeFactory;

    beforeEach(module('mealPlanner'));
    beforeEach(inject(function ($rootScope, RecipeFactory) {
      scope = $rootScope;
      recipeFactory = RecipeFactory;
    }));

    it('creates recipe with nutrients from backend API response', function () {
      var apiResponse = {
        id: 'foo_recipe',
        name: 'Foo Recipe',
        time_to_cook: 10,
        ingredients: [],
        nutrients: {
          energy: 200,
          protein: 25.01,
          carbohydrate: 50.17
        }
      };
      var recipe = recipeFactory.build(apiResponse);
      expect(recipe.name).toEqual('Foo Recipe');
      expect(recipe.nutrients.find('energy').label).toEqual('Calories');
      expect(recipe.nutrients.find('energy').value).toEqual(200);
      expect(recipe.nutrients.find('protein').value).toEqual(25.01);
      expect(recipe.nutrients.find('carbohydrate').value).toEqual(50.17);
    });

    it('skips unknown nutrients', function () {
      var apiResponse = {
        id: 'foo_recipe',
        name: 'Foo Recipe',
        time_to_cook: 10,
        ingredients: [],
        nutrients: {
          energy: 200,
          bad_nutrient: 50
        }
      };
      var recipe = recipeFactory.build(apiResponse);
      expect(recipe.nutrients.find('energy').label).toEqual('Calories');
      expect(recipe.nutrients.bad_nutrient).toEqual(undefined);
    });
  });

})();
