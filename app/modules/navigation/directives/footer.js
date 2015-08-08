(function () {
  'use strict';

  angular
    .module('mealPlanner.navigation')
    .directive('mpFooter', mpFooter);

  /* @ngInject */
  function mpFooter() {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/footer.html'
    };
  }
})();
