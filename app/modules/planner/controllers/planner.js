'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:PlannerController
 * @description
 * # PlannerController
 * Planner controller
 */
angular.module('mealPlanner')
  .controller('PlannerController', PlannerController);

/* @ngInject */
function PlannerController($mdDialog, localStorageService) {
  var self = this;

  self.mealTypes = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack'
  ];
  self.unplannedDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  self.plannedDays = [];
  self.chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    segmentShowStroke: true,
    segmentStrokeColor: '#fff',
    segmentStrokeWidth: 2,
    percentageInnerCutout: 60,
    animateRotate: false,
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%"
  };

  self.planNextDay = planNextDay;
  self.showMealSelector = showMealSelector;
  self.addRecipeToDayPlan = addRecipeToDayPlan;
  self.removeRecipeFromDayPlan = removeRecipeFromDayPlan;

  return initialize();

  function initialize() {
    var plannedDays = localStorageService.get('planned_days');
    if (plannedDays) {
      self.plannedDays = plannedDays;
      self.unplannedDays.splice(0, plannedDays.length);
    } else {
      planNextDay();
    }
  }

  function planNextDay() {
    var day = {
      name: self.unplannedDays.shift(),
      recipes: []
    };
    self.plannedDays.push(day);
  }

  function showMealSelector(event, day) {
    $mdDialog.show({
      controller: 'MealSelectorController',
      controllerAs: 'ctrl',
      bindToController: true,
      locals: {mealTypes: self.mealTypes},
      templateUrl: 'modules/planner/views/meal_selector.html',
      targetEvent: event
    }).then(function (recipe) {
      addRecipeToDayPlan(day, recipe);
    });
  }

  function addRecipeToDayPlan(day, recipe) {
    day.recipes.push(recipe);
    calculateDailyMacros(day);
    savePlanInLocalStorage();
  }

  function removeRecipeFromDayPlan(day, mealType, recipeId) {
    var recipePosition = null;
    day.recipes.forEach(function (recipe, index) {
      if (recipe.id == recipeId && recipe.mealType == mealType) {
        return recipePosition = index;
      }
    });

    if (recipePosition !== null) {
      day.recipes.splice(recipePosition, 1);
      calculateDailyMacros(day);
      savePlanInLocalStorage();
    }
  }

  function calculateDailyMacros(day) {
    day.totalCalories = 0;
    day.totalProtein = 0;
    day.totalFat = 0;
    day.totalCarbs = 0;
    day.recipes.forEach(function (recipe) {
      var servings = recipe.servings || 1;
      day.totalCalories += recipe.nutrients.energy / servings;
      day.totalProtein += recipe.nutrients.protein / servings;
      day.totalCarbs += recipe.nutrients.carbohydrate / servings;
      day.totalFat += recipe.nutrients.fat / servings;
    });
    var energyFromFat = Math.round(day.totalFat * 9 / day.totalCalories * 100);
    var energyFromProtein = Math.round(day.totalProtein * 4 / day.totalCalories * 100);
    var energyFromCarbs = 100 - energyFromFat - energyFromProtein;
    day.chartData = [
      {label: "Protein", value: energyFromProtein, color: "#1E88E5"},
      {label: "Carbs", value: energyFromCarbs, color: "#FB8C00"},
      {label: "Fat", value: energyFromFat, color: "#43A047"}
    ];
  }

  function savePlanInLocalStorage() {
    localStorageService.set('planned_days', self.plannedDays);
  }
}
