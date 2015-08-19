(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.users.controller:UserSignUpController
   * @description
   * # UserSignUpController
   * User sign up controller
   */
  angular
    .module('mealPlanner.users')
    .controller('UserSignUpController', UserSignUpController);

  /* @ngInject */
  function UserSignUpController($auth, $mdDialog, NavigationService) {
    var self = this;

    self.user = {};
    self.signUpButtonLocked = false;
    self.showTermsOfUse = showTermsOfUse;
    self.showPrivacyPolicy = showPrivacyPolicy;
    self.signUp = signUp;

    /**
     * Show terms of use popup.
     *
     * @param event
     */
    function showTermsOfUse(event) {
      event.preventDefault();
      showPopup('Terms of Use', 'terms-of-use.html');
    }

    /**
     * Show privacy policy popup.
     *
     * @param event
     */
    function showPrivacyPolicy(event) {
      event.preventDefault();
      showPopup('Privacy Policy', 'privacy-policy.html');
    }

    /**
     * Open dialog popup with given title and template file as content.
     *
     * @param {String} title
     * @param {String} template
     */
    function showPopup(title, template) {
      event.preventDefault();
      $mdDialog.show({
        controller: 'LegalPopupController',
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'modules/users/views/legal-popup.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true,
        locals: {
          title: title,
          template: template
        }
      });
    }

    /**
     * Register user.
     */
    function signUp() {
      self.signUpButtonLocked = true;
      NavigationService.navigationBar.isLoading = true;
      $auth.signup(self.user)
        .catch(function (response) {
          self.signUpButtonLocked = false;
          NavigationService.navigationBar.isLoading = false;
          var message = response.data && response.data.error ? response.data.error : 'Error during request.';
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Could not complete sign up')
              .content(message)
              .ariaLabel('Could not complete sign up')
              .ok('OK')
          );
        });
    }
  }
})();
