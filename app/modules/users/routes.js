(function () {
  'use strict';

  angular
    .module('mealPlanner.users')
    .config(usersRouteConfig);

  function usersRouteConfig($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'modules/users/views/login.html',
      controller: 'UserLoginController',
      controllerAs: 'ctrl',
      pageTitle: 'Log In'
    }).state('profile', {
      url: '/profile',
      templateUrl: 'modules/users/views/profile.html',
      controller: 'ProfileController',
      controllerAs: 'ctrl',
      pageTitle: 'Profile',
      resolve: {
        authenticated: function (UserService) {return UserService.isAuthenticated();}
      }
    });
  }
})();
