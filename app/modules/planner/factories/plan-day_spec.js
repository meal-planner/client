(function () {
  'use strict';

  describe('Factory: PlanDayFactory', function () {
    var planDayFactory,
      recipeFactory;

    beforeEach(module('mealPlanner'));
    beforeEach(inject(function (PlanDayFactory, RecipeFactory) {
      planDayFactory = PlanDayFactory;
      recipeFactory = RecipeFactory;
    }));

    describe('adding meal to the plan', function () {
      it('adds nutrients from recipe to the day', function () {
        var day = planDayFactory.build('Monday');
        var recipeA = recipeFactory.build({
          id: 'foo',
          name: 'Foo Recipe',
          nutrients: {
            energy: 100,
            protein: 15,
            fat: 10
          }
        });
        day.addMeal(recipeA, 'Breakfast');

        expect(day.meals.length).toEqual(1);
        expect(day.nutrients.find('energy').value).toEqual(100);

        var recipeB = recipeFactory.build({
          id: 'baz',
          name: 'Baz Recipe',
          nutrients: {
            energy: 200,
            fat: 5,
            carbohydrate: 30
          }
        });
        day.addMeal(recipeB, 'Dinner');

        expect(day.meals.length).toEqual(2);
        expect(day.nutrients.find('energy').value).toEqual(300);
        expect(day.nutrients.find('protein').value).toEqual(15);
        expect(day.nutrients.find('fat').value).toEqual(15);
        expect(day.nutrients.find('carbohydrate').value).toEqual(30);
      });

      it('removes meal from the day', function () {
        var day = planDayFactory.build('Monday');
        var recipeA = recipeFactory.build({
          id: 'foo',
          name: 'Foo Recipe',
          nutrients: {
            energy: 100,
            protein: 15,
            fat: 10
          }
        });
        day.addMeal(recipeA, 'Breakfast');

        expect(day.meals.length).toEqual(1);
        expect(day.nutrients.find('energy').value).toEqual(100);
        var meal = day.meals[0];
        day.removeMeal(meal);
        expect(day.meals.length).toEqual(0);
        expect(day.nutrients.find('energy').value).toEqual(0);
      });
    });
  });
})();
