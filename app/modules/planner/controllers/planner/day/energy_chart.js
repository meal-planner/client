'use strict';

/**
 * @ngdoc function
 * @name mealPlanner.controller:PlannerDayEnergyChartController
 * @description
 * # PlannerDayEnergyChartController
 * Controller for plan day energy chart directive
 */
angular.module('mealPlanner')
  .controller('PlannerDayEnergyChartController', PlannerDayEnergyChartController);

/* @ngInject */
function PlannerDayEnergyChartController($scope, planService) {
  var self = this;
  self.nutrients = planService.getDayNutrients(self.day);
  self.chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    segmentShowStroke: true,
    segmentStrokeColor: '#fff',
    segmentStrokeWidth: 2,
    percentageInnerCutout: 60,
    animateRotate: false,
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%"
  };
  self.chartData = getChartData();

  /**
   * Update nutrients and recalculate chart data.
   */
  $scope.$watch(function () {
    return self.day
  }, function () {
    self.nutrients = planService.getDayNutrients(self.day);
    self.chartData = getChartData();
  }, true);

  /**
   * Calculate macro nutrients shares in total energy.
   *
   * @returns {*[]}
   */
  function getChartData() {
    var energyFromFat = Math.round(self.nutrients.fat * 9 / self.nutrients.energy * 100);
    var energyFromProtein = Math.round(self.nutrients.protein * 4 / self.nutrients.energy * 100);
    var energyFromCarbs = 100 - energyFromFat - energyFromProtein;

    return [
      {label: "Protein", value: energyFromProtein, color: "#1E88E5"},
      {label: "Carbs", value: energyFromCarbs, color: "#FB8C00"},
      {label: "Fat", value: energyFromFat, color: "#43A047"}
    ];
  }
}
