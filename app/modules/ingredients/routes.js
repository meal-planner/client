(function () {
  'use strict';

  angular
    .module('mealPlanner.ingredients')
    .config(ingredientRoutesConfig);

  /* @ngInject */
  function ingredientRoutesConfig($stateProvider) {
    $stateProvider.state('ingredientsGroups', {
      url: '/ingredients/',
      templateUrl: 'modules/ingredients/views/groups.html',
      controller: 'IngredientsGroupsController',
      controllerAs: 'ctrl',
      pageTitle: 'Ingredients',
      resolve: {
        groups: resolveFoodGroups
      }
    }).state('ingredientsList', {
      url: '/ingredients/:group',
      templateUrl: 'modules/ingredients/views/list.html',
      controller: 'IngredientsListController',
      controllerAs: 'ctrl',
      resolve: {
        ingredients: resolveIngredientsList
      }
    }).state('createIngredient', {
      url: '/ingredients/create/',
      templateUrl: 'modules/ingredients/views/edit.html',
      controller: 'IngredientsEditController as ctrl',
      controllerAs: 'ctrl',
      pageTitle: 'Create New Ingredient',
      resolve: {
        authenticated: function (UserService) {return UserService.isAuthenticated();},
        foodGroups: resolveFoodGroups,
        ingredient: resolveEmptyIngredient
      }
    }).state('editIngredient', {
      url: '/ingredients/edit/:ingredientId',
      templateUrl: 'modules/ingredients/views/edit.html',
      controller: 'IngredientsEditController',
      controllerAs: 'ctrl',
      resolve: {
        authenticated: function (UserService) {return UserService.isAuthenticated();},
        foodGroups: resolveFoodGroups,
        ingredient: resolveIngredientWithMeasures
      }
    }).state('viewIngredient', {
      url: '/ingredients/view/:ingredientId',
      templateUrl: 'modules/ingredients/views/view.html',
      controller: 'IngredientViewController',
      controllerAs: 'ctrl',
      resolve: {
        ingredient: resolveIngredient
      }
    });

    /**
     * Load list of ingredients in given group.
     *
     * @param $stateParams
     * @param IngredientService
     * @returns {{Ingredient}[]|*}
     */
    function resolveIngredientsList($stateParams, IngredientService) {
      return IngredientService.getIngredients($stateParams.group);
    }

    /**
     * Create empty ingredient model and set default measure (100 g) with default nutrients.
     *
     * @param IngredientFactory
     * @param NutrientCollectionFactory
     * @returns {Ingredient}
     */
    function resolveEmptyIngredient(IngredientFactory, NutrientCollectionFactory) {
      var ingredient = IngredientFactory.build();
      ingredient.measures.push({
        qty: 100,
        label: 'g',
        eqv: 100,
        nutrients: NutrientCollectionFactory.fromJson({
          energy: 0,
          fat: 0,
          carbohydrate: 0,
          protein: 0
        })
      });

      return ingredient;
    }

    /**
     * Load ingredient and then convert all measures nutrients to NutrientCollection
     *
     * @param $stateParams
     * @param IngredientService
     * @param NutrientCollectionFactory
     * @returns {Ingredient|*}
     */
    function resolveIngredientWithMeasures($stateParams, IngredientService, NutrientCollectionFactory) {
      return IngredientService.getIngredient($stateParams.ingredientId)
        .then(function (ingredient) {
          ingredient.measures.forEach(function (measure, index) {
            ingredient.measures[index].nutrients = NutrientCollectionFactory.fromJson(measure.nutrients);
          });

          return ingredient;
        });
    }

    /**
     * Load ingredient model.
     *
     * @param $stateParams
     * @param IngredientService
     * @returns {Ingredient|*}
     */
    function resolveIngredient($stateParams, IngredientService) {
      return IngredientService.getIngredient($stateParams.ingredientId);
    }

    /**
     * Fetch food groups.
     *
     * @param IngredientGroupService
     * @returns {*}
     */
    function resolveFoodGroups(IngredientGroupService) {
      return IngredientGroupService.getGroups();
    }
  }
})();
