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
  function UserLoginController($auth, $mdDialog, UserService, NavigationService) {
    var self = this;

    self.loginButtonLocked = false;
    self.login = login;
    self.authenticate = authenticate;

    /**
     * Log in with email and password.
     */
    function login() {
      NavigationService.navigationBar.isLoading = true;
      self.loginButtonLocked = true;
      $auth.login({email: self.email, password: self.password})
        .catch(handleError);
    }

    /**
     * Sign in with one of social providers (Facebook, Google etc)
     *
     * @param provider
     */
    function authenticate(provider) {
      $auth.authenticate(provider)
        .then(function () {
          UserService.setAvatar();
        })
        .catch(handleError);
    }

    /**
     * Handle errors.
     *
     * @param response
     */
    function handleError(response) {
      NavigationService.navigationBar.isLoading = false;
      self.loginButtonLocked = false;
      var message = response.data && response.data.error ? response.data.error : 'Error during request.';
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Log in error')
          .content(message)
          .ariaLabel('Could not log in')
          .ok('OK')
      );
    }
  }
})();
