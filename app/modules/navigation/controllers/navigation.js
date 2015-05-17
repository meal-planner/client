'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:NavigationController
 * @description
 * # NavigationController
 * Controller for links
 */
angular.module('mealPlanner')
  .controller('NavigationController', NavigationController);

/* @ngInject */
function NavigationController($scope, $state, $mdSidenav, $mdUtil) {
  var self = this;

  self.links = [{
    label: 'Make Plan',
    state: 'planner'
  }, {
    label: 'Recipes',
    state: 'recipesList'
  }, {
    label: 'Ingredients',
    state: 'ingredientsList'
  }];

  self.isMenuButtonVisible = true;
  self.isSearchButtonVisible = false;
  self.isSearchInputVisible = false;
  self.openMenu = openMenu;
  self.closeMenu = closeMenu;
  self.openSearch = openSearch;
  self.closeSearch = closeSearch;

  $scope.go = function (to, params) {
    $state.go(to, params);
  };

  return init();

  function init() {
    if (self.mpSearch != undefined) {
      self.isSearchButtonVisible = true;

      var wait = parseInt(self.mpSearchDelay, 10) || 0;
      $scope.$watch('ctrl.mpSearchQuery', wait
        ? $mdUtil.debounce(handleSearchText, wait)
        : handleSearchText);
    }
  }

  function handleSearchText(searchQuery, previousSearchText) {
    if (!searchQuery && searchQuery === previousSearchText) return;
    self.mpSearch();
  }

  function openMenu() {
    $mdSidenav('menu').toggle();
  }

  function closeMenu() {
    $mdSidenav('menu').close();
  }

  function openSearch() {
    self.isSearchButtonVisible = false;
    self.isMenuButtonVisible = false;
    self.isSearchInputVisible = true;
  }

  function closeSearch() {
    self.isSearchInputVisible = false;
    self.isSearchButtonVisible = true;
    self.isMenuButtonVisible = true;
  }
}
