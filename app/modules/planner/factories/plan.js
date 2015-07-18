(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.planner.factory:PlanFactory
   * @description
   * # PlanFactory
   * Plan factory builds plan instances, empty or from given object.
   * Plan always consists of 7 days of the week.
   */
  angular
    .module('mealPlanner.planner')
    .factory('PlanFactory', PlanFactory);

  /* @ngInject */
  function PlanFactory(NutrientCollectionFactory, PlanDayFactory) {
    var week = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    /**
     * Plan constructor.
     *
     * @param {string} name
     * @constructor
     */
    function Plan(name) {
      var self = this;

      self.name = name;
      self.days = [];
      self.nutrients = NutrientCollectionFactory.build();
    }

    Plan.prototype.updateNutritionValues = updateNutritionValues;
    Plan.prototype.toObject = toObject;
    Plan.build = build;
    Plan.fromObject = fromObject;

    return Plan;

    /**
     * Calculate sum of nutrients values from all days.
     */
    function updateNutritionValues() {
      var self = this;

      self.nutrients = NutrientCollectionFactory.build();
      self.days.forEach(function (day) {
        self.nutrients.sum(day.nutrients);
      });
    }

    /**
     * Build empty plan.
     *
     * @param {string} name
     * @returns {Plan}
     */
    function build(name) {
      var plan = new Plan(name || 'default');
      week.forEach(function (day) {
        plan.days.push(PlanDayFactory.build(day));
      });

      return plan;
    }

    /**
     * Create plan from given object.
     *
     * @param {} object
     * @returns {Plan}
     */
    function fromObject(object) {
      var plan = build(object.name);
      object.days.forEach(function (day, index) {
        plan.days[index] = PlanDayFactory.fromObject(day);
      });

      return plan;
    }

    /**
     * Convert plan to object.
     *
     * @returns {{name: *, days: [PlanDay]}}
     */
    function toObject() {
      var object = {
        name: this.name,
        days: []
      };
      this.days.forEach(function (day) {
        object.days.push(day.toObject());
      });

      return object;
    }
  }
})();
