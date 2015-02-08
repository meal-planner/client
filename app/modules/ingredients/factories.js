'use strict';

angular.module('mealPlanner')
  .factory('Ingredient', function ($resource) {
    return $resource('/api/ingredients/:id');
  });
