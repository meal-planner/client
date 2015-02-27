'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:TabsController
 * @description
 * # TabsController
 * Controller for tabs
 */
angular.module('mealPlanner')
  .controller('TabsController', function ($scope, $state, $location) {
    $scope.navigation = {
      selectedIndex: 0
    };
    $scope.tabs = [{
      label: 'Make Plan',
      state: 'planner'
    }, {
      label: 'Recipes',
      state: 'recipesList',
      disabled: true
    }, {
      label: 'Ingredients',
      state: 'ingredientsList'
    }];

    $scope.$on('$stateChangeSuccess', function (event, toState) {
      $scope.tabs.forEach(function (tab, index) {
        if (toState.name === tab.state) {
          $scope.navigation.selectedIndex = index;
        }
      });
    });

    $scope.go = function (to, animation) {
      animation = animation || defaultAnimation(to);
      $scope.navigation.animationClass = animation;
      $location.path($state.href(to).substring(2));
    };

    function defaultAnimation(to) {
      var animationClass;
      var clickedTabIndex = 0;
      $scope.tabs.forEach(function (tab, index) {
        if (to === tab.state) {
          clickedTabIndex = index;
        }
      });
      if (clickedTabIndex === $scope.navigation.selectedIndex) {
        animationClass = '';
      } else {
        animationClass = clickedTabIndex > $scope.navigation.selectedIndex ? 'slide-left' : 'slide-right';
      }

      return animationClass;
    }
  });
