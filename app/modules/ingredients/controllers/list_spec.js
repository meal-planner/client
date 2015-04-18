'use strict';

describe('Controller: IngredientsListController', function () {

  // load the controller's module and uiRouter noop to prevent http requests for views
  beforeEach(module('mealPlanner'));
  beforeEach(module('uiRouterNoop'));

  var ListCtrl,
    deferred,
    scope;

  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    deferred = $q.defer();

    var ingredientServiceMock = {
      getIngredients: function () {
        return deferred.promise;
      }
    };

    ListCtrl = $controller('IngredientsListController', {
      ingredientService: ingredientServiceMock
    });
  }));

  it('gets ingredients from service successfully', function () {
    deferred.resolve([{
      name: 'item foo'
    }]);
    scope.$digest();

    expect(ListCtrl.items.length).toEqual(1);
  });

  it('sets error flag when service rejected promise', function () {
    deferred.reject('Network Error');
    scope.$digest();

    expect(ListCtrl.isError).toBeTruthy();
  });
});
