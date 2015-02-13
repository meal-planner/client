'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:IngredientsCreateController
 * @description
 * # IngredientsCreateController
 * Controller of the mealPlanner
 */
angular.module('mealPlanner')
  .controller('IngredientsCreateController', IngredientsCreateController);

/* @ngInject */
function IngredientsCreateController($scope, $mdToast, ingredientService) {
  var vm = this;
  vm.isLoading = false;

  vm.createIngredient = function () {
    vm.isLoading = true;
    ingredientService.createIngredient($scope.ingredient).then(function () {
      $scope.go('ingredientsList', 'slide-up');
      $mdToast.show({
        parent: angular.element(document.getElementById('content-view')),
        template: '<md-toast>Ingredient was created!</md-toast>',
        position: 'top left',
        hideDelay: 3000
      });
    });
  };
}
