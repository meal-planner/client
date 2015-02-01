'use strict';

describe('Controller: TabsCtrl', function () {

  // load the controller's module
  beforeEach(module('mealPlannerApp'));

  var TabsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TabsCtrl = $controller('TabsCtrl', {
      $scope: scope
    });
  }));

  it('should have tabs in scope', function () {
    expect(scope.tabs.length).toBeGreaterThan(0);
  });

});
