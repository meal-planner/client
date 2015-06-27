(function () {
  'use strict';

  angular.module('mealPlanner.navigation')
    .directive('mpNavbar', NavbarDirective);

  /* @ngInject */
  function NavbarDirective($state, $mdSidenav, $mdUtil) {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/navbar.html',
      link: navbarLink,
      scope: {
        mpTitle: '@',
        mpIsLoading: '=',
        mpSearch: '&',
        mpSearchQuery: '=',
        mpSearchDelay: '='
      }
    };

    function navbarLink(scope) {
      scope.links = [{
        label: 'Make Plan',
        state: 'planner'
      }, {
        label: 'Recipes',
        state: 'recipesList'
      }, {
        label: 'Ingredients',
        state: 'ingredientsList'
      }];

      scope.isMenuButtonVisible = true;
      scope.isSearchButtonVisible = false;
      scope.isSearchInputVisible = false;
      scope.open = open;
      scope.openMenu = openMenu;
      scope.closeMenu = closeMenu;
      scope.openSearch = openSearch;
      scope.closeSearch = closeSearch;

      if (scope.mpSearchQuery !== undefined) {
        scope.isSearchButtonVisible = true;

        var wait = parseInt(scope.mpSearchDelay, 10) || 0;
        scope.$watch('mpSearchQuery', wait
          ? $mdUtil.debounce(handleSearchText, wait)
          : handleSearchText);
      }

      /**
       * Open provided link.
       *
       * @param link
       */
      function open(link) {
        $state.go(link);
      }

      /**
       * Perform search with given callback.
       *
       * @param searchQuery
       * @param previousSearchText
       */
      function handleSearchText(searchQuery, previousSearchText) {
        if (!searchQuery && searchQuery === previousSearchText) return;
        scope.mpSearch();
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
