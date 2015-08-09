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
    $authProvider.facebook({
      url: ENV.apiEndpoint + 'auth/facebook',
      clientId: '426340670872316'
    });

    $authProvider.google({
      url: ENV.apiEndpoint + 'auth/google',
      clientId: '15031705694-hoe39g14p85avkng29d8a6itm4j1iek7.apps.googleusercontent.com'
    });

    $authProvider.twitter({
      url: ENV.apiEndpoint + 'auth/twitter'
    });
  }
})();
