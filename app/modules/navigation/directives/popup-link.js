(function () {
  'use strict';

  angular
    .module('mealPlanner.navigation')
    .directive('mpPopupLink', mpPopupLink);

  /* @ngInject */
  function mpPopupLink() {
    return {
      restrict: 'E',
      template: '<a href="{{ctrl.linkUrl}}" ng-click="ctrl.showPopup($event, ctrl.linkTitle, ctrl.linkUrl);">{{ctrl.linkTitle}}</a>',
      scope: {
        linkTitle: '@',
        linkUrl: '@'
      },
      controller: mpOpenPopupController,
      controllerAs: 'ctrl',
      bindToController: true
    };

    /* @ngInject */
    function mpOpenPopupController($mdDialog) {
      /*jshint validthis:true */
      var self = this;
      self.showPopup = showPopup;

      function showPopup(event, title, template) {
        event.preventDefault();
        $mdDialog.show({
          controller: 'PopupLinkController',
          controllerAs: 'ctrl',
          bindToController: true,
          templateUrl: 'modules/navigation/views/popup.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose:true,
          locals: {
            title: title,
            template: template
          }
        });
      }
    }
  }
})();
