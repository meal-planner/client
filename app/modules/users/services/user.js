(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.users.service:UserService
   * @description
   * # UserService
   * User service.
   */
  angular
    .module('mealPlanner.users')
    .service('UserService', UserService);

  /* @ngInject */
  function UserService($http, $q, $location, $auth, NavigationService, ENV) {
    var profile;
    return {
      isAuthenticated: isAuthenticated,
      setAvatar: setAvatar,
      getProfile: getProfile
    };

    /**
     * Check if user is authenticated, redirect to login page if not.
     * Used in routes resolve.
     *
     * @returns {*}
     */
    function isAuthenticated() {
      var deferred = $q.defer();

      if (!$auth.isAuthenticated()) {
        $location.path('/login');
        NavigationService.navigationBar.isLoading = false;
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }

    /**
     * Set navigation bar avatar from user profile.
     */
    function setAvatar() {
      getProfile().success(function (profile) {
        NavigationService.navigationBar.avatar = profile.avatar;
      });
    }

    /**
     * Retrieve user profile.
     *
     * @returns {HttpPromise}
     */
    function getProfile() {
      return $http.get(ENV.apiEndpoint + 'user/profile');
    }
  }
})();
