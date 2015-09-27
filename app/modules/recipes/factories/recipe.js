(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mealPlanner.recipes.factory:RecipeFactory
   * @description
   * # RecipeFactory
   * Recipe factory builds recipe instances.
   */
  angular
    .module('mealPlanner.recipes')
    .factory('RecipeFactory', RecipeFactory);

  /* @ngInject */
  function RecipeFactory(NutrientCollectionFactory, IngredientService) {
    /**
     * Recipe constructor.
     *
     * @constructor
     */
    function Recipe() {
      var self = this;

      self.cuisine = {};
      self.key_ingredient = {};
      self.diet = {};
      self.ingredients = [];
      self.steps = [''];
      self.nutrients = NutrientCollectionFactory.build();
    }

    Recipe.prototype.loadIngredients = loadIngredients;
    Recipe.prototype.addIngredient = addIngredient;
    Recipe.prototype.setServings = setServings;
    Recipe.prototype.toJson = toJson;
    Recipe.fromJson = fromJson;
    Recipe.build = build;

    return Recipe;

    /**
     * Build empty recipe.
     *
     * @returns {Recipe}
     */
    function build() {
      return new Recipe();
    }

    /**
     * Build recipe from backend API response.
     * Expected response structure is following:
     * {
     *  id: 'string',
     *  name: 'string',
     *  time_to_cook: 'integer',
     *  servings: 'integer',
     *  ingredients: [
     *    {
     *      id: 'string',
     *      name: 'string',
     *      image_url: 'string',
     *      measure: 'string',
     *      measure_amount: 'integer'
     *    },
     *    ...
     *  ]
     *  nutrients: {
     *  energy: 'decimal',
     *  protein: 'decimal',
     *  ...,
     *  steps: [
     *    'string',
     *    ...
     *  ]
     * }
     *
     * @param data
     * @returns {Recipe}
     */
    function fromJson(data) {
      var recipe = build();

      recipe.id = data.id;
      recipe.can_edit = data.can_edit;
      recipe.name = data.name;
      recipe.time_to_cook = data.time_to_cook;
      recipe.dish_type = data.dish_type;
      recipe.cuisine = arrayToObject(data.cuisine);
      recipe.key_ingredient = arrayToObject(data.key_ingredient);
      recipe.diet = arrayToObject(data.diet);
      recipe.servings = data.servings || 1;
      recipe.ingredients = data.ingredients;
      recipe.nutrients = NutrientCollectionFactory.fromJson(data.nutrients);
      recipe.setServings(1);
      recipe.steps = data.steps;

      return recipe;

      /**
       * Create an object from array with array values as object keys, e.g.
       * ['American', 'Mexican'] converts to {American: true, Mexican: true}
       *
       * @param array
       * @returns {*}
       */
      function arrayToObject(array) {
        if (array !== undefined && array.constructor === Array) {
          return array.reduce(function (obj, key) {obj[key] = true; return obj;}, {});
        } else {
          return {};
        }
      }
    }

    /**
     * Convert recipe model to JSON for storage in backend.
     *
     * @returns {}
     */
    function toJson() {
      /*jshint validthis:true */
      var self = this;
      var json = {
        id: self.id,
        name: self.name,
        time_to_cook: self.time_to_cook,
        dish_type: self.dish_type,
        cuisine: getCheckboxes(self.cuisine),
        key_ingredient: getCheckboxes(self.key_ingredient),
        diet: getCheckboxes(self.diet),
        servings: self.servings,
        steps: self.steps,
        ingredients: []
      };

      self.nutrients = NutrientCollectionFactory.build();
      self.ingredients.forEach(function (ingredient) {
        self.nutrients.sum(ingredient.nutrients);
        var recipeIngredient = {
          id: ingredient.id,
          name: ingredient.name,
          image_url: ingredient.imageUrl,
          measure: ingredient.measures[ingredient.selectedMeasure].label,
          measure_amount: ingredient.selectedAmount
        };
        json.ingredients.push(recipeIngredient);
      });
      json.nutrients = self.nutrients.toJson();

      return json;

      /**
       * Get checked checkboxes.
       * Checkboxes are stored in object has in following way:
       * {
       *   CheckboxA: true,
        *  CheckboxB: false
       * }
       *
       * @param object
       * @returns {Array}
       */
      function getCheckboxes(object) {
        var checkboxes = [];
        for (var checkbox in object) {
          if (object.hasOwnProperty(checkbox) && object[checkbox] === true) {
            checkboxes.push(checkbox);
          }
        }

        return checkboxes;
      }
    }

    /**
     * This method loads full ingredients models from ingredient backend API.
     * Ingredients are stored in recipe in following format:
     * Recipe {
     *   ingredients: [
     *     {
     *       id: 'string',
     *       name: 'string',
     *       measure: 'string', <- selected measure of the ingredient for this recipe
     *       measure_amount: 'number' <- selected amount of the ingredient for this recipe
     *     }
     *   ]
     * }
     */
    function loadIngredients() {
      /*jshint validthis:true */
      var ingredients = [];
      this.ingredients.forEach(function (recipeIngredient) {
        IngredientService.getIngredient(recipeIngredient.id).then(function (ingredient) {
          var selectedMeasure = 0;
          ingredient.measures.some(function (measure, index) {
            if (measure.label === recipeIngredient.measure) {
              selectedMeasure = index;
              return true;
            }
          });
          ingredient.selectedMeasure = selectedMeasure;
          ingredient.selectedAmount = recipeIngredient.measure_amount;
          ingredient.updateNutritionValues();
          ingredients.push(ingredient);
        });
      });

      this.ingredients = ingredients;
    }

    /**
     * Add new ingredient to the recipe.
     * Ingredient must be unique.
     *
     * @param {Ingredient} ingredient
     */
    function addIngredient(ingredient) {
      /*jshint validthis:true */
      var self = this;

      if (valid() && unique()) {
        self.ingredients.push(ingredient);
      }

      function valid() {
        return ingredient !== undefined && ingredient.id !== undefined;
      }

      function unique() {
        var isUnique = true;
        self.ingredients.some(function (existing) {
          if (existing.id === ingredient.id) {
            isUnique = false;
            return true;
          }
        });

        return isUnique;
      }
    }

    /**
     * Set selected servings.
     *
     * @param {Number} servings
     */
    function setServings(servings) {
      /*jshint validthis:true */
      var totalServings = this.servings;
      this.nutrients.items.forEach(function (nutrient) {
        nutrient.value *= servings / totalServings;
      });
    }
  }
})();
