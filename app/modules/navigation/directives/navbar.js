'use strict';

angular.module('mealPlanner')
  .directive('mpNavbar', MpNavbarDirective);

function MpNavbarDirective() {
  return {
    restrict: 'E',
    templateUrl: 'modules/navigation/views/navbar.html',
    controller: 'NavigationController',
    controllerAs: 'ctrl',
    scope: {
      mpTitle: '@',
      mpIsLoading: '=',
      mpSearch: '=',
      mpSearchQuery: '=',
      mpSearchDelay: '=',
      mpSearchResult: '='
    }
  };
}
