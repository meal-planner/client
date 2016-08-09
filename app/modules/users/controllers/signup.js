(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.users.controller:UserSignUpController
   * @description
   * # UserSignUpController
   * User sign up controller
   */
  angular
    .module('mealPlanner.users')
    .controller('UserSignUpController', UserSignUpController);

  /* @ngInject */
  function UserSignUpController($auth, $mdToast, $mdDialog, $state, NavigationService) {
    var self = this;

    self.user = {};
    self.signUpButtonLocked = false;
    self.signUp = signUp;

    /**
     * Register user.
     */
    function signUp() {
      self.signUpButtonLocked = true;
      NavigationService.navigationBar.isLoading = true;
      $auth.signup(self.user)
        .then(function () {
          NavigationService.navigationBar.isLoading = false;
          $state.go('login');
          $mdToast.show(
            $mdToast.simple()
              .textContent('Your account has been created, you can log in now!')
              .position('bottom left')
              .hideDelay(5000)
          );
        })
        .catch(function (response) {
          self.signUpButtonLocked = false;
          NavigationService.navigationBar.isLoading = false;
          var message = response.data && response.data.error ? response.data.error : 'Error during request.';
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Could not complete sign up')
              .content(message)
              .ariaLabel('Could not complete sign up')
              .ok('OK')
          );
        });
    }
  }
})();
