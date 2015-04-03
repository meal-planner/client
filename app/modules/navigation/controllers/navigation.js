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
function NavigationController($scope, $state, $location) {
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
      if (toState.name === link.state) {
        self.selectedLink = index;
        link.activeClass = 'active';
      }
    });
  });

  $scope.go = function (to, animation) {
    animation = animation || defaultAnimation(to);
    self.animationClass = animation;
    $location.path($state.href(to).substring(2));
  };

  function defaultAnimation(to) {
    var animationClass;
    var clickedLinkIndex = 0;
    self.links.forEach(function (link, index) {
      link.activeClass = '';
      if (to === link.state) {
        clickedLinkIndex = index;
        link.activeClass = 'active';
      }
    });
    if (clickedLinkIndex === self.selectedLink) {
      animationClass = '';
    } else {
      animationClass = clickedLinkIndex > self.selectedLink ? 'slide-left' : 'slide-right';
    }

    return animationClass;
  }
}
