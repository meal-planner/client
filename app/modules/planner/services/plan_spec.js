'use strict';

describe('Service: PlanService', function () {
  var planService,
    localStorageMock;

  beforeEach(function () {
    module('mealPlanner', function ($provide) {
      localStorageMock = jasmine.createSpyObj('localStorageService', ['get', 'set']);
      $provide.value('localStorageService', localStorageMock);
    });

    inject(function (_planService_) {
      planService = _planService_;
    });
  });

  describe('Adding days to plan', function () {
    it('should add new day to the plan', function () {
      planService.addDayToPlan('Monday');

      expect(planService.days.length).toEqual(1);
      var day = planService.days[0];
      expect(day.name).toEqual('Monday');
      expect(day.meals.length).toEqual(0);
    });

    it('should set unique id for each day in plan', function () {
      planService.addDayToPlan('Monday');
      planService.addDayToPlan('Tuesday');

      expect(planService.days.length).toEqual(2);
      var monday = planService.days[0];
      var tuesday = planService.days[1];
      expect(monday.id).toEqual(jasmine.any(String));
      expect(tuesday.id).toEqual(jasmine.any(String));
      expect(monday.id).not.toEqual(tuesday.id);
    });
  });

  describe('Managing meals in plan', function () {
    var recipeA = {
        name: 'Meal A',
        nutrients: {
          energy: 100,
          fat: 50,
          protein: 25,
          carbohydrate: 100
        }
      },
      recipeB = {
        name: 'Meal B',
        nutrients: {
          energy: 200,
          fat: 25,
          protein: 25,
          carbohydrate: 150
        }
      };

    it('should sum up nutrients when adding a meal', function () {
      planService.addDayToPlan('Monday');
      var monday = planService.days[0];
      planService.addMealToPlanDay(monday, recipeA);
      planService.addMealToPlanDay(monday, recipeB);

      expect(planService.getDayNutrients(monday).energy).toEqual(300);
      expect(planService.getPlanNutrients().energy).toEqual(300);

      planService.addDayToPlan('Tuesday');
      var tuesday = planService.days[1];
      planService.addMealToPlanDay(tuesday, recipeA);
      expect(planService.getDayNutrients(tuesday).energy).toEqual(100);
      expect(planService.getPlanNutrients().energy).toEqual(400);
    });

    it('should deduct nutrients when removing a meal', function () {
      planService.addDayToPlan('Monday');
      var monday = planService.days[0];
      planService.addMealToPlanDay(monday, recipeA);
      planService.addMealToPlanDay(monday, recipeB);
      expect(planService.getDayNutrients(monday).energy).toEqual(300);
      planService.addDayToPlan('Tuesday');
      var tuesday = planService.days[1];
      planService.addMealToPlanDay(tuesday, recipeA);

      var mondayMeal = monday.meals[0];
      planService.removeMealFromPlan(mondayMeal);
      expect(planService.getDayNutrients(monday).energy).toEqual(200);
      expect(planService.getDayNutrients(tuesday).energy).toEqual(100);
      var tuesdayMeal = tuesday.meals[0];
      planService.removeMealFromPlan(tuesdayMeal);
      expect(planService.getDayNutrients(monday).energy).toEqual(200);
      expect(tuesday.meals.length).toEqual(0);
    });
  });
});
