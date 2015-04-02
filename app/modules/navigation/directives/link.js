'use strict';

angular.module('mealPlanner')
  .directive('mpLink', MpLinkDirective);

function MpLinkDirective($mdInkRipple, $mdTheming) {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: '<a class="mp-navigation-link" ng-transclude></a>',
    link: postLink
  };

  function postLink(scope, element) {
    $mdTheming(element);
    $mdInkRipple.attachButtonBehavior(scope, element);
  }
}

MpLinkDirective.$inject = ["$mdInkRipple", "$mdTheming"];
