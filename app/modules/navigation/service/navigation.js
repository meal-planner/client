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
  function NavigationService($mdToast) {
    return {
      navigationBar: {
        title: '',
        searchCallback: null,
        isLoading: false,
        avatar: 'images/icons/avatar-default.png'
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
      }],
      handleError: handleError
    };

    function handleError(message) {
      /*jshint validthis:true */
      this.navigationBar.isLoading = false;
      message = message || 'Sorry, the request could not be performed.';
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position('bottom left')
          .hideDelay(5000)
          .theme('error-toast')
      );
    }
  }
})();
