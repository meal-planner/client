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
    return {
      isAuthenticated: isAuthenticated,
      afterLogin: afterLogin,
      getProfile: getProfile,
      requestPasswordReset: requestPasswordReset,
      resetPassword: resetPassword
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
    function afterLogin() {
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

    /**
     * Request password reset for given email.
     *
     * @param {String} email
     * @returns {HttpPromise}
     */
    function requestPasswordReset(email) {
      return $http.post(ENV.apiEndpoint + 'user/password_reset_request', {email: email});
    }

    /**
     * Reset user password with token from email link.
     *
     * @param {String} token
     * @param {String} newPassword
     * @returns {HttpPromise}
     */
    function resetPassword(token, newPassword) {
      return $http.post(ENV.apiEndpoint + 'user/reset_password', {token: token, new_password: newPassword});
    }
  }
})();
