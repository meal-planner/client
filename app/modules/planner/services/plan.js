(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.service:planService
   * @description
   * # planService
   * Plan services used to load and save current plan to local storage.
   */
  angular
    .module('mealPlanner.planner')
    .service('planService', PlanService);

  /* @ngInject */
  function PlanService(localStorageService, PlanFactory) {
    var mealTypes = [
      'Breakfast',
      'Lunch',
      'Dinner',
      'Snack'
    ];

    return {
      mealTypes: mealTypes,
      getPlan: getPlan,
      saveLocalPlan: saveLocalPlan
    };

    /**
     * Get current plan.
     *
     * @returns {Plan}
     */
    function getPlan() {
      var localPlan = localStorageService.get('plan');

      return localPlan ? PlanFactory.fromJson(localPlan) : PlanFactory.build();
    }

    /**
     * Persist planned days in local storage.
     */
    function saveLocalPlan(plan) {
      localStorageService.set('plan', plan.toJson());
    }
  }
})();
