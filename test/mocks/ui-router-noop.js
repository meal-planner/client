'use strict';

var mod = angular.module('uiRouterNoop', []);
mod.service('$state', function () {
  return {
    go: function () {
    }
  }
});
mod.service('$urlRouter', function () {
  return {}
});
