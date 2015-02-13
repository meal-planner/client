'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:IngredientsCreateController
 * @description
 * # IngredientsCreateController
 * Controller of the mealPlanner
 */
angular.module('mealPlanner')
  .controller('IngredientsCreateController', function ($scope, $mdToast, Ingredient) {
    $scope.createIngredient = function () {
      $scope.showProgress = true;
      Ingredient.save($scope.ingredient, function () {
        $scope.go('ingredientsList', 'slide-up');
        $mdToast.show({
          parent: angular.element(document.getElementById('content-view')),
          template: '<md-toast>Ingredient was created!</md-toast>',
          position: 'top left',
          hideDelay: 3000
        });
      });
    };
  });
