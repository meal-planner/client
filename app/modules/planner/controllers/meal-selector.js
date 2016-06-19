(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.controller:MealSelectorController
   * @description
   * # MealSelectorController
   * Meal selector controller
   */
  angular
    .module('mealPlanner.planner')
    .controller('MealSelectorController', MealSelectorController);

  /* @ngInject */
  function MealSelectorController($mdDialog, $timeout, RecipeService, RecipeGroupService) {
    var RECIPE_SEARCH_LIMIT = 25;
    var self = this;

    self.searchVisible = false;
    self.groupsVisible = true;
    self.searchText = '';
    self.recipes = [];
    self.selectedFilter = null;
    self.selectedGroup = null;
    self.showGroup = showGroup;
    self.showGroups = showGroups;
    self.showSearch = showSearch;
    self.searchRecipes = searchRecipes;
    self.cancelDialog = cancelDialog;
    self.addRecipe = addRecipe;

    /**
     * Set initial state.
     * Load recipe groups.
     */
    return activate();

    function activate() {
      self.recipeGroups = [];
      RecipeGroupService.getDishTypes().then(function (dishTypes) {
        self.recipeGroups.push({
          title: 'Dish Type',
          tiles: dishTypes,
          paramKey: 'dish_type'
        });
      });
      RecipeGroupService.getKeyIngredients().then(function (keyIngredients) {
        self.recipeGroups.push({
          title: 'Ingredient',
          tiles: keyIngredients,
          paramKey: 'key_ingredient'
        });
      });
      RecipeGroupService.getDiets().then(function (diets) {
        self.recipeGroups.push({
          title: 'Diet',
          tiles: diets,
          paramKey: 'diet'
        });
      });
    }

    /**
     * Show selected recipe group.
     *
     * @param {String} paramKey
     * @param {String} groupTitle
     */
    function showGroup(paramKey, groupTitle) {
      self.groupsVisible = false;
      self.selectedFilter = paramKey;
      self.selectedGroup = groupTitle;
      searchRecipes();
    }

    /**
     * Show all recipe groups.
     */
    function showGroups() {
      self.recipes = [];
      self.searchVisible = false;
      self.groupsVisible = true;
      self.selectedFilter = null;
      self.selectedGroup = null;
    }

    /**
     * Show recipe search.
     */
    function showSearch() {
      self.recipes = [];
      self.searchVisible = true;
      self.groupsVisible = false;
      self.searchText = '';
      $timeout(function () {
        document.getElementById('meal-search-field').focus();
      });
    }

    /**
     * Search recipes with given query.
     *
     * @param searchQuery
     * @param previousSearchText
     * @returns {*}
     */
    function searchRecipes() {
      self.recipes = [];
      if (self.searchText || self.selectedFilter) {
        self.isLoading = true;
        RecipeService.searchRecipes(
          self.searchText,
          self.selectedFilter,
          self.selectedGroup,
          RECIPE_SEARCH_LIMIT
        ).then(function (recipes) {
          self.isLoading = false;
          self.recipes = recipes;
        });
      }
    }

    /**
     * Send selected recipe to the day directive.
     *
     * @param recipe
     */
    function addRecipe(recipe) {
      $mdDialog.hide(recipe);
    }

    /**
     * Close popup.
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
