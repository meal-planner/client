(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.users.controller:UserForgotPasswordController
   * @description
   * # UserForgotPasswordController
   * User forgot password controller
   */
  angular
    .module('mealPlanner.users')
    .controller('UserForgotPasswordController', UserForgotPasswordController);

  /* @ngInject */
  function UserForgotPasswordController($state, $mdDialog, UserService) {
    var self = this;
    self.requestPasswordReset = resetPassword;

    function resetPassword() {
      UserService.requestPasswordReset(self.email)
        .then(function () {
          $state.go('login');
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Password reset')
              .content('We have sent password reset link to "' + self.email + '", if there is an account associated with this email.')
              .ariaLabel('Password reset')
              .ok('OK')
          );
        });
    }
  }
})();
