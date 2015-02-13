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

function IngredientsListController($mdDialog, Ingredient) {
  var vm = this;
  vm.items = [];
  vm.isLoading = true;
  Ingredient.query(function (response) {
    vm.items = response;
    vm.isLoading = false;
    console.log(vm.items);
  });

  vm.deleteIngredient = function (ingredient, ev) {
    var confirm = $mdDialog.confirm()
      .title('Do you want to delete ingredient?')
      .content('This will permanently delete ingredient "' + ingredient.name + '".')
      .ok('Yes, delete!')
      .cancel('No, keep it')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      var index = vm.items.indexOf(ingredient);
      vm.items.splice(index, 1);
      Ingredient.delete({id: ingredient.id});
    });
  };

}
