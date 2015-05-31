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
function PlannerController($mdDialog) {
  var self = this;

  self.daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  self.plannedDays = [];
  self.addNextDay = addNextDay;
  self.showMealSelector = showMealSelector;

  return initialize();

  function initialize() {
    addNextDay();
  }

  function addNextDay() {
    var day = {
      name: self.daysOfWeek.shift(),
      recipes: []
    };
    self.plannedDays.push(day);
  }

  function showMealSelector(event, day) {
    $mdDialog.show({
      controller: 'MealSelectorController',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'modules/planner/views/meal_selector.html',
      targetEvent: event
    }).then(function (recipe) {
      day.recipes.push(recipe);
    });
  }
}
