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
  var self = this;
  self.items = [];
  self.deleteIngredient = deleteIngredient;
  self.isSearchShown = false;

  initialize();

  function initialize() {
    self.isLoading = true;
    return getIngredients().then(
      function () {
        self.isLoading = false;
      },
      function () {
        self.isLoading = false;
        self.isError = true;
      }
    );
  }

  function getIngredients() {
    return ingredientService.getIngredients()
      .then(function (data) {
        self.items = data;
        return self.items;
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
      var index = self.items.indexOf(ingredient);
      self.items.splice(index, 1);
      ingredientService.deleteIngredient(ingredient.id);
    });
  };

}
