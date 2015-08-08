(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.navigation.service:NavigationService
   * @description
   * # NavigationService
   * Navigation service provides links for menu and keeps navigation bar state (title, search callback etc).
   */
  angular
    .module('mealPlanner.navigation')
    .service('NavigationService', NavigationService);

  /* @ngInject */
  function NavigationService() {
    return {
      navigationBar: {
        title: '',
        searchCallback: null,
        isLoading: false
      },
      links: [{
        label: 'Meal Plan',
        state: 'planner'
      }, {
        label: 'Recipes',
        state: 'recipesGroups'
      }, {
        label: 'Ingredients',
        state: 'ingredientsGroups'
      }]
    };
  }
})();
