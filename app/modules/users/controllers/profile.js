(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.users.controller:ProfileController
   * @description
   * # ProfileController
   * User profile controller
   */
  angular
    .module('mealPlanner.users')
    .controller('ProfileController', ProfileController);

  /* @ngInject */
  function ProfileController($auth, UserService) {
    var self = this;

    self.logout = logout;

    return activate();

    /**
     * Set user avatar from profile.
     */
    function activate() {
      if ($auth.isAuthenticated()) {
        UserService.getProfile().success(function (profile) {
          self.profile = profile;
        });
      }
    }

    /**
     * Log user out.
     */
    function logout() {
      if (!$auth.isAuthenticated()) {
        return;
      }
      $auth.logout();
    }
  }
})();
