'use strict';

describe('Controller: TabsController', function () {

  // load the controller's module
  beforeEach(module('mealPlanner'));

  var TabsCtrl,
    scope,
    state,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    state = {
      href: function () {
        return 'foo';
      }
    };
    location = {
      path: function () {
      }
    };

    TabsCtrl = $controller('TabsController', {
      $scope: scope,
      $state: state,
      $location: location
    });
  }));

  it('uses correct animation class', function () {
    scope.tabs = [
      {
        label: 'First Tab',
        state: 'first'
      }, {
        label: 'Second Tab',
        state: 'second'
      }
    ];

    scope.navigation.selectedIndex = 0;
    scope.go('second');
    expect(scope.navigation.animationClass).toEqual('slide-left');

    scope.navigation.selectedIndex = 1;
    scope.go('first');
    expect(scope.navigation.animationClass).toEqual('slide-right');
  });

});
