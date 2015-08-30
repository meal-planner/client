(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name mealPlanner.navigation
   * @description
   * # mealPlanner.navigation
   *
   * Navigation module.
   */
  angular.module('mealPlanner.navigation', [])
    .run(runNavigation);

  /* @ngInject */
  function runNavigation($rootScope, $state, NavigationService) {
    $rootScope.$on('$stateChangeStart', function () {
      NavigationService.navigationBar.isLoading = true;
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      if ($state.current.pageTitle) {
        NavigationService.navigationBar.title = $state.current.pageTitle;
      }
      NavigationService.navigationBar.isLoading = false;
      NavigationService.navigationBar.searchCallback = null;
    });

    $rootScope.$on('$stateChangeError', function (event) {
      event.preventDefault();
      NavigationService.handleError();
    });
  }
})();
