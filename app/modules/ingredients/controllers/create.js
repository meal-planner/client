'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:IngredientsCreateController
 * @description
 * # IngredientsCreateController
 * Controller of the mealPlanner
 */
angular.module('mealPlanner')
  .controller('IngredientsCreateController', function ($scope, Ingredient) {
    $scope.createIngredient = function () {
      Ingredient.save($scope.ingredient, function (data) {
        console.log(data);
      });
    };
  });
