(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.navigation.controller:PopupLinkController
   * @description
   * # PopupLinkController
   * Link popup controller
   */
  angular
    .module('mealPlanner.navigation')
    .controller('PopupLinkController', PopupLinkController);

  /* @ngInject */
  function PopupLinkController($mdDialog, title, template) {
    var self = this;

    self.popupTitle = title;
    self.popupTemplateFile = template;
    self.cancelDialog = cancelDialog;

    /**
     * Close popup.
     */
    function cancelDialog() {
      $mdDialog.cancel();
    }
  }
})();
