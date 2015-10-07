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
    var groupsIcon = {
      'Meat': 'ingredient/meat-group.png',
      'Fish & Seafood': 'ingredient/fish-group.png',
      'Poultry': 'ingredient/poultry-group.png',
      'Nuts & Seeds': 'ingredient/nuts-group.png',
      'Legumes': 'ingredient/legumes-group.png',
      'Dairy & Eggs': 'ingredient/dairy-group.png',
      'Vegetables': 'ingredient/vegetables-group.png',
      'Grains': 'ingredient/grains-group.png',
      'Fruits': 'ingredient/fruits-group.png',
      'Beverages': 'ingredient/beverages-group.png',
      'Sweets & Deserts': 'ingredient/sweets-group.png',
      'Other': 'ingredient/other-group.png',
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

      return 'ingredient/image/default-icon.png';
    }
  }
})();
