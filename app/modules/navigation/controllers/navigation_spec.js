'use strict';

describe('Controller: NavigationController', function () {

  // load the controller's module
  beforeEach(module('mealPlanner'));

  var NavigationCtrl,
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

    NavigationCtrl = $controller('NavigationController', {
      $scope: scope,
      $state: state,
      $location: location
    });
  }));

  it('uses correct animation class', function () {
    NavigationCtrl.links = [
      {
        label: 'First Tab',
        state: 'first'
      }, {
        label: 'Second Tab',
        state: 'second'
      }
    ];

    NavigationCtrl.selectedLinks = 0;
    scope.go('second');
    expect(NavigationCtrl.animationClass).toEqual('slide-left');

    NavigationCtrl.selectedLink = 1;
    scope.go('first');
    expect(NavigationCtrl.animationClass).toEqual('slide-right');
  });

});
