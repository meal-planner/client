(function () {
  'use strict';

  angular.module('mealPlanner.planner')
    .directive('mpPlanDayEnergyChart', PlanDayEnergyChartDirective);

  /* @ngInject */
  function PlanDayEnergyChartDirective(planService) {
    return {
      templateUrl: 'modules/planner/views/planner/day/energy_chart.html',
      link: planDayEnergyChartLink,
      scope: {
        day: '='
      }
    };

    function planDayEnergyChartLink(scope) {
      scope.nutrients = planService.getDayNutrients(scope.day);
      scope.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 2,
        percentageInnerCutout: 60,
        animateRotate: false,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%"
      };
      scope.chartData = getChartData();

      /**
       * Update nutrients and recalculate chart data.
       */
      scope.$watch(function () {
        return scope.day
      }, function () {
        scope.nutrients = planService.getDayNutrients(scope.day);
        scope.chartData = getChartData();
      }, true);

      /**
       * Calculate macro nutrients shares in total energy.
       *
       * @returns {*[]}
       */
      function getChartData() {
        var energyFromFat = Math.round(scope.nutrients.fat * 9 / scope.nutrients.energy * 100);
        var energyFromProtein = Math.round(scope.nutrients.protein * 4 / scope.nutrients.energy * 100);
        var energyFromCarbs = 100 - energyFromFat - energyFromProtein;

        return [
          {label: "Protein", value: energyFromProtein, color: "#1E88E5"},
          {label: "Carbs", value: energyFromCarbs, color: "#FB8C00"},
          {label: "Fat", value: energyFromFat, color: "#43A047"}
        ];
      }
    }
  }
})();
