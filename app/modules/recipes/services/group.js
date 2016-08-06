(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.service:RecipeGroupService
   * @description
   * # RecipeGroupService
   * Recipe groups service provides information about grouping/categorization of recipes.
   */
  angular
    .module('mealPlanner.recipes')
    .service('RecipeGroupService', RecipeGroupService);

  /* @ngInject */
  function RecipeGroupService($http) {
    return {
      getGroups: getGroups
    };

    /**
     * Load recipes groups.
     *
     * @returns {*}
     */
    function getGroups() {
      return $http.get('modules/recipes/data/groups.json', {cache: true})
        .then(function (groups) {
          return groups.data;
        });
    }
  }
})();
