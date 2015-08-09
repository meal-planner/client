(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.users.controller:UserLoginController
   * @description
   * # UserLoginController
   * User log in controller
   */
  angular
    .module('mealPlanner.users')
    .controller('UserLoginController', UserLoginController);

  /* @ngInject */
  function UserLoginController($auth, UserService) {
    var self = this;
    self.authenticate = authenticate;

    function authenticate(provider) {
      $auth.authenticate(provider)
        .then(function () {
          UserService.setAvatar();
        })
        .catch(function (response) {
          console.log(response.data ? response.data.message : response);
        });
    };
  }
})();
