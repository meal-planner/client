(function () {
  'use strict';

  angular
    .module('mealPlanner.navigation')
    .directive('mpNavbar', mpNavbar);

  /* @ngInject */
  function mpNavbar($state, $mdSidenav) {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/navbar.html',
      link: navbarLink,
      scope: {
        mpTitle: '@',
        mpIsLoading: '=',
        mpSearch: '=',
        mpSearchQuery: '=',
      }
    };

    function navbarLink(scope) {
      scope.links = [{
        label: 'Meal Plan',
        state: 'planner'
      }, {
        label: 'Recipes',
        state: 'recipesGroups'
      }, {
        label: 'Ingredients',
        state: 'ingredientsGroups'
      }];

      scope.isMenuButtonVisible = true;
      scope.isSearchButtonVisible = scope.mpSearchQuery !== undefined;
      scope.isSearchInputVisible = false;
      scope.go = go;
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
        $state.go(link);
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
