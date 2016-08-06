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
  function IngredientGroupService($http) {
    var groupsIcon = {
      'Meat': '/images/ingredient/meat-group.png',
      'Fish & Seafood': '/images/ingredient/fish-group.png',
      'Poultry': '/images/ingredient/poultry-group.png',
      'Nuts & Seeds': '/images/ingredient/nuts-group.png',
      'Legumes': '/images/ingredient/legumes-group.png',
      'Dairy & Eggs': '/images/ingredient/dairy-group.png',
      'Vegetables': '/images/ingredient/vegetables-group.png',
      'Grains': '/images/ingredient/grains-group.png',
      'Fruits': '/images/ingredient/fruits-group.png',
      'Beverages': '/images/ingredient/beverages-group.png',
      'Sweets & Deserts': '/images/ingredient/sweets-group.png',
      'Other': '/images/ingredient/other-group.png',
    };

    return {
      getGroups: getGroups,
      getGroupIcon: getGroupIcon
    };

    /**
     * Load ingredient groups and set correct images URL.
     *
     * @returns {*}
     */
    function getGroups() {
      return $http.get('modules/ingredients/data/groups.json', {cache: true})
        .then(function (groups) {
          return groups.data;
        });
    }

    /**
     * Get group icon image URL.
     *
     * @param {String} group
     * @returns {String}
     */
    function getGroupIcon(group) {
      if (groupsIcon.hasOwnProperty(group)) {
        return groupsIcon[group];
      }

      return '/images/ingredient/image/default-icon.png';
    }
  }
})();
