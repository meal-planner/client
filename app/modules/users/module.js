(function () {
  'use strict';

  /**
   * @name mealPlanner.users
   * @description
   * # mealPlanner.users
   *
   * Users module.
   */
  angular.module('mealPlanner.users', ['ngResource', 'satellizer'])
    .run(runUsers);

  function runUsers($auth, UserService) {
    if ($auth.isAuthenticated()) {
      UserService.afterLogin();
    }
  }
})();
