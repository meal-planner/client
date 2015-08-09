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
  function ProfileController(UserService) {
    var self = this;

    UserService.getProfile().success(function (profile) {
      self.profile = profile;
    });
  }
})();
