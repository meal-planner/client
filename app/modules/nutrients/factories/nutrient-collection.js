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
     * Construct empty collection.
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
    NutrientCollection.prototype.toObject = toObject;
    NutrientCollection.build = build;
    NutrientCollection.fromObject = fromObject;

    return NutrientCollection;

    /**
     * Add nutrient to collection.
     *
     * @param {Nutrient} item
     */
    function push(item) {
      this.items.push(item);
    }

    /**
     * Find nutrient in collection by code.
     *
     * @param {string} code
     * @returns {Nutrient|boolean}
     */
    function find(code) {
      var index = -1;
      this.items.some(function (nutrient, position) {
        if (nutrient.code == code) {
          index = position;
          return true;
        }
      });

      return index !== -1
        ? this.items[index]
        : false;
    }

    /**
     * Remove nutrient from collection.
     *
     * @param {Nutrient} item
     */
    function remove(item) {
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
     * Build new collection and fill it with given object values.
     * Object is expected to have properties with codes of nutrients and nutrient values, e.g:
     * {
     *   energy: 1000,
     *   protein: 25,
     *   carbohydrate: 50,
     *   ...
     * }
     * Invalid codes will be ignored.
     *
     * @param object
     */
    function fromObject(object) {
      var collection = build();
      for (var nutrient in object) {
        if (object.hasOwnProperty(nutrient) && NutrientFactory.isValidCode(nutrient)) {
          collection.push(NutrientFactory.build(nutrient, object[nutrient]));
        }
      }

      return collection;
    }

    /**
     * Convert collection into plain object in following format:
     * {
     *   energy: 1000,
     *   protein: 25,
     *   carbohydrate: 50,
     *   ...
     * }
     *
     * @returns {{}}
     */
    function toObject() {
      var object = {};
      this.items.forEach(function (nutrient) {
        object[nutrient.code] = nutrient.value;
      });

      return object;
    }
  }
})();
