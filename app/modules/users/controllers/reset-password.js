(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.users.controller:UserResetPasswordController
   * @description
   * # UserResetPasswordController
   * Reset user password controller
   */
  angular
    .module('mealPlanner.users')
    .controller('UserResetPasswordController', UserResetPasswordController);

  /* @ngInject */
  function UserResetPasswordController($stateParams, $mdToast, $auth, UserService) {
    var self = this;
    self.requestPasswordReset = resetPassword;

    function resetPassword() {
      UserService.resetPassword($stateParams.token, self.password)
        .then(function (response) {
          $auth.setToken(response);
          UserService.setAvatar();
          $mdToast.show({
            template: '<md-toast>Your password was updated</md-toast>',
            position: 'bottom left',
            hideDelay: 3000
          });
        })
        .catch(function () {
          $mdToast.show(
            $mdToast.simple()
              .content('Could not update the password')
              .position('bottom left')
              .hideDelay(5000)
              .theme('error-toast')
          );
        });
    }
  }
})();
