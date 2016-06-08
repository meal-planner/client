(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.nutrients.directive:mpEnergyChart
   * @description
   * # mpEnergyChart
   * Energy pie-chart directive, shows pie diagram with information about energy sources.
   */
  angular
    .module('mealPlanner.nutrients')
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
        cutoutPercentage: 60,
        animation: {
          animateRotate: false
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function (item, data) {
              var index = item.index,
                label = data.labels[index],
                value = data.datasets[item.datasetIndex].data[index];
              return label + ': ' + value + '%';
            }
          }
        },
        legend: {
          display: false
        }
      };

      scope.$watch('nutrients.items', updateChartData, true);

      /**
       * Recalculate chart data.
       */
      function updateChartData() {
        scope.chartData = getChartData();
      }

      /**
       * Calculate macro nutrients shares in total energy.
       *
       * @returns {*{}}
       */
      function getChartData() {
        scope.energy = scope.nutrients.find('energy');
        scope.fat = scope.nutrients.find('fat');
        scope.protein = scope.nutrients.find('protein');
        scope.carbohydrate = scope.nutrients.find('carbohydrate');
        var energyFromFat = Math.round(scope.fat.value * 9 / scope.energy.value * 100);
        var energyFromProtein = Math.round(scope.protein.value * 4 / scope.energy.value * 100);
        var energyFromCarbs = 100 - energyFromFat - energyFromProtein;

        return {
          labels:['Protein', 'Carbs', 'Fat'],
          datasets: [
            {
              data: [energyFromProtein, energyFromCarbs, energyFromFat],
              backgroundColor: ['#1E88E5', '#FB8C00', '#43A047'],
              borderColor: '#FFFFFF',
              hoverBorderColor: '#FFFFFF'
            }
          ]
        };
      }
    }
  }
})();
