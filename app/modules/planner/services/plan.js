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
      var plan = localPlan
        ? PlanFactory.fromObject(localPlan)
        : PlanFactory.build();

      return plan;
    }

    /**
     * Persist planned days in local storage.
     */
    function saveLocalPlan(plan) {
      localStorageService.set('plan', plan.toObject());
    }
  }
})();
