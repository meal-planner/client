'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:NutritionLabelController
 * @description
 * # NutritionLabelController
 * Controller for nutrition label directive
 */
angular.module('mealPlanner')
  .controller('NutritionLabelController', NutritionLabelController);

/* @ngInject */
function NutritionLabelController(nutrientService) {
  var self = this;
  self.mainNutrients = [];
  self.vitamins = [];
  self.minerals = [];

  return initialize();

  function initialize() {
    for (var nutrient in self.nutrients) {
      if (self.nutrients.hasOwnProperty(nutrient)) {
        var nutrientInfo = nutrientService.getNutrientInfo(nutrient, self.nutrients[nutrient] / self.servings);
        switch (nutrientInfo.group) {
          case 'Main Nutrients':
            self.mainNutrients.push(nutrientInfo);
            break;
          case 'Vitamins':
            self.vitamins.push(nutrientInfo);
            break;
          case 'Minerals':
            self.minerals.push(nutrientInfo);
            break;
        }
      }
    }
  }
}
