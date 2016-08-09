/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';



/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["fonts/material-icons.eot","e79bfd88537def476913f3ed52f4f4b3"],["fonts/material-icons.ttf","a37b0c01c0baf1888ca812cc0508f6e2"],["fonts/material-icons.woff","012cf6a10129e2275d79d6adac7f3b02"],["fonts/material-icons.woff2","570eb83859dc23dd0eec423a49e147fe"],["images/fb.6ad30f08.png","6ad30f08016b3c9222598348ebb7ad02"],["images/google.ae219750.png","ae2197504022a14fac732c048b34732d"],["images/icon.b66a61c7.png","b66a61c7b798db13b0fd31f4080b81d7"],["images/icon.da7b7b91.svg","da7b7b91c3fd56f9c427f166e42ff450"],["images/icons/avatar-default.png","28f320d397c82a7ee7b7696abe977555"],["images/icons/email.svg","b1de32d40914204535c9e8594c588897"],["images/icons/facebook.svg","f9256795928398b4ac9ba238519c6317"],["images/icons/github.svg","4e61fbcb6d6d667cca4e7ee07338afe4"],["images/icons/trello.svg","3af78a64d523c519027980220e6168b2"],["images/icons/twitter.svg","7fb50ba507f4f2877acd30b8a9300f35"],["images/ingredient/beverages-group.png","a203890542e2a9735deb916d35c81ae4"],["images/ingredient/dairy-group.png","e1126ac06ad5a00a4d9bb4be29078aa5"],["images/ingredient/fish-group.png","3e19f098c9d1d6d044acafbea2bd0356"],["images/ingredient/fruits-group.png","5be0f789125406892c22f132c44c8780"],["images/ingredient/grains-group.png","54ff3c13c8a99ef7293c43f583cd0af4"],["images/ingredient/group/beverages-sm.jpg","9fe41b14f7f6be9c58a1877ab05ff0a4"],["images/ingredient/group/beverages.jpg","64a1b000989de2c950f173006cf1af57"],["images/ingredient/group/dairy-sm.jpg","0db32fc8b25799acc272f00cb1cf6799"],["images/ingredient/group/dairy.jpg","1c046d2f2be7809ac4b8891375f49456"],["images/ingredient/group/fish-sm.jpg","6eac0941f68822284e0575e62654760e"],["images/ingredient/group/fish.jpg","97b56c96db907e2f5cdac9565d8e01a8"],["images/ingredient/group/fruits.jpg","5405cd1501139c75663cd02eb9dd793f"],["images/ingredient/group/grains.jpg","01bfcb02ee4c27a4aa10615341ed4b49"],["images/ingredient/group/legumes-sm.jpg","b664051f3f44ccb4a3484491aa922a27"],["images/ingredient/group/legumes.jpg","99020cfc9bc5e19c8a0e95bd9da8e32b"],["images/ingredient/group/meat.jpg","eb196dd319f3cd6768e946f3c6cd7d4d"],["images/ingredient/group/nuts-sm.jpg","3429f9c68cf8b3144130eadf9fd18b2e"],["images/ingredient/group/nuts.jpg","057503177a8188505c966f93a94b33bb"],["images/ingredient/group/other-sm.jpg","742e7ec4fb690feb7841a4040de65b65"],["images/ingredient/group/other.jpg","3879d4598e38594a3907f1a622813519"],["images/ingredient/group/poultry-sm.jpg","62cca127df2f56d1ab282df0b2be6839"],["images/ingredient/group/poultry.jpg","02f249649b5ef3feaa7775541172b089"],["images/ingredient/group/sweets.jpg","70af03d36d0eb404bcec56d135540168"],["images/ingredient/group/vegetables.jpg","16d3d6c3aef2a818c82a862ae3ff8cbc"],["images/ingredient/legumes-group.png","c54d106c5f755c8c29827aef8512b58e"],["images/ingredient/meat-group.png","9fcdb2d65191f1641938afbcedab3892"],["images/ingredient/nuts-group.png","db7cdd00399578fc579d8c5f6f41a629"],["images/ingredient/other-group.png","7e67d8ea0eb9802d3b4068604cc35ffc"],["images/ingredient/poultry-group.png","305b2a9a7cd9b4ea742f0f48d0e6c5c7"],["images/ingredient/sweets-group.png","1539ee02f6bb7bd62ba1fee5762ef3e6"],["images/ingredient/vegetables-group.png","b2114c6daad77c3acd71030c107a929a"],["images/logo-black.827063f1.svg","827063f1b0bdc3e3532ae3665bbdded5"],["images/logo.cb6fb02b.png","cb6fb02bd6f2eb8e344871c8cb3c4829"],["images/recipe/group/cuisine/african.jpg","1e35ba29bccc2a847aaf3c29ffbd9d4e"],["images/recipe/group/cuisine/american-sm.jpg","96fa8c25ceba67e08312e17ccafcf5d5"],["images/recipe/group/cuisine/american.jpg","d33d168a925a6a3aa67954d89fa20f4b"],["images/recipe/group/cuisine/british.jpg","205658a3180ac38acecea7b3eea3c58d"],["images/recipe/group/cuisine/chinese.jpg","28760336ace92cbe38e452b7190dd29c"],["images/recipe/group/cuisine/east-european.jpg","c5ccccafefb2e1b2e3ad5f24e56a455d"],["images/recipe/group/cuisine/indian.jpg","c2f3af89fb264d1f7ecf7b02488d6f26"],["images/recipe/group/cuisine/irish.jpg","8252b703484d4e1d48108551d2a20ab0"],["images/recipe/group/cuisine/italian-sm.jpg","3bb35305512f41126b42e48fc3838051"],["images/recipe/group/cuisine/italian.jpg","228049b75a8a69600ebeb0ab2a12649d"],["images/recipe/group/cuisine/japanese.jpg","da31361f0c7d8f7647fff79ee0ceb1ce"],["images/recipe/group/cuisine/mediterranean-sm.jpg","6c2b363dda9d1c47e537078e4b776eeb"],["images/recipe/group/cuisine/mediterranean.jpg","7d7fd0290e53ede7c5000180fa79f1e9"],["images/recipe/group/cuisine/mexican.jpg","46e1882f08af16326b5fb47f62b4b647"],["images/recipe/group/cuisine/russian.jpg","395457aef224a05f3cc8a0c2f8339746"],["images/recipe/group/cuisine/south-asian-sm.jpg","5e717871e55902321f28d42cd4f181d6"],["images/recipe/group/cuisine/south-asian.jpg","0e17d8da68f8b95f5c3149889aa6378c"],["images/recipe/group/cuisine/western-sm.jpg","30c9ee8021b47c75412734194ee1e422"],["images/recipe/group/cuisine/western.jpg","dd9dccc7493612059881c08619a09e62"],["images/recipe/group/diet/dairy-free.jpg","f82992d68940e72b6fab41f7864302ad"],["images/recipe/group/diet/gluten-free.jpg","716bbca8449748d8fd75e5098d983ae6"],["images/recipe/group/diet/mediterranean-sm.jpg","50b6941f78fe57cb3b1d6f5bdfcb2cdd"],["images/recipe/group/diet/mediterranean.jpg","f41f3b3b22f92d10e36bce5effc4b801"],["images/recipe/group/diet/raw-food-sm.jpg","bc56a7d87b98a0e565d06aae7eb066ec"],["images/recipe/group/diet/raw-food.jpg","5d1daa45c46c189956adca2d92945cc6"],["images/recipe/group/diet/vegan.jpg","646f021f99c77ab44b0aca8e8ca21cb5"],["images/recipe/group/diet/vegetarian-sm.jpg","ac3ce35eabeca663bad2ed24f2a3d7f9"],["images/recipe/group/diet/vegetarian.jpg","3cc0c2ae9d88d8dc92ad96a5aa32284b"],["images/recipe/group/dish-type/appetizers.jpg","5df0b103e6050a467ca73dde83d71ee9"],["images/recipe/group/dish-type/breakfast.jpg","44d4ef0c33cf55bca00bf87e7dd93158"],["images/recipe/group/dish-type/cakes-sm.jpg","8eb72364d15975f7b142ea0212da7cde"],["images/recipe/group/dish-type/cakes.jpg","7c28de51080226945328e16fb70e149e"],["images/recipe/group/dish-type/casseroles-sm.jpg","e8d03c73b3f5bc4db1bde5476b08980c"],["images/recipe/group/dish-type/casseroles.jpg","853df1f9663256e4fb596515efc3d40f"],["images/recipe/group/dish-type/drinks.jpg","c6744c440c0b94926e0859d514799cc3"],["images/recipe/group/dish-type/main-dishes-sm.jpg","3ea0cca3ea8817e7910d2e7629e2d8fd"],["images/recipe/group/dish-type/main-dishes.jpg","caeed5f6bfbf38fc83c0985bde7261c1"],["images/recipe/group/dish-type/pasta.jpg","3fdaed1a431287bde71d8a4e4e53538d"],["images/recipe/group/dish-type/pizzas.jpg","e95118f5f2fee4623befa7544b852bf9"],["images/recipe/group/dish-type/roasts-sm.jpg","1bf05919ca45bd876b4deb8fc40b6fa4"],["images/recipe/group/dish-type/roasts.jpg","17045f8be157cbfd8ac4b25b2f9cfd01"],["images/recipe/group/dish-type/salads.jpg","3d58df7fb337bc823dc044c5fa5a2017"],["images/recipe/group/dish-type/sandwiches.jpg","e0338419e37309bfd0a364688fb3cc35"],["images/recipe/group/dish-type/side-dishes-sm.jpg","2cefd5e0354275cdefb249c9b75903aa"],["images/recipe/group/dish-type/side-dishes.jpg","7a5233c85bce8ff17bcc508ba012b474"],["images/recipe/group/dish-type/snacks.jpg","b29e34e45e05972254d88c6ac2b6a81d"],["images/recipe/group/dish-type/soups.jpg","9f0cfd6ba8c05780c5203489e52e4591"],["images/recipe/group/ingredient/beef.jpg","b9be78f5090d9f4bef568f290f40b028"],["images/recipe/group/ingredient/bread-sm.jpg","ea9afda5162fb1836e2a74a6fdd5b5e2"],["images/recipe/group/ingredient/bread.jpg","1f92afd04ee4dc7984af68f07c3e27e8"],["images/recipe/group/ingredient/chicken.jpg","05f22b114ba7773b2a5253642a571783"],["images/recipe/group/ingredient/chocolate-sm.jpg","92239da6142d4aeb3f37b604263112e5"],["images/recipe/group/ingredient/chocolate.jpg","bb045dd9315cd540b1a8f2884ae06aaa"],["images/recipe/group/ingredient/duck.jpg","ff81b94d916e18091d44eb329bbafe42"],["images/recipe/group/ingredient/eggs.jpg","4c917b818fad0a692c02587fa2e8e772"],["images/recipe/group/ingredient/fish-sm.jpg","c9c4eaa4630fbf6645b3dcb2b538eb9a"],["images/recipe/group/ingredient/fish.jpg","0a69854bcdf4a661dcafc843d5d74d6e"],["images/recipe/group/ingredient/fruits-sm.jpg","520354a05a0c0cd5e9f0300da17020e4"],["images/recipe/group/ingredient/fruits.jpg","330f0931a5d3923ac7274e571526860d"],["images/recipe/group/ingredient/lamb.jpg","282c8855e2bf36b17c36899560e2bac3"],["images/recipe/group/ingredient/pasta.jpg","b3df2039078be693a831ce9b4d86b027"],["images/recipe/group/ingredient/pork.jpg","aac7cb6f0ac1b439870a675f04d861cc"],["images/recipe/group/ingredient/rice.jpg","8543692a2d8fb4edb6e2bf69723af478"],["images/recipe/group/ingredient/seafood-sm.jpg","2f887bb1ea477cfdb4d4e2ee78d9bccc"],["images/recipe/group/ingredient/seafood.jpg","6a3881acf61cd21b6c3badcb24f3efea"],["images/recipe/group/ingredient/turkey.jpg","6028e08faa66874f22052bf306185dde"],["images/recipe/group/ingredient/vegetables-sm.jpg","60ece760d9d3a2548859e99d04c487d4"],["images/recipe/group/ingredient/vegetables.jpg","5f7ba70f01d65018f8583211b715e141"],["images/twitter.3d3b4ce1.png","3d3b4ce16e295100ada09758037a35e7"],["index.html","2fe51fdc64348640f2a34f5517bf809e"],["modules/ingredients/data/groups.json","75b9747a12c5d6eb2794bccc0521454c"],["modules/ingredients/views/directive.add-measure.html","cdd295fe7b62ead04ade4636465725a0"],["modules/ingredients/views/directive.edit-measure.html","8b9a01ac7487a51dace3ca56a91ed2cc"],["modules/ingredients/views/directive.ingredient.html","f02db2d4906af994022bae1ef2f2249d"],["modules/ingredients/views/directive.measure-selector.html","18348c929b0f545c88fb639d9a5949d8"],["modules/ingredients/views/directive.nutrient.html","89404994e9b97aa5dd757e010eaff7b5"],["modules/ingredients/views/edit.html","3b0fb8a3ef104ac96675964010d70b73"],["modules/ingredients/views/groups.html","f4618191df19d27dbb2da4bf4df43f37"],["modules/ingredients/views/list.html","74abdb605774574a89dad23b91938db8"],["modules/ingredients/views/nutrient-selector.html","c1ebff630d45fc359d4c804c56bd63e3"],["modules/ingredients/views/view.html","b3c398c5ca127dc8847481c61754a1a2"],["modules/navigation/views/footer.html","7e2efdd071625e3bf380bf4d1f24c594"],["modules/navigation/views/navbar.html","488b201464be8fc9579fbb342099f469"],["modules/navigation/views/popup.html","b94d6d7e4dba5b8ce2db38a7ccb0ff55"],["modules/nutrients/data/daily_values.json","83b98a9893cc82a00d788fca5488fafb"],["modules/nutrients/views/energy-chart.html","f5517b5f2acbc636767d5442cedae786"],["modules/nutrients/views/label.html","4c677bbf01d8290bfde336175191db0d"],["modules/nutrients/views/nutrient-table.html","8da21e0b56a10ad3ef8a27c34374e79b"],["modules/planner/views/directive.plan-day.html","5b5c04e1db55b6856d563998965feba0"],["modules/planner/views/meal-selector.html","6759620d635737b57648933f08550a08"],["modules/planner/views/planner.html","6e3cbf60f8f6dc54eb11a9904bac02e4"],["modules/recipes/data/groups.json","6b6db5536a020c3b7a7d9d29cabfbf55"],["modules/recipes/views/directive.ingredient-list.html","b298d7f23c2cecba9627e526d93fa3de"],["modules/recipes/views/directive.ingredient-picker.html","d39048714a5128a8e85ca0583f32970e"],["modules/recipes/views/directive.recipe-info.html","795d47086db2474819a71327e11cce9f"],["modules/recipes/views/directive.recipe-item.html","f792642c73b5e6e3d14b4bec5688c870"],["modules/recipes/views/directive.recipe-steps.html","3f841b164ca828077e5e3c57a2611eae"],["modules/recipes/views/edit.html","3cf59824c4061b860a4d158dfec2a772"],["modules/recipes/views/groups.html","a45ca4328a7fbbc41574345d1ca09c4d"],["modules/recipes/views/ingredient-browser.html","488934f9dbcb0b5815885f3f686953c8"],["modules/recipes/views/list.html","d7e2fa4ddce65c45fde6badd97f1ea95"],["modules/recipes/views/view.html","d06beefe8aa8f9c676488f856b68a209"],["modules/users/views/forgot-password.html","961abed08a342cd96b7d6aff36a3ba2d"],["modules/users/views/login.html","69793e25faf8096fa834aaa9cd5777a9"],["modules/users/views/profile.html","e9f832ef5a95562875bdcbb6e0e8136b"],["modules/users/views/reset-password.html","1b2a847388baf0dd17e08eabd4726820"],["modules/users/views/signup.html","658250548cdfcb20a824ace90419fd3d"],["scripts/chart.da73dc2f.js","da73dc2f0ddd97814398347b415fbefb"],["scripts/oldieshim.f39cec8a.js","f39cec8a90577c6d06729c5f881dd51b"],["scripts/scripts.1b014f51.js","1b014f519f22d5b108af57dbb0e98e6e"],["scripts/vendor.3c86d52b.js","3c86d52b0267d3894594a67b467d3cf9"],["styles/main.f06db265.css","f06db2651d4d87a8028b412f242d5dfe"],["styles/vendor.b27e846f.css","b27e846f8ad0284dc44fd14cabcea7b6"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-mealplanner-72458a7-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, now) {
    now = now || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') + 'sw-precache=' + now;

    return urlWithCacheBusting.toString();
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) === -1;
        }).map(function(cacheName) {
          var urlWithCacheBusting = getCacheBustedUrl(CurrentCacheNamesToAbsoluteUrl[cacheName],
            now);

          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName], response);
              }

              console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) === 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html')) {
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


/* @preserve Tue, 09 Aug 2016 12:42:42 GMT */