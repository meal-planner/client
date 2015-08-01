(function () {
  'use strict';

  angular
    .module('mealPlanner.navigation')
    .directive('mpNavbar', mpNavbar);

  /* @ngInject */
  function mpNavbar($window, $state, $mdSidenav, NavigationService) {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/navbar.html',
      link: navbarLink
    };

    function navbarLink(scope) {
      scope.navigationBar = NavigationService.navigationBar;
      scope.links = NavigationService.links;

      scope.isMenuButtonVisible = true;
      scope.go = go;
      scope.goBack = goBack;
      scope.openMenu = openMenu;
      scope.closeMenu = closeMenu;
      scope.openSearch = openSearch;
      scope.closeSearch = closeSearch;

      /**
       * Open provided link.
       *
       * @param link
       */
      function go(link) {
        $mdSidenav('menu').close();
        $state.go(link);
      }

      /**
       * Go back to previous page.
       */
      function goBack() {
        $window.history.back();
      }

      /**
       * Open side menu.
       */
      function openMenu() {
        $mdSidenav('menu').toggle();
      }

      /**
       * Close side menu.
       */
      function closeMenu() {
        $mdSidenav('menu').close();
      }

      /**
       * Show search input text.
       */
      function openSearch() {
        scope.isSearchButtonVisible = false;
        scope.isMenuButtonVisible = false;
        scope.isSearchInputVisible = true;
      }

      /**
       * Hide search input text.
       */
      function closeSearch() {
        scope.isSearchInputVisible = false;
        scope.isSearchButtonVisible = true;
        scope.isMenuButtonVisible = true;
      }
    }
  }
})();
