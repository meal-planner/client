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
     * @param {String} name
     * @constructor
     */
    function Plan(name) {
      var self = this;

      self.name = name;
      self.days = [];
      self.nutrients = NutrientCollectionFactory.build();
    }

    Plan.prototype.updateNutritionValues = updateNutritionValues;
    Plan.prototype.toJson = toJson;
    Plan.build = build;
    Plan.fromJson = fromJson;

    return Plan;

    /**
     * Calculate sum of nutrients values from all days.
     */
    function updateNutritionValues() {
      /*jshint validthis:true */
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
     * Create plan from given JSON.
     *
     * @param {} json
     * @returns {Plan}
     */
    function fromJson(json) {
      var plan = build(json.name);
      json.days.forEach(function (day, index) {
        plan.days[index] = PlanDayFactory.fromJson(day);
      });

      return plan;
    }

    /**
     * Convert plan to JSON.
     *
     * @returns {{name: *, days: [PlanDay]}}
     */
    function toJson() {
      /*jshint validthis:true */
      var json = {
        name: this.name,
        days: this.days.map(function (day) {
          return day.toJson();
        })
      };

      return json;
    }
  }
})();
