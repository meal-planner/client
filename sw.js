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
var PrecacheConfig = [["fonts/material-icons.eot","e79bfd88537def476913f3ed52f4f4b3"],["fonts/material-icons.ttf","a37b0c01c0baf1888ca812cc0508f6e2"],["fonts/material-icons.woff","012cf6a10129e2275d79d6adac7f3b02"],["fonts/material-icons.woff2","570eb83859dc23dd0eec423a49e147fe"],["images/fb.76781906.png","76781906bcbad052d6df6f911f31fcea"],["images/google.0ffa9989.png","0ffa9989a5670c8b0946def4aba1de4a"],["images/icon.8696ead8.png","8696ead89837239490c26539ed8c12b1"],["images/icon.88dbc457.svg","88dbc457453f6457efc4d4ce81c0d1fa"],["images/icons/avatar-default.png","423b19c9f0e48be25bb3524b13b369d8"],["images/icons/email.svg","8ced2efced10b889db511839339f8e2e"],["images/icons/facebook.svg","cc9926c5e09e322ec9b7ffbc0cb5509b"],["images/icons/github.svg","2cbdcadf0d267532e87c3c5ea5fb8670"],["images/icons/trello.svg","d8f066946cf65d7845fd87d3041b5942"],["images/icons/twitter.svg","46ec27ae54d406625cfc51fa0b95c6e1"],["images/ingredient/beverages-group.4db0d2d4.png","4db0d2d440372359e745b8c80e98f7cd"],["images/ingredient/dairy-group.92f4c8ab.png","92f4c8ab2c29753ccab66a93ae9dcbec"],["images/ingredient/fish-group.d099bfef.png","d099bfef101a8677e9152b3eb7d7238c"],["images/ingredient/fruits-group.feda91c7.png","feda91c7e625c7c2984f2e22b6155851"],["images/ingredient/grains-group.052102fc.png","052102fc09ca1525b1a1cd958571fb6d"],["images/ingredient/legumes-group.a80a768e.png","a80a768ea91e7f712cdb18c73cae3f29"],["images/ingredient/meat-group.19a77ea1.png","19a77ea19d63b49e2466996d45bb23d6"],["images/ingredient/nuts-group.3d321bc2.png","3d321bc2bc69fa05fd6346db168759b9"],["images/ingredient/other-group.0306f959.png","0306f959d6fec0e7957334bd82ff5011"],["images/ingredient/poultry-group.cd8cc5a5.png","cd8cc5a538d76f24b1e4e75e66014d15"],["images/ingredient/sweets-group.fe113e22.png","fe113e2233ce3b7911c6e61b70378b13"],["images/ingredient/vegetables-group.e39fe94a.png","e39fe94ae0b189a27a028ada45ce8fe2"],["images/logo-big.628605c5.png","628605c59f48560d5b53d010a6f500ba"],["images/logo-black.195f0634.svg","195f063431fabc4ef4eab4fdd161c360"],["images/logo-black.2795d17d.png","2795d17d0ef6e5e805a041adfc6d2dfe"],["images/logo.2b95749d.png","2b95749d57125f64fcf19ce2b303b8f4"],["images/twitter.1d24a714.png","1d24a7145b0f3ab7ef1378b7d07f6939"],["index.html","fb8ef3800ee352895f589d8b87455138"],["modules/ingredients/data/group.json","41d55274aa1ba80e1c6d215d2f306b5d"],["modules/ingredients/views/directive.add-measure.html","cdd295fe7b62ead04ade4636465725a0"],["modules/ingredients/views/directive.edit-measure.html","8b9a01ac7487a51dace3ca56a91ed2cc"],["modules/ingredients/views/directive.ingredient.html","f02db2d4906af994022bae1ef2f2249d"],["modules/ingredients/views/directive.measure-selector.html","18348c929b0f545c88fb639d9a5949d8"],["modules/ingredients/views/directive.nutrient.html","89404994e9b97aa5dd757e010eaff7b5"],["modules/ingredients/views/edit.html","3b0fb8a3ef104ac96675964010d70b73"],["modules/ingredients/views/groups.html","71606c2c4d135df995ec6560b1a3d226"],["modules/ingredients/views/list.html","74abdb605774574a89dad23b91938db8"],["modules/ingredients/views/nutrient-selector.html","c1ebff630d45fc359d4c804c56bd63e3"],["modules/ingredients/views/view.html","b3c398c5ca127dc8847481c61754a1a2"],["modules/navigation/views/footer.html","7e2efdd071625e3bf380bf4d1f24c594"],["modules/navigation/views/navbar.html","ad2f75603d4e9e7b3fb1d8369aa6dea8"],["modules/navigation/views/popup.html","b94d6d7e4dba5b8ce2db38a7ccb0ff55"],["modules/nutrients/data/daily_values.json","83b98a9893cc82a00d788fca5488fafb"],["modules/nutrients/views/energy-chart.html","f5517b5f2acbc636767d5442cedae786"],["modules/nutrients/views/label.html","4c677bbf01d8290bfde336175191db0d"],["modules/nutrients/views/nutrient-table.html","8da21e0b56a10ad3ef8a27c34374e79b"],["modules/planner/views/directive.plan-day.html","5b5c04e1db55b6856d563998965feba0"],["modules/planner/views/meal-selector.html","d6d6206b0d9ad64cd33e4fde26145656"],["modules/planner/views/planner.html","6e3cbf60f8f6dc54eb11a9904bac02e4"],["modules/recipes/data/cuisine.json","0e846e4a96db9fba77625a2c939a7016"],["modules/recipes/data/diet.json","fd36b0d9d33ff3c60925dca48b86b7e1"],["modules/recipes/data/dish_type.json","0e489118ecaf28a8732f2605337c5263"],["modules/recipes/data/key_ingredient.json","bfc7233eebdda185611ac5d78b0e0f43"],["modules/recipes/views/directive.ingredient-list.html","b298d7f23c2cecba9627e526d93fa3de"],["modules/recipes/views/directive.ingredient-picker.html","d39048714a5128a8e85ca0583f32970e"],["modules/recipes/views/directive.recipe-info.html","795d47086db2474819a71327e11cce9f"],["modules/recipes/views/directive.recipe-item.html","f792642c73b5e6e3d14b4bec5688c870"],["modules/recipes/views/directive.recipe-steps.html","3f841b164ca828077e5e3c57a2611eae"],["modules/recipes/views/edit.html","3cf59824c4061b860a4d158dfec2a772"],["modules/recipes/views/groups.html","e5d0edb29bd5d26b31dfd2ed64b8c159"],["modules/recipes/views/ingredient-browser.html","488934f9dbcb0b5815885f3f686953c8"],["modules/recipes/views/list.html","d7e2fa4ddce65c45fde6badd97f1ea95"],["modules/recipes/views/view.html","d06beefe8aa8f9c676488f856b68a209"],["modules/users/views/forgot-password.html","961abed08a342cd96b7d6aff36a3ba2d"],["modules/users/views/login.html","1b31ca3ac4802807dcf60dfff04b06cf"],["modules/users/views/profile.html","e9f832ef5a95562875bdcbb6e0e8136b"],["modules/users/views/reset-password.html","1b2a847388baf0dd17e08eabd4726820"],["modules/users/views/signup.html","658250548cdfcb20a824ace90419fd3d"],["scripts/oldieshim.f39cec8a.js","f39cec8a90577c6d06729c5f881dd51b"],["scripts/scripts.84217e33.js","84217e335ddbc437db9d900ad363e67b"],["scripts/vendor.5a170dfd.js","5a170dfdcb639dd4853be8d974608640"],["styles/main.f250b0ae.css","f250b0aeb4b428089c9e1dd48443c9ce"],["styles/vendor.47524aa9.css","47524aa927f9ac10b5a354962bfc61ca"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-mealplanner-8bfb098-' + (self.registration ? self.registration.scope : '') + '-';


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


/* @preserve Fri, 05 Aug 2016 13:51:01 GMT */