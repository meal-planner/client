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
  function UserResetPasswordController($stateParams, $mdToast, $auth, UserService, NavigationService) {
    var self = this;
    self.requestPasswordReset = resetPassword;

    function resetPassword() {
      NavigationService.navigationBar.isLoading = true;
      self.submitButtonDisabled = true;
      UserService.resetPassword($stateParams.token, self.password)
        .then(function (response) {
          $auth.setToken(response);
          UserService.afterLogin();
          $mdToast.show({
            template: '<md-toast>Your password was updated</md-toast>',
            position: 'bottom left',
            hideDelay: 3000
          });
        })
        .catch(function () {
          self.submitButtonDisabled = false;
          NavigationService.handleError('Could not update the password');
        });
    }
  }
})();
