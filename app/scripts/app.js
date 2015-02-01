'use strict';

/**
 * @ngdoc overview
 * @name mealPlannerApp
 * @description
 * # mealPlannerApp
 *
 * Main module of the application.
 */
angular
  .module('mealPlannerApp', ['ngMaterial', 'ngRoute'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('deep-orange');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/recipes', {
        templateUrl: 'views/recipes.html',
        controller: 'RecipesCtrl'
      })
      .when('/ingredients', {
        templateUrl: 'views/ingredients.html',
        controller: 'IngredientsCtrl'
      })
      .when('/ingredients/create', {
        templateUrl: 'views/ingredients/create.html',
        controller: 'IngredientsCreateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
