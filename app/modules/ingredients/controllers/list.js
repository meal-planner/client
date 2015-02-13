'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:IngredientsListController
 * @description
 * # IngredientsListController
 * Controller of the mealPlanner
 */
angular.module('mealPlanner')
  .controller('IngredientsListController', IngredientsListController);

/* @ngInject */
function IngredientsListController($mdDialog, ingredientService) {
  var vm = this;
  vm.items = [];
  vm.deleteIngredient = deleteIngredient;

  initialize();

  function initialize() {
    vm.isLoading = true;
    return getIngredients().then(function () {
      vm.isLoading = false;
    })
  }

  function getIngredients() {
    return ingredientService.getIngredients()
      .then(function (data) {
        vm.items = data;
        return vm.items;
      });
  }

  function deleteIngredient(ingredient, ev) {
    var confirm = $mdDialog.confirm()
      .title('Do you want to delete ingredient?')
      .content('This will permanently delete ingredient "' + ingredient.name + '".')
      .ok('Yes, delete!')
      .cancel('No, keep it')
      .targetEvent(ev);

    $mdDialog.show(confirm).then(function () {
      var index = vm.items.indexOf(ingredient);
      vm.items.splice(index, 1);
      ingredientService.deleteIngredient(ingredient.id);
    });
  };

}
