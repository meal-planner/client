'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:NavigationController
 * @description
 * # NavigationController
 * Controller for tabs
 */
angular.module('mealPlanner')
  .controller('NavigationController', function ($scope, $state, $location) {
    var self = this;

    self.selectedIndex = 0;
    self.animationClass = '';
    self.tabs = [{
      label: 'Make Plan',
      state: 'planner'
    }, {
      label: 'Recipes',
      state: 'recipesList'
    }, {
      label: 'Ingredients',
      state: 'ingredientsList'
    }];

    $scope.go = function (to, animation) {
      animation = animation || defaultAnimation(to);
      self.animationClass = animation;
      $location.path($state.href(to).substring(2));
    };

    function defaultAnimation(to) {
      var animationClass;
      var clickedTabIndex = 0;
      self.tabs.forEach(function (tab, index) {
        if (to === tab.state) {
          clickedTabIndex = index;
        }
      });
      if (clickedTabIndex === self.selectedIndex) {
        animationClass = '';
      } else {
        animationClass = clickedTabIndex > self.selectedIndex ? 'slide-left' : 'slide-right';
      }

      return animationClass;
    }

    $scope.$on('$stateChangeSuccess', function (event, toState) {
      self.tabs.forEach(function (tab, index) {
        if (toState.name === tab.state) {
          self.selectedIndex = index;
        }
      });
    });

  });
