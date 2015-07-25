(function () {
  'use strict';

  describe('Factory: NutrientCollectionFactory', function () {
    var nutrientFactory,
      nutrientCollectionFactory;

    beforeEach(module('mealPlanner'));
    beforeEach(inject(function (NutrientFactory, NutrientCollectionFactory) {
      nutrientFactory = NutrientFactory;
      nutrientCollectionFactory = NutrientCollectionFactory;
    }));

    describe('building empty collection', function () {
      var nutrient,
        collection;
      beforeEach(function () {
        nutrient = nutrientFactory.build('energy', 100);
        collection = nutrientCollectionFactory.build();
      });

      it('adds a nutrient to collection', function () {
        collection.push(nutrient);

        expect(collection.items.length).toEqual(1);
      });

      it('finds nutrient in collection by code', function () {
        collection.push(nutrient);

        var foundItem = collection.find('energy');
        expect(foundItem.label).toEqual('Calories');
        var notFoundItem = collection.find('bad_nutrient');
        expect(notFoundItem).toBeFalsy();
      });

      it('removes nutrient from collection', function () {
        collection.push(nutrient);
        collection.remove(nutrient);

        expect(collection.items.length).toEqual(0);

        var carbohydrate = nutrientFactory.build('carbohydrate', 10);
        collection.push(carbohydrate);
        expect(collection.items.length).toEqual(1);
      });
    });

    describe('building collection from hash-object', function () {
      it('builds collection', function () {
        var collection = nutrientCollectionFactory.fromJson({
          energy: 100,
          carbohydrate: 10
        });

        expect(collection.items.length).toEqual(2);
        expect(collection.find('carbohydrate').label).toEqual('Total Carbs');
      });

      it('ignores invalid nutrients', function () {
        var collection = nutrientCollectionFactory.fromJson({
          energy: 100,
          bad_nutrient: 1
        });

        expect(collection.items.length).toEqual(1);
      });
    });

    describe('adding two collections', function () {
      it('merges collections and sums up all nutrients', function () {
        var collectionA = nutrientCollectionFactory.fromJson({
          energy: 100,
          carbohydrate: 20.2,
          protein: 10.21
        });
        var collectionB = nutrientCollectionFactory.fromJson({
          energy: 50.01,
          protein: 5.7,
          fat: 20
        });

        collectionA.sum(collectionB);
        expect(collectionA.find('energy').value).toEqual(150.01);
        expect(collectionA.find('carbohydrate').value).toEqual(20.2);
        expect(collectionA.find('protein').value).toEqual(15.91);
        expect(collectionA.find('fat').value).toEqual(20);
      });

      it('creates a copy of nutrient if it is missing in left collection', function () {
        var collectionA = nutrientCollectionFactory.build();
        var collectionB = nutrientCollectionFactory.fromJson({
          energy: 100,
          carbohydrate: 20.2,
          protein: 10.21
        });
        var collectionC = nutrientCollectionFactory.fromJson({
          energy: 50,
          carbohydrate: 9.8,
        });

        collectionA.sum(collectionB);
        collectionA.sum(collectionC);

        expect(collectionA.find('energy').value).toEqual(150);
        expect(collectionA.find('carbohydrate').value).toEqual(30);
        expect(collectionB.find('energy').value).toEqual(100);
        expect(collectionC.find('energy').value).toEqual(50);
      });
    });

    describe('subtracting one collection from another', function () {
      it('subtracts only those nutrients, which are present in left collection', function () {
        var collectionA = nutrientCollectionFactory.fromJson({
          energy: 100,
          carbohydrate: 20.2,
        });
        var collectionB = nutrientCollectionFactory.fromJson({
          energy: 50.01,
          fat: 20
        });

        collectionA.subtract(collectionB);

        expect(collectionA.find('energy').value).toEqual(49.99);
        expect(collectionA.find('carbohydrate').value).toEqual(20.2);
      });
    });

    describe('converting collection to JSON', function () {
      it('creates object from collection', function () {
        var collection = nutrientCollectionFactory.build();
        var energy = nutrientFactory.build('energy', 100.01);
        var protein = nutrientFactory.build('protein', 15.5);
        collection.push(energy);
        collection.push(protein);
        var json = collection.toJson();

        expect(json.energy).toEqual(100.01);
        expect(json.protein).toEqual(15.5);
      });
    });
  });
})();
