(function () {
  'use strict';

  angular
    .module('mealPlanner.planner')
    .directive('mpEnergyChart', mpEnergyChart);

  /* @ngInject */
  function mpEnergyChart() {
    return {
      templateUrl: 'modules/nutrients/views/energy-chart.html',
      link: energyChartLink,
      scope: {
        nutrients: '='
      }
    };

    function energyChartLink(scope) {
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

      /**
       * Update nutrients and recalculate chart data.
       */
      scope.$watch(function () {
        return scope.nutrients
      }, function () {
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
