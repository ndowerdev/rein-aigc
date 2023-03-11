/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-01d9f47c'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/_...all_-dc68c857.js",
    "revision": null
  }, {
    "url": "assets/404-2d2ea36c.js",
    "revision": null
  }, {
    "url": "assets/app-047b8541.js",
    "revision": null
  }, {
    "url": "assets/dashboard-4b096b34.js",
    "revision": null
  }, {
    "url": "assets/home-012390be.js",
    "revision": null
  }, {
    "url": "assets/index-b50e32ef.css",
    "revision": null
  }, {
    "url": "assets/openai-davinci-003-prompt-tester-6577c427.js",
    "revision": null
  }, {
    "url": "assets/prompt-manager-8dbdedb5.css",
    "revision": null
  }, {
    "url": "assets/prompt-manager-a3a4fe90.js",
    "revision": null
  }, {
    "url": "assets/virtual_pwa-register-3d048c92.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-295a6886.js",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "1d75d5143a0fa858a926e0b5d01b1f59"
  }, {
    "url": "openai-davinci-003-prompt-tester.html",
    "revision": "32357cf436f6fc2e88315ecd2859b5e2"
  }, {
    "url": "prompt-manager.html",
    "revision": "ccb5b13c5c3e92fb6654abab361335d8"
  }, {
    "url": "favicon.svg",
    "revision": "20abca606d1a2d69bb6f830f502d24e7"
  }, {
    "url": "manifest.webmanifest",
    "revision": "37e8d18026b05432f623fc5efac2b4b1"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
