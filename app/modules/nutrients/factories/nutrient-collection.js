(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.nutrients.factory:NutrientCollectionFactory
   * @description
   * # NutrientCollectionFactory
   * Nutrient collection factory builds lists of nutrients.
   * Nutrients lists can be used in ingredients, recipes, planner etc.
   */
  angular
    .module('mealPlanner.nutrients')
    .factory('NutrientCollectionFactory', NutrientCollectionFactory);

  /* @ngInject */
  function NutrientCollectionFactory(NutrientFactory) {
    /**
     * Collection constructor, store items in local array.
     *
     * @constructor
     */
    function NutrientCollection() {
      this.items = [];
    }

    NutrientCollection.prototype.push = push;
    NutrientCollection.prototype.find = find;
    NutrientCollection.prototype.remove = remove;
    NutrientCollection.prototype.sum = sum;
    NutrientCollection.prototype.subtract = subtract;
    NutrientCollection.prototype.toJson = toJson;
    NutrientCollection.build = build;
    NutrientCollection.fromJson = fromJson;

    return NutrientCollection;

    /**
     * Add nutrient to collection.
     *
     * @param {Nutrient} item
     */
    function push(item) {
      /*jshint validthis:true */
      this.items.push(item);
    }

    /**
     * Find nutrient in collection by code.
     *
     * @param {String} code
     * @returns {Nutrient|Boolean}
     */
    function find(code) {
      /*jshint validthis:true */
      var index = -1;
      this.items.some(function (nutrient, position) {
        if (nutrient.code === code) {
          index = position;
          return true;
        }
      });

      return index !== -1 ? this.items[index] : false;
    }

    /**
     * Remove nutrient from collection.
     *
     * @param {Nutrient} item
     */
    function remove(item) {
      /*jshint validthis:true */
      var index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }

    /**
     * Merge given collection in current collection and sum all the nutrients.
     *
     * @param {NutrientCollection} other collection
     */
    function sum(other) {
      /*jshint validthis:true */
      var self = this;

      other.items.forEach(function (otherNutrient) {
        var thisNutrient = self.find(otherNutrient.code);
        if (thisNutrient) {
          thisNutrient.setValue(thisNutrient.value + otherNutrient.value);
        } else {
          self.push(angular.copy(otherNutrient));
        }
      });
    }

    /**
     * Subtract given collection nutrients from current nutrients.
     * Nutrients from other collection, which are not present in current collection are ignored.
     *
     * @param {NutrientCollection} other collection
     */
    function subtract(other) {
      /*jshint validthis:true */
      this.items.forEach(function (nutrient) {
        var otherNutrient = other.find(nutrient.code);
        if (otherNutrient) {
          nutrient.setValue(nutrient.value - otherNutrient.value);
        }
      });
    }

    /**
     * Build new empty collection.
     *
     * @returns {NutrientCollection}
     */
    function build() {
      return new NutrientCollection();
    }

    /**
     * Build new collection and fill it with given JSON values.
     * Object is expected to have properties with codes of nutrients and nutrient values, e.g:
     * {
     *   energy: 1000,
     *   protein: 25,
     *   carbohydrate: 50,
     *   ...
     * }
     * Invalid codes will be ignored.
     *
     * @param json
     */
    function fromJson(json) {
      var collection = build();
      for (var nutrient in json) {
        if (json.hasOwnProperty(nutrient) && NutrientFactory.isValidCode(nutrient)) {
          collection.push(NutrientFactory.build(nutrient, json[nutrient]));
        }
      }

      return collection;
    }

    /**
     * Convert collection into JSON with following format:
     * {
     *   energy: 1000,
     *   protein: 25,
     *   carbohydrate: 50,
     *   ...
     * }
     *
     * @returns {{}}
     */
    function toJson() {
      /*jshint validthis:true */
      var json = {};
      this.items.forEach(function (nutrient) {
        json[nutrient.code] = nutrient.value;
      });

      return json;
    }
  }
})();
