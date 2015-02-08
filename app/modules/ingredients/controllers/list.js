'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:IngredientsListController
 * @description
 * # IngredientsListController
 * Controller of the mealPlanner
 */
angular.module('mealPlanner')
  .controller('IngredientsListController', function ($scope) {
    $scope.ingredients = [
      //{
      //  name: 'Chicken breast',
      //  calories: '165',
      //  fat: '4',
      //  protein: '31',
      //  carbohydrate: '0'
      //}
    ];
  });
