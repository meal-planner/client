(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.ingredients.service:IngredientGroupService
   * @description
   * # IngredientGroupService
   * Ingredient groups service.
   */
  angular
    .module('mealPlanner.ingredients')
    .service('IngredientGroupService', IngredientGroupService);

  /* @ngInject */
  function IngredientGroupService($http, ENV) {
    return {
      getGroups: getGroups
    };

    /**
     * Load ingredient groups and set correct images URL.
     *
     * @returns {*}
     */
    function getGroups() {
      return $http.get('modules/ingredients/data/group.json', {cache: true})
        .then(function (groups) {
          return setImageUrl(groups.data);
        });

      function setImageUrl(groups) {
        return groups.map(function (group) {
          group.background = ENV.contentEndpoint + group.background;
          return group;
        });
      }
    }
  }
})();
