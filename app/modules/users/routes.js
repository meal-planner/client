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
      pageTitle: ' '
    }).state('signup', {
      parent: 'login',
      url: '^/signup',
      templateUrl: 'modules/users/views/signup.html',
      controller: 'UserSignUpController',
      controllerAs: 'ctrl',
      pageTitle: ' '
    }).state('forgot-password', {
      parent: 'login',
      url: '^/forgot-password',
      templateUrl: 'modules/users/views/forgot-password.html',
      controller: 'UserForgotPasswordController',
      controllerAs: 'ctrl',
      pageTitle: ' '
    }).state('reset-password', {
      url: '/reset-password/:token',
      templateUrl: 'modules/users/views/reset-password.html',
      controller: 'UserResetPasswordController',
      controllerAs: 'ctrl',
      pageTitle: 'Reset Password'
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
