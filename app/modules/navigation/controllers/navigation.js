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
function NavigationController($scope, $state) {
  var self = this;

  self.selectedLink = 0;
  self.animationClass = '';
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

  $scope.$on('$stateChangeSuccess', function (event, toState) {
    self.links.forEach(function (link, index) {
      link.activeClass = '';
      if (toState.name === link.state) {
        self.selectedLink = index;
        link.activeClass = 'active';
      }
    });
  });

  $scope.go = function (to, params) {
    $state.go(to, params);
  }
}
