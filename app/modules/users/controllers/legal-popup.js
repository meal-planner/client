(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.users.controller:LegalPopupController
   * @description
   * # LegalPopupController
   * User sign up legal popup controller
   */
  angular
    .module('mealPlanner.users')
    .controller('LegalPopupController', LegalPopupController);

  /* @ngInject */
  function LegalPopupController($mdDialog, title, template) {
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
