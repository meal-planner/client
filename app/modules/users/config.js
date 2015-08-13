(function () {
  'use strict';

  /**
   * @name mealPlanner.users
   * @description
   * # mealPlanner.users
   *
   * Users config.
   */
  angular.module('mealPlanner.users')
    .config(usersConfig);

  function usersConfig($authProvider, ENV) {
    $authProvider.baseUrl = ENV.apiEndpoint;
    $authProvider.signupUrl = 'user/signup';
    $authProvider.loginUrl = 'user/login';

    $authProvider.facebook({
      clientId: '426340670872316'
    });

    $authProvider.google({
      clientId: '15031705694-hoe39g14p85avkng29d8a6itm4j1iek7.apps.googleusercontent.com'
    });
  }
})();
