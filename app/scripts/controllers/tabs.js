'use strict';

/**
 * @ngdoc function
 * @name mealPlannerApp.controller:TabsCtrl
 * @description
 * # TabsCtrl
 * Controller for tabs
 */
angular.module('mealPlannerApp')
  .controller('TabsCtrl', function ($scope, $location) {
    $scope.navigation = {
      selectedIndex: 0
    };
    $scope.tabs = [{
      label: 'Make Plan',
      uri: '/'
    }, {
      label: 'Recipes',
      uri: '/recipes'
    }, {
      label: 'Ingredients',
      uri: '/ingredients'
    }];

    $scope.$watch(
      function () {
        return $location.path();
      },
      function (currentUri) {
        $scope.tabs.forEach(function (tab, index) {
          if (currentUri === tab.uri) {
            $scope.navigation.selectedIndex = index;
          }
        });
      }
    );

    $scope.go = function (uri, animation) {
      animation = animation || defaultAnimation(uri);
      $scope.navigation.animationClass = animation;
      $location.path(uri);
    };

    function defaultAnimation(uri) {
      var animationClass;
      var clickedTabIndex = 0;
      $scope.tabs.forEach(function (tab, index) {
        if (uri === tab.uri) {
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
