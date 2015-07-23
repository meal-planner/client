(function () {
  'use strict';

  describe('Factory: PlanFactory', function () {
    var planFactory,
      planDayFactory,
      recipeFactory;

    beforeEach(module('mealPlanner'));
    beforeEach(inject(function (PlanFactory, PlanDayFactory, RecipeFactory) {
      planFactory = PlanFactory;
      planDayFactory = PlanDayFactory;
      recipeFactory = RecipeFactory;
    }));

    describe('adding day to the plan', function () {
      it('creates a plan with all weeks days', function () {
        var plan = planFactory.build();

        expect(plan.days.length).toEqual(7);
      });

      it('sums up nutrients from all days', function () {
        var plan = planFactory.build();
        var monday = plan.days[0];
        var tuesday = plan.days[1];

        var recipeA = recipeFactory.fromJson({
          id: 'foo_recipe',
          name: 'Foo Recipe',
          time_to_cook: 10,
          ingredients: [],
          nutrients: {
            energy: 200,
            protein: 25,
            carbohydrate: 50
          }
        });
        var recipeB = recipeFactory.fromJson({
          id: 'bar_recipe',
          name: 'Bar Recipe',
          time_to_cook: 10,
          ingredients: [],
          nutrients: {
            energy: 100,
            protein: 5,
            fat: 10
          }
        });
        monday.addMeal(recipeA, 'Breakfast');
        tuesday.addMeal(recipeB, 'Lunch');
        plan.updateNutritionValues();

        expect(plan.nutrients.items.length).toEqual(4);
        expect(plan.nutrients.find('energy').value).toEqual(300);
        expect(plan.nutrients.find('protein').value).toEqual(30);
        expect(plan.nutrients.find('carbohydrate').value).toEqual(50);
        expect(plan.nutrients.find('fat').value).toEqual(10);
      });

      describe('serializing and de-serializing plan', function () {
        it('converts plan to plain object', function () {
          var plan = planFactory.build();
          var monday = plan.days[0];
          var tuesday = plan.days[1];
          var recipeA = recipeFactory.fromJson({
            id: 'foo_recipe',
            name: 'Foo Recipe',
            time_to_cook: 10,
            ingredients: [],
            nutrients: {
              energy: 200,
              protein: 25,
              carbohydrate: 50
            }
          });
          var recipeB = recipeFactory.fromJson({
            id: 'bar_recipe',
            name: 'Bar Recipe',
            time_to_cook: 10,
            ingredients: [],
            nutrients: {
              energy: 100,
              protein: 5,
              fat: 10
            }
          });
          monday.addMeal(recipeA, 'Breakfast');
          tuesday.addMeal(recipeB, 'Lunch');
          var json = plan.toJson();

          expect(json.name).toEqual('default');
          var mondayObject = json.days[0];
          expect(mondayObject.name).toEqual(monday.name);
          expect(mondayObject.meals.length).toEqual(1);
          var mondayObjectMeal = mondayObject.meals[0];
          expect(mondayObjectMeal.name).toEqual('Foo Recipe');
          expect(mondayObjectMeal.nutrients.energy).toEqual(200);
        });

        it('creates a plan from JSON', function () {
          var json = {
            name: 'Stored Plan',
            days: [
              {
                name: 'Monday',
                meals: [
                  {
                    name: 'Foo Meal',
                    type: 'Breakfast',
                    nutrients: {
                      energy: 200,
                      protein: 30,
                      fat: 10
                    },
                    servings: 2
                  },
                  {
                    name: 'Bar Meal',
                    type: 'Lunch',
                    nutrients: {
                      energy: 100,
                      protein: 10,
                    },
                    servings: 1
                  }
                ]
              },
              {
                name: 'Tuesday',
                meals: [
                  {
                    name: 'Baz Meal',
                    type: 'Dinner',
                    nutrients: {
                      energy: 150,
                      protein: 5
                    },
                    servings: 1
                  }
                ]
              }
            ]
          };

          var plan = planFactory.fromJson(json);

          expect(plan.name).toEqual('Stored Plan');

          var monday = plan.days[0];
          expect(monday.name).toEqual('Monday');
          expect(monday.meals.length).toEqual(2);
          expect(monday.meals[0].nutrients.find('energy').value).toEqual(200);
          expect(monday.meals[1].nutrients.find('energy').value).toEqual(100);
          expect(monday.nutrients.find('energy').value).toEqual(300);

          plan.updateNutritionValues();
          expect(plan.nutrients.find('energy').value).toEqual(450);
        });
      });
    });
  });
})();
