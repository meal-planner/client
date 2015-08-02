(function () {
  'use strict';

  describe('Factory: RecipeFactory', function () {
    var scope,
      httpBackend,
      recipeFactory,
      ingredientFactory;

    beforeEach(module('mealPlanner'));
    beforeEach(inject(function ($rootScope, $httpBackend, RecipeFactory, IngredientFactory) {
      scope = $rootScope;
      httpBackend = $httpBackend;
      recipeFactory = RecipeFactory;
      ingredientFactory = IngredientFactory;
      httpBackend.when('GET', 'modules/nutrients/data/nutrients.json')
        .respond(200, {energy: 10});
    }));

    it('creates recipe with nutrients from backend API response', function () {
      var apiResponse = {
        id: 'foo_recipe',
        name: 'Foo Recipe',
        time_to_cook: 10,
        ingredients: [],
        cuisine: ['American', 'Mexican'],
        nutrients: {
          energy: 200,
          protein: 25.01,
          carbohydrate: 50.17
        }
      };
      var recipe = recipeFactory.fromJson(apiResponse);
      expect(recipe.name).toEqual('Foo Recipe');
      expect(recipe.cuisine.American).toBeTruthy();
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
      var recipe = recipeFactory.fromJson(apiResponse);
      expect(recipe.nutrients.find('energy').label).toEqual('Calories');
      expect(recipe.nutrients.bad_nutrient).toEqual(undefined);
    });

    it('converts recipe to JSON and sums up nutrients', function () {
      var recipe = recipeFactory.build();
      recipe.name = 'Foo Recipe';
      var ingredientA = ingredientFactory.fromJson({
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
        ingredientB = ingredientFactory.fromJson({
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
      recipe.addIngredient(ingredientA);
      recipe.addIngredient(ingredientB);
      ingredientA.selectedMeasure = 1;
      ingredientA.selectedAmount = 2;
      ingredientA.updateNutritionValues();
      ingredientB.selectedMeasure = 0;
      ingredientB.selectedAmount = 200;
      ingredientB.updateNutritionValues();

      var recipeJson = recipe.toJson();
      expect(recipeJson.ingredients[0].id).toEqual(ingredientA.id);
      expect(recipeJson.ingredients[0].name).toEqual(ingredientA.name);
      expect(recipeJson.ingredients[0].measure).toEqual('cup');
      expect(recipeJson.ingredients[0].measure_amount).toEqual(2);
      expect(recipeJson.nutrients.energy).toEqual(200);// 2 cups (150kcal) + 200g (50kcal)
    });

    it('saves only selected cuisine', function () {
      var recipe = recipeFactory.build();
      recipe.cuisine = {
        American: true,
        British: false
      }

      var recipeJson = recipe.toJson();
      expect(recipeJson.cuisine).toContain('American');
      expect(recipeJson.cuisine).not.toContain('British');
    });
  });

})();
