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
    "url": "assets/_...all_-fc6a659a.js",
    "revision": null
  }, {
    "url": "assets/404-d973e901.js",
    "revision": null
  }, {
    "url": "assets/app-d5bcd8b7.js",
    "revision": null
  }, {
    "url": "assets/dashboard-1fc3fd8b.js",
    "revision": null
  }, {
    "url": "assets/home-a3b5f8c8.js",
    "revision": null
  }, {
    "url": "assets/index-b50e32ef.css",
    "revision": null
  }, {
    "url": "assets/openai-davinci-003-prompt-tester-a379aab8.js",
    "revision": null
  }, {
    "url": "assets/prompt-manager-3a50c81b.js",
    "revision": null
  }, {
    "url": "assets/prompt-manager-8dbdedb5.css",
    "revision": null
  }, {
    "url": "assets/virtual_pwa-register-c6c6e451.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-295a6886.js",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "9825330871b604d0577e0bbd4d44fc1a"
  }, {
    "url": "openai-davinci-003-prompt-tester.html",
    "revision": "4bacd5bdaf15128ca681ea12e373366e"
  }, {
    "url": "prompt-manager.html",
    "revision": "136522231068a29d67b51d84296edbdc"
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
