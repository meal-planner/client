'use strict';

describe('Controller: RecipeCreateController', function () {
  beforeEach(module('mealPlanner'));

  var ctrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    ctrl = $controller('RecipeCreateController', {
      $scope: scope,
      $mdToast: {},
      recipeService: {},
      ingredientService: {}
    });
  }));

  it('resets the search input text', function () {
    ctrl.searchText = 'foo query';
    ctrl.addIngredient();
    expect(ctrl.searchText).toEqual('');
  });

  it('ignores undefined', function () {
    ctrl.addIngredient();
    expect(ctrl.ingredients.length).toEqual(0);
  });

  it('ignores empty ingredient if added', function () {
    ctrl.addIngredient({});
    expect(ctrl.ingredients.length).toEqual(0);

    ctrl.addIngredient({name: 'foo'});
    expect(ctrl.ingredients.length).toEqual(1);
  });

  it('adds ingredient with same name only once', function () {
    ctrl.addIngredient({name: 'baz', prop: 1});
    ctrl.addIngredient({name: 'bar', prop: 1});
    ctrl.addIngredient({name: 'baz', prop: 2});
    expect(ctrl.ingredients.length).toEqual(2);
  });
});
