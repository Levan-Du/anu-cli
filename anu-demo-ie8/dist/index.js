/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "b7081b76593d65e3fe0a"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	__webpack_require__(11);
	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, "html,\r\nbody {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nul,\r\nli {\r\n    list-style: none;\r\n}\r\n\r\n.clearfix:after {\r\n    content: \"\";\r\n    display: block;\r\n    height: 0;\r\n    visibility: hidden;\r\n    clear: both;\r\n}\r\n\r\n#example {\r\n    height: 100%;\r\n}\r\n", ""]);
	
	// exports


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 兼容IE6-8的版本，有问题请加QQ 370262116 by 司徒正美 Copyright 2017-07-28
	 */
	
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.React = factory());
	}(this, (function () {
	
	var __type = Object.prototype.toString;
	var __push = Array.prototype.push;
	
	var HTML_KEY = "dangerouslySetInnerHTML";
	
	/**
	 * 复制一个对象的属性到另一个对象
	 *
	 * @param {any} obj
	 * @param {any} props
	 * @returns
	 */
	function extend(obj, props) {
	  if (props) {
	    for (var i in props) {
	      if (props.hasOwnProperty(i)) obj[i] = props[i];
	    }
	  }
	  return obj;
	}
	/**
	 * 一个空函数
	 *
	 * @export
	 */
	function noop() {}
	
	/**
	 * 类继承
	 *
	 * @export
	 * @param {any} SubClass
	 * @param {any} SupClass
	 */
	function inherit(SubClass, SupClass) {
	  function Bridge() {}
	  Bridge.prototype = SupClass.prototype;
	
	  var fn = SubClass.prototype = new Bridge();
	
	  // 避免原型链拉长导致方法查找的性能开销
	  extend(fn, SupClass.prototype);
	  fn.constructor = SubClass;
	  return fn;
	}
	
	/**
	 * 收集一个元素的所有孩子
	 *
	 * @export
	 * @param {any} dom
	 * @returns
	 */
	function getNodes(dom) {
	  var ret = [],
	      c = dom.childNodes || [];
	  // eslint-disable-next-line
	  for (var i = 0, el; el = c[i++];) {
	    ret.push(el);
	  }
	  return ret;
	}
	
	var lowerCache = {};
	/**
	 * 小写化的优化
	 * 
	 * @export
	 * @param {any} s 
	 * @returns 
	 */
	function toLowerCase(s) {
	  return lowerCache[s] || (lowerCache[s] = s.toLowerCase());
	}
	
	/**
	 *
	 *
	 * @param {any} obj
	 * @returns
	 */
	function isFn(obj) {
	  return typeNumber(obj) === 5;
	}
	
	var rword = /[^, ]+/g;
	
	function oneObject(array, val) {
	  if (typeNumber(array) === 4) {
	    array = array.match(rword) || [];
	  }
	  var result = {},
	
	  //eslint-disable-next-line
	  value = val !== void 666 ? val : 1;
	  for (var i = 0, n = array.length; i < n; i++) {
	    result[array[i]] = value;
	  }
	  return result;
	}
	
	function getChildContext(instance, context) {
	  if (instance.getChildContext) {
	    return Object.assign({}, context, instance.getChildContext());
	  }
	  return context;
	}
	var rcamelize = /[-_][^-_]/g;
	
	function camelize(target) {
	  //提前判断，提高getStyle等的效率
	  if (!target || target.indexOf("-") < 0 && target.indexOf("_") < 0) {
	    return target;
	  }
	  //转换为驼峰风格
	  return target.replace(rcamelize, function (match) {
	    return match.charAt(1).toUpperCase();
	  });
	}
	
	var options = {
	  beforeUnmount: noop,
	  afterMount: noop,
	  afterUpdate: noop
	};
	
	function checkNull(vnode, type) {
	  if (Array.isArray(vnode) && vnode.length === 1) {
	    vnode = vnode[0];
	  }
	  if (vnode === null || vnode === false) {
	    return { type: "#comment", text: "empty" };
	  } else if (!vnode || !vnode.vtype) {
	    throw new Error("@" + type.name + "#render:You may have returned undefined, an array or some other invalid object");
	  }
	  return vnode;
	}
	var numberMap = {
	  "[object Null]": 1,
	  "[object Boolean]": 2,
	  "[object Number]": 3,
	  "[object String]": 4,
	  "[object Function]": 5,
	  "[object Symbol]": 6,
	  "[object Array]": 7
	};
	// undefined: 0, null: 1, boolean:2, number: 3, string: 4, function: 5, array: 6, object:7
	function typeNumber(data) {
	  if (data === void 666) {
	    return 0;
	  }
	  var a = numberMap[__type.call(data)];
	  return a || 8;
	}
	
	function getComponentProps(vnode) {
	  var defaultProps = vnode.type.defaultProps;
	  var props = vnode.props;
	  if (defaultProps) {
	    for (var i in defaultProps) {
	      //eslint-disable-next-line
	      if (props[i] === void 666) {
	        props[i] = defaultProps[i];
	      }
	    }
	  }
	  return props;
	}
	
	var recyclables = {
	  "#text": [],
	  "#comment": []
	};
	
	var stack = [];
	var EMPTY_CHILDREN = [];
	
	var CurrentOwner = {
	  cur: null
	};
	/**
	 * 创建虚拟DOM
	 *
	 * @param {string} type
	 * @param {object} props
	 * @param {array} ...children
	 * @returns
	 */
	
	function createElement(type, configs) {
	  var props = {},
	      key = null,
	      ref = null,
	      vtype = 1,
	      checkProps = 0;
	
	  for (var i = 2, n = arguments.length; i < n; i++) {
	    stack.push(arguments[i]);
	  }
	  if (configs) {
	    // eslint-disable-next-line
	    for (var _i in configs) {
	      var val = configs[_i];
	      switch (_i) {
	        case "key":
	          key = val;
	          break;
	        case "ref":
	          ref = val;
	          break;
	        case "children":
	          //只要不是通过JSX产生的createElement调用，props内部就千奇百度，
	          //children可能是一个数组，也可能是一个字符串，数字，布尔，
	          //也可能是一个虚拟DOM
	          if (!stack.length && val) {
	            if (Array.isArray(val)) {
	              __push.apply(stack, val);
	            } else {
	              stack.push(val);
	            }
	          }
	          break;
	        default:
	          checkProps = 1;
	          props[_i] = val;
	      }
	    }
	  }
	
	  var children = flattenChildren(stack);
	
	  if (typeNumber(type) === 5) {
	    //fn
	    vtype = type.prototype && type.prototype.render ? 2 : 4;
	    if (children.length) props.children = children;
	  } else {
	    props.children = children;
	  }
	
	  return new Vnode(type, props, key, ref, vtype, checkProps, CurrentOwner.cur);
	}
	
	function flattenChildren(stack) {
	  var lastText,
	      child,
	      deep,
	      children = [];
	
	  while (stack.length) {
	    //比较巧妙地判定是否为子数组
	    if ((child = stack.pop()) && child.pop) {
	      if (child.toJS) {
	        //兼容Immutable.js
	        child = child.toJS();
	      }
	      for (var i = 0; i < child.length; i++) {
	        stack[stack.length] = child[i];
	      }
	    } else {
	      // eslint-disable-next-line
	      var childType = typeNumber(child);
	      if (childType < 3 // 0, 1,2
	      ) {
	          continue;
	        }
	
	      if (childType < 6) {
	        //!== 'object'
	        //不是对象就是字符串或数字
	        if (lastText) {
	          lastText.text = child + lastText.text;
	          continue;
	        }
	        child = {
	          type: "#text",
	          text: child + ""
	        };
	        lastText = child;
	      } else {
	        lastText = null;
	      }
	
	      children.unshift(child);
	    }
	  }
	  if (!children.length) {
	    children = EMPTY_CHILDREN;
	  }
	  return children;
	}
	
	//fix 0.14对此方法的改动，之前refs里面保存的是虚拟DOM
	function getDOMNode() {
	  return this;
	}
	function __ref(dom) {
	  var instance = this._owner;
	  if (dom && instance) {
	    dom.getDOMNode = getDOMNode;
	    instance.refs[this.__refKey] = dom;
	  }
	}
	function Vnode(type, props, key, ref, vtype, checkProps, owner) {
	  this.type = type;
	  this.props = props;
	  this.vtype = vtype;
	
	  if (key) {
	    this.key = key;
	  }
	  if (owner) {
	    this._owner = owner;
	  }
	  if (vtype === 1) {
	    this.checkProps = checkProps;
	  }
	  var refType = typeNumber(ref);
	  if (refType === 4) {
	    //string
	    this.__refKey = ref;
	    this.ref = __ref;
	  } else if (refType === 5) {
	    //function
	    this.ref = ref;
	  }
	  /*
	    this._hostNode = null
	    this._instance = null
	    this._hostParent = null
	  */
	}
	
	Vnode.prototype = {
	  getDOMNode: function getDOMNode() {
	    return this._hostNode || null;
	  },
	
	  $$typeof: 1
	};
	
	function cloneElement(vnode, props) {
	  if (Array.isArray(vnode)) {
	    vnode = vnode[0];
	  }
	  if (!vnode.vtype) {
	    return Object.assign({}, vnode);
	  }
	  var obj = {};
	  if (vnode.key) {
	    obj.key = vnode.key;
	  }
	  if (vnode.__refKey) {
	    obj.ref = vnode.__refKey;
	  } else if (vnode.ref !== __ref) {
	    obj.ref = vnode.ref;
	  }
	
	  return createElement(vnode.type, Object.assign(obj, vnode.props, props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.props.children);
	}
	
	if (0 === [1, 2].splice(0).length) {
	  console.warn("请引入polyfill进行修复");
	}
	
	var scheduler = {
	  list: [],
	  add: function add(el) {
	    this.count = this.list.push(el);
	  },
	  addAndRun: function addAndRun(fn) {
	    this.add(fn);
	    setTimeout(function () {
	      scheduler.run();
	    }, 0);
	  },
	  run: function run(no) {
	    if (this.count === 0) return;
	    this.count = 0;
	    this.list.splice(0).forEach(function (instance) {
	      if (typeNumber(instance) === 5) {
	        instance(); //处理ref方法
	        return;
	      }
	      if (instance._pendingCallbacks.length) {
	        //处理componentWillMount产生的回调
	        instance._pendingCallbacks.splice(0).forEach(function (fn) {
	          fn.call(instance);
	        });
	      }
	      if (instance.componentDidMount) {
	        instance._updating = true;
	        instance.componentDidMount();
	        instance.componentDidMount = instance._updating = false;
	        instance._hasDidMount = true;
	        //处理componentDidMount里调用 setState产生重绘
	        if (instance._pendingStates.length && !instance._disableSetState) {
	          options.refreshComponent(instance);
	        }
	      }
	    });
	  }
	};
	
	/**
	 *组件的基类
	 *
	 * @param {any} props
	 * @param {any} context
	 */
	
	function Component(props, context) {
	  this.context = context;
	  this.props = props;
	  this.refs = {};
	  this._disableSetState = true;
	  /**
	   * this._disableSetState = true 用于阻止组件在componentWillMount/componentWillReceiveProps
	   * 被setState，从而提前发生render;
	   * this._updating = true 用于将componentDidMount发生setState/forceUpdate 延迟到整个render后再触发
	   * this._disposed = true 阻止组件在销毁后还进行diff
	   * this._forceUpdate = true 用于强制组件更新，忽略shouldComponentUpdate的结果
	   * this._hasDidMount = true 表示这个组件已经触发componentDidMount回调，
	   * 如果用户没有指定，那么它在插入DOM树时，自动标识为true
	   * 此flag是确保 component在update前就要执行componentDidMount
	   */
	  this._pendingCallbacks = [];
	  this._pendingStates = [];
	  this.state = {};
	}
	
	Component.prototype = {
	  replaceState: function replaceState() {
	    console.warn("此方法末实现");
	  },
	  setState: function setState(state, cb) {
	    this._pendingStates.push(state);
	    setStateProxy(this, cb);
	  },
	  forceUpdate: function forceUpdate(cb) {
	    this._forceUpdate = true;
	    setStateProxy(this, cb);
	  },
	
	  _processPendingState: function _processPendingState(props, context) {
	    var n = this._pendingStates.length;
	    if (n === 0) {
	      return this.state;
	    }
	    var states = this._pendingStates.splice(0);
	    var nextState = extend({}, this.state);
	    for (var i = 0; i < n; i++) {
	      var partial = states[i];
	      extend(nextState, isFn(partial) ? partial.call(this, nextState, props, context) : partial);
	    }
	
	    return nextState;
	  },
	
	  render: function render() {}
	};
	
	/**
	 * 让外面的setState与forceUpdate都共用同一通道
	 *
	 * @param {any} instance
	 * @param {any} state
	 * @param {any} cb fire by component did update
	 * @param {any} force ignore shouldComponentUpdate
	 */
	
	function setStateProxy(instance, cb) {
	  if (isFn(cb)) {
	    instance._pendingCallbacks.push(cb);
	  }
	  if (instance._updating) {
	    //防止在父组件更新过程中，子组件执行父组件的setState
	    scheduler.add(function () {
	      options.refreshComponent(instance);
	    });
	  } else if (instance._disableSetState === true) {
	    //只存储回调，但不会触发组件的更新
	    this._forceUpdate = false;
	  } else {
	    options.refreshComponent(instance);
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function shallowEqual(objA, objB) {
	  if (Object.is(objA, objB)) {
	    return true;
	  }
	  //确保objA, objB都是对象
	  if (typeNumber(objA) < 7 || typeNumber(objB) < 7) {
	    return false;
	  }
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	function PureComponent(props, context) {
	  Component.call(this, props, context);
	}
	
	var fn = inherit(PureComponent, Component);
	
	fn.shouldComponentUpdate = function shallowCompare(nextProps, nextState) {
	  var a = shallowEqual(this.props, nextProps);
	  var b = shallowEqual(this.state, nextState);
	  return !a || !b;
	};
	fn.isPureComponent = true;
	
	var Children = {
	  only: function only(children) {
	    return children && children[0] || null;
	  },
	  count: function count(children) {
	    return children && children.length || 0;
	  },
	  forEach: function forEach(children, callback, context) {
	    children.forEach(callback, context);
	  },
	  map: function map(children, callback, context) {
	    return children.map(callback, context);
	  },
	  toArray: function toArray(children) {
	    return children.slice(0);
	  }
	};
	
	//用于后端的元素节点
	function DOMElement(type) {
	  this.nodeName = type;
	  this.style = {};
	  this.children = [];
	}
	var fn$1 = DOMElement.prototype = {
	  contains: Boolean
	};
	String("replaceChild,appendChild,removeAttributeNS,setAttributeNS,removeAttribute,setAttribute" + ",getAttribute,insertBefore,removeChild,addEventListener,removeEventListener,attachEvent" + ",detachEvent").replace(/\w+/g, function (name) {
	  fn$1[name] = function () {
	    console.log("fire " + name);
	  };
	});
	
	//用于后端的document
	var fakeDoc = new DOMElement();
	fakeDoc.createElement = fakeDoc.createElementNS = fakeDoc.createDocumentFragment = function (type) {
	  return new DOMElement(type);
	};
	fakeDoc.createTextNode = fakeDoc.createComment = Boolean;
	fakeDoc.documentElement = new DOMElement("html");
	fakeDoc.nodeName = "#document";
	fakeDoc.textContent = "";
	try {
	  var w = window;
	  var b = !!w.alert;
	} catch (e) {
	  b = false;
	  w = {
	    document: fakeDoc
	  };
	}
	
	
	var win = w;
	
	var document = w.document || fakeDoc;
	var isStandard = "textContent" in document;
	var fragment = document.createDocumentFragment();
	function emptyElement(node) {
	  var child;
	  while (child = node.firstChild) {
	    if (child.nodeType === 1) {
	      emptyElement(child);
	    }
	    node.removeChild(child);
	  }
	}
	
	function removeDOMElement(node) {
	  if (node.nodeType === 1) {
	    if (isStandard) {
	      node.textContent = "";
	    } else {
	      emptyElement(node);
	    }
	    node.__events = null;
	  } else if (node.nodeType === 3) {
	    //只回收文本节点
	    recyclables["#text"].push(node);
	  }
	  fragment.appendChild(node);
	  fragment.removeChild(node);
	}
	
	var versions = {
	  88: 7, //IE7-8 objectobject
	  80: 6, //IE6 objectundefined
	  "00": NaN, // other modern browsers
	  "08": NaN
	};
	/* istanbul ignore next  */
	var msie = document.documentMode || versions[typeNumber(document.all) + "" + typeNumber(XMLHttpRequest)];
	
	var modern = /NaN|undefined/.test(msie) || msie > 8;
	
	function createDOMElement(vnode) {
	  var type = vnode.type;
	  if (type === "#text") {
	    //只重复利用文本节点
	    var node = recyclables[type].pop();
	    if (node) {
	      node.nodeValue = vnode.text;
	      return node;
	    }
	    return document.createTextNode(vnode.text);
	  }
	
	  if (type === "#comment") {
	    return document.createComment(vnode.text);
	  }
	
	  try {
	    if (vnode.ns) {
	      return document.createElementNS(vnode.ns, type);
	    }
	    //eslint-disable-next-line
	  } catch (e) {}
	  return document.createElement(type);
	}
	// https://developer.mozilla.org/en-US/docs/Web/MathML/Element/math
	// http://demo.yanue.net/HTML5element/
	var mhtml = {
	  meter: 1,
	  menu: 1,
	  map: 1,
	  meta: 1,
	  mark: 1
	};
	var svgTags = oneObject("" +
	// structure
	"svg,g,defs,desc,metadata,symbol,use," +
	// image & shape
	"image,path,rect,circle,line,ellipse,polyline,polygon," +
	// text
	"text,tspan,tref,textpath," +
	// other
	"marker,pattern,clippath,mask,filter,cursor,view,animate," +
	// font
	"font,font-face,glyph,missing-glyph", svgNs);
	
	var rmathTags = /^m/;
	var mathNs = "http://www.w3.org/1998/Math/MathML";
	var svgNs = "http://www.w3.org/2000/svg";
	var mathTags = {
	  semantics: mathNs
	};
	
	function getNs(type) {
	  if (svgTags[type]) {
	    return svgNs;
	  } else if (mathTags[type]) {
	    return mathNs;
	  } else {
	    if (!mhtml[type] && rmathTags.test(type)) {
	      //eslint-disable-next-line
	      return mathTags[type] = mathNs;
	    }
	  }
	}
	
	/**
	 * 为了兼容0.13之前的版本
	 */
	var MANY = "DEFINE_MANY";
	var MANY_MERGED = "MANY_MERGED";
	var ReactClassInterface = {
	  mixins: MANY,
	  statics: MANY,
	  propTypes: MANY,
	  contextTypes: MANY,
	  childContextTypes: MANY,
	  getDefaultProps: MANY_MERGED,
	  getInitialState: MANY_MERGED,
	  getChildContext: MANY_MERGED,
	  render: "ONCE",
	  componentWillMount: MANY,
	  componentDidMount: MANY,
	  componentWillReceiveProps: MANY,
	  shouldComponentUpdate: "DEFINE_ONCE",
	  componentWillUpdate: MANY,
	  componentDidUpdate: MANY,
	  componentWillUnmount: MANY
	};
	
	var specHandle = {
	  displayName: function displayName(Ctor, value, name) {
	    Ctor[name] = value;
	  },
	  mixins: function mixins(Ctor, value) {
	    if (value) {
	      for (var i = 0; i < value.length; i++) {
	        mixSpecIntoComponent(Ctor, value[i]);
	      }
	    }
	  },
	
	  propTypes: mergeObject,
	  childContextTypes: mergeObject,
	  contextTypes: mergeObject,
	
	  getDefaultProps: function getDefaultProps(Ctor, value, name) {
	    if (Ctor[name]) {
	      Ctor[name] = createMergedResultFunction(Ctor[name], value);
	    } else {
	      Ctor[name] = value;
	    }
	  },
	  statics: function statics(Ctor, value) {
	    extend(Ctor, Object(value));
	  },
	
	  autobind: noop
	};
	
	function mergeObject(fn, value, name) {
	  fn[name] = Object.assign({}, fn[name], value);
	}
	
	//防止覆盖Component内部一些重要的方法或属性
	var protectedProps = {
	  mixin: 1,
	  setState: 1,
	  forceUpdate: 1,
	  _processPendingState: 1,
	  _pendingCallbacks: 1,
	  _pendingStates: 1
	};
	
	function mixSpecIntoComponent(Ctor, spec) {
	  if (!spec) {
	    return;
	  }
	  if (isFn(spec)) {
	    console.warn("createClass(spec)中的spec不能为函数，只能是纯对象");
	  }
	
	  var proto = Ctor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;
	
	  if (spec.hasOwnProperty("mixin")) {
	    specHandle.mixins(Ctor, spec.mixins);
	  }
	
	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }
	    if (protectedProps[name] === 1) {
	      continue;
	    }
	
	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	
	    if (specHandle.hasOwnProperty(name)) {
	      specHandle[name](Ctor, property, name);
	    } else {
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var shouldAutoBind = isFn(property) && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;
	
	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];
	          //合并多个同名函数
	          if (specPolicy === MANY_MERGED) {
	            //这个是有返回值
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === MANY) {
	            //这个没有返回值
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	        }
	      }
	    }
	  }
	}
	
	function mergeOwnProperties(one, two) {
	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      one[key] = two[key];
	    }
	  }
	  return one;
	}
	
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeOwnProperties(c, a);
	    mergeOwnProperties(c, b);
	    return c;
	  };
	}
	
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}
	
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  return boundMethod;
	}
	
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}
	
	//创建一个构造器
	function newCtor(className) {
	  var curry = Function("ReactComponent", "bindAutoBindMethods", "return function " + className + "(props, context) {\n    ReactComponent.call(this, props, context);\n    this.state = this.getInitialState ? this.getInitialState() : {};\n    if (this.__reactAutoBindPairs.length) {\n      bindAutoBindMethods(this);\n    }\n  };");
	  return curry(Component, bindAutoBindMethods);
	}
	var warnOnce = 1;
	function createClass(spec) {
	  if (warnOnce) {
	    warnOnce = 0;
	    console.warn("createClass已经过时，强烈建议使用es6方式定义类");
	  }
	  var Constructor = newCtor(spec.displayName || "Component");
	  var proto = inherit(Constructor, Component);
	  proto.__reactAutoBindPairs = [];
	  delete proto.render;
	
	  mixSpecIntoComponent(Constructor, spec);
	  if (isFn(Constructor.getDefaultProps)) {
	    Constructor.defaultProps = Constructor.getDefaultProps();
	  }
	
	  //性能优化，为了防止在原型链进行无用的查找，直接将用户没有定义的生命周期钩子置为null
	  for (var methodName in ReactClassInterface) {
	    if (!proto[methodName]) {
	      proto[methodName] = null;
	    }
	  }
	
	  return Constructor;
	}
	
	//为了兼容yo
	var check = function check() {
	  return check;
	};
	check.isRequired = check;
	var PropTypes = {
	  array: check,
	  bool: check,
	  func: check,
	  number: check,
	  object: check,
	  string: check,
	  any: check,
	  arrayOf: check,
	  element: check,
	  instanceOf: check,
	  node: check,
	  objectOf: check,
	  oneOf: check,
	  oneOfType: check,
	  shape: check
	};
	
	var rnumber = /^-?\d+(\.\d+)?$/;
	/**
	     * 为元素样子设置样式
	     * 
	     * @export
	     * @param {any} dom 
	     * @param {any} oldStyle 
	     * @param {any} newStyle 
	     */
	function patchStyle(dom, oldStyle, newStyle) {
	  if (oldStyle === newStyle) {
	    return;
	  }
	
	  for (var name in newStyle) {
	    var val = newStyle[name];
	    if (oldStyle[name] !== val) {
	      name = cssName(name, dom);
	      if (val !== 0 && !val) {
	        val = ""; //清除样式
	      } else if (rnumber.test(val) && !cssNumber[name]) {
	        val = val + "px"; //添加单位
	      }
	      try {
	        //node.style.width = NaN;node.style.width = 'xxxxxxx';
	        //node.style.width = undefine 在旧式IE下会抛异常
	        dom.style[name] = val; //应用样式
	      } catch (e) {
	        console.log("dom.style[" + name + "] = " + val + "throw error");
	      }
	    }
	  }
	  // 如果旧样式存在，但新样式已经去掉
	  for (var _name in oldStyle) {
	    if (!(_name in newStyle)) {
	      dom.style[_name] = ""; //清除样式
	    }
	  }
	}
	
	var cssNumber = oneObject("animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom");
	
	//var testStyle = document.documentElement.style
	var prefixes = ["", "-webkit-", "-o-", "-moz-", "-ms-"];
	var cssMap = oneObject("float", "cssFloat");
	
	/**
	 * 转换成当前浏览器可用的样式名
	 * 
	 * @param {any} name 
	 * @returns 
	 */
	function cssName(name, dom) {
	  if (cssMap[name]) {
	    return cssMap[name];
	  }
	  var host = dom && dom.style || {};
	  for (var i = 0, n = prefixes.length; i < n; i++) {
	    var camelCase = camelize(prefixes[i] + name);
	    if (camelCase in host) {
	      return cssMap[name] = camelCase;
	    }
	  }
	  return null;
	}
	
	var globalEvents = {};
	var eventPropHooks = {}; //用于在事件回调里对事件对象进行
	var eventHooks = {}; //用于在元素上绑定特定的事件
	//根据onXXX得到其全小写的事件名, onClick --> click, onClickCapture --> click,
	// onMouseMove --> mousemove
	
	var eventLowerCache = {
	  onClick: "click",
	  onChange: "change",
	  onWheel: "wheel"
	};
	/**
	 * 判定否为与事件相关
	 *
	 * @param {any} name
	 * @returns
	 */
	function isEventName(name) {
	  return (/^on[A-Z]/.test(name)
	  );
	}
	var isTouch = "ontouchstart" in document;
	
	function dispatchEvent(e) {
	  //__type__ 在injectTapEventPlugin里用到
	  var bubble = e.__type__ || e.type;
	
	  e = new SyntheticEvent(e);
	
	  var hook = eventPropHooks[bubble];
	  if (hook && false === hook(e)) {
	    return;
	  }
	
	  var paths = collectPaths(e);
	
	  var captured = bubble + "capture";
	
	  scheduler.run();
	  triggerEventFlow(paths, captured, e);
	
	  if (!e._stopPropagation) {
	    triggerEventFlow(paths.reverse(), bubble, e);
	  }
	}
	
	function collectPaths(e) {
	  var target = e.target;
	  var paths = [];
	  do {
	    var events = target.__events;
	    if (events) {
	      paths.push({ dom: target, events: events });
	    }
	  } while ((target = target.parentNode) && target.nodeType === 1);
	  // target --> parentNode --> body --> html
	  return paths;
	}
	
	function triggerEventFlow(paths, prop, e) {
	  for (var i = paths.length; i--;) {
	    var path = paths[i];
	    var fn = path.events[prop];
	    if (isFn(fn)) {
	      e.currentTarget = path.dom;
	      fn.call(path.dom, e);
	      if (e._stopPropagation) {
	        break;
	      }
	    }
	  }
	}
	
	function addGlobalEventListener(name) {
	  if (!globalEvents[name]) {
	    globalEvents[name] = true;
	    addEvent(document, name, dispatchEvent);
	  }
	}
	
	function addEvent(el, type, fn, bool) {
	  if (el.addEventListener) {
	    // Unable to preventDefault inside passive event listener due to target being
	    // treated as passive
	    el.addEventListener(type, fn, /true|false/.test(bool) ? bool : supportsPassive ? {
	      passive: false
	    } : false);
	  } else if (el.attachEvent) {
	    el.attachEvent("on" + type, fn);
	  }
	}
	
	var ron = /^on/;
	var rcapture = /Capture$/;
	function getBrowserName(onStr) {
	  var lower = eventLowerCache[onStr];
	  if (lower) {
	    return lower;
	  }
	  var camel = onStr.replace(ron, "").replace(rcapture, "");
	  lower = camel.toLowerCase();
	  eventLowerCache[onStr] = lower;
	  return lower;
	}
	var supportsPassive = false;
	try {
	  var opts = Object.defineProperty({}, "passive", {
	    get: function get() {
	      supportsPassive = true;
	    }
	  });
	  document.addEventListener("test", null, opts);
	} catch (e) {}
	
	/* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
	            firefox DOMMouseScroll detail 下3 上-3
	            firefox wheel detlaY 下3 上-3
	            IE9-11 wheel deltaY 下40 上-40
	            chrome wheel deltaY 下100 上-100 */
	/* istanbul ignore next  */
	var fixWheelType = "onmousewheel" in document ? "mousewheel" : document.onwheel !== void 666 ? "wheel" : "DOMMouseScroll";
	var fixWheelDelta = fixWheelType === "mousewheel" ? "wheelDetla" : fixWheelType === "wheel" ? "deltaY" : "detail";
	eventHooks.wheel = function (dom) {
	  addEvent(dom, fixWheelType, function (e) {
	    var delta = e[fixWheelDelta] > 0 ? -120 : 120;
	    var deltaY = ~~dom._ms_wheel_ + delta;
	    dom._ms_wheel_ = deltaY;
	    e = new SyntheticEvent(e);
	    e.type = "wheel";
	    e.deltaY = deltaY;
	    dispatchEvent(e);
	  });
	};
	
	"blur,focus,mouseenter,mouseleave".replace(/\w+/g, function (type) {
	  eventHooks[type] = function (dom) {
	    addEvent(dom, type, function (e) {
	      dispatchEvent(e);
	    }, true);
	  };
	});
	
	if (isTouch) {
	  eventHooks.click = noop;
	  eventHooks.clickcapture = noop;
	}
	
	function SyntheticEvent(event) {
	  if (event.originalEvent) {
	    return event;
	  }
	  for (var i in event) {
	    if (!eventProto[i]) {
	      this[i] = event[i];
	    }
	  }
	  if (!this.target) {
	    this.target = event.srcElement;
	  }
	  var target = this.target;
	  this.fixEvent();
	  this.timeStamp = new Date() - 0;
	  this.originalEvent = event;
	}
	
	var eventProto = SyntheticEvent.prototype = {
	  fixEvent: function fixEvent() {}, //留给以后扩展用
	  preventDefault: function preventDefault() {
	    var e = this.originalEvent || {};
	    e.returnValue = this.returnValue = false;
	    if (e.preventDefault) {
	      e.preventDefault();
	    }
	  },
	  fixHooks: function fixHooks() {},
	  stopPropagation: function stopPropagation() {
	    var e = this.originalEvent || {};
	    e.cancelBubble = this._stopPropagation = true;
	    if (e.stopPropagation) {
	      e.stopPropagation();
	    }
	  },
	  stopImmediatePropagation: function stopImmediatePropagation() {
	    this.stopPropagation();
	    this.stopImmediate = true;
	  },
	  toString: function toString() {
	    return "[object Event]";
	  }
	};
	/* istanbul ignore next  */
	
	
	var boolAttributes = oneObject("autofocus,autoplay,async,allowTransparency,checked,controls,declare,disabled,def" + "er,defaultChecked,defaultSelected,isMap,loop,multiple,noHref,noResize,noShade,op" + "en,readOnly,selected", true);
	
	var builtIdProperties = oneObject("accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan,dateTime,def" + "aultValue,contentEditable,frameBorder,maxLength,marginWidth,marginHeight,rowSpan" + ",tabIndex,useMap,vSpace,valueType,vAlign," + //驼蜂风格
	"value,id,title,alt,htmlFor,name,type,longDesc,className", 1);
	
	var booleanTag = oneObject("script,iframe,a,map,video,bgsound,form,select,input,textarea,option,keygen,optgr" + "oup,label");
	var xlink = "http://www.w3.org/1999/xlink";
	
	/**
	 *
	 * 修改dom的属性与事件
	 * @export
	 * @param {any} nextProps
	 * @param {any} lastProps
	 * @param {any} vnode
	 * @param {any} lastVnode
	 */
	function diffProps(nextProps, lastProps, vnode, lastVnode, dom) {
	  /* istanbul ignore if */
	  if (vnode.ns === "http://www.w3.org/2000/svg") {
	    return diffSVGProps(nextProps, lastProps, vnode, lastVnode, dom);
	  }
	  //eslint-disable-next-line
	  for (var name in nextProps) {
	    var val = nextProps[name];
	    if (val !== lastProps[name]) {
	      var hookName = getHookType(name, val, vnode.type, dom);
	      propHooks[hookName](dom, name, val, lastProps);
	    }
	  }
	  //如果旧属性在新属性对象不存在，那么移除DOM eslint-disable-next-line
	  for (var _name2 in lastProps) {
	    if (!nextProps.hasOwnProperty(_name2)) {
	      var hookName2 = getHookType(_name2, false, vnode.type, dom);
	      propHooks[hookName2](dom, _name2, builtIdProperties[_name2] ? "" : false, lastProps);
	    }
	  }
	}
	
	function diffSVGProps(nextProps, lastProps, vnode, lastVnode, dom) {
	  // http://www.w3school.com.cn/xlink/xlink_reference.asp
	  // https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#notable-enh
	  // a ncements xlinkActuate, xlinkArcrole, xlinkHref, xlinkRole, xlinkShow,
	  // xlinkTitle, xlinkType eslint-disable-next-line
	  for (var name in nextProps) {
	    var val = nextProps[name];
	    if (val !== lastProps[name]) {
	      var hookName = getHookTypeSVG(name, val, vnode.type, dom);
	      propHooks[hookName](dom, name, val, lastProps);
	    }
	  }
	  //eslint-disable-next-line
	  for (var _name3 in lastProps) {
	    if (!nextProps.hasOwnProperty(_name3)) {
	      var _val = nextProps[_name3];
	      var hookName2 = getHookTypeSVG(_name3, _val, vnode.type, dom);
	      propHooks[hookName2](dom, _name3, false, lastProps);
	    }
	  }
	}
	var controlled = {
	  value: 1,
	  defaultValue: 1
	};
	
	var specialProps = {
	  children: 1,
	  style: 1,
	  className: 1,
	  dangerouslySetInnerHTML: 1
	};
	
	function getHookType(name, val, type, dom) {
	  if (specialProps[name]) return name;
	  if (boolAttributes[name] && booleanTag[type]) {
	    return "boolean";
	  }
	  if (isEventName(name)) {
	    return "__event__";
	  }
	  if (typeNumber(val) < 3 && !val) {
	    return "removeAttribute";
	  }
	  return name.indexOf("data-") === 0 || dom[name] === void 666 ? "setAttribute" : "property";
	}
	
	function getHookTypeSVG(name, val, type, dom) {
	  if (name === "className") {
	    return "svgClass";
	  }
	
	  if (specialProps[name]) return name;
	
	  if (isEventName(name)) {
	    return "__event__";
	  }
	  return "svgAttr";
	}
	
	var svgprops = {
	  xlinkActuate: "xlink:actuate",
	  xlinkArcrole: "xlink:arcrole",
	  xlinkHref: "xlink:href",
	  xlinkRole: "xlink:role",
	  xlinkShow: "xlink:show"
	};
	var emptyStyle = {};
	var propHooks = {
	  "boolean": function boolean(dom, name, val, lastProp) {
	    // 布尔属性必须使用el.xxx = true|false方式设值 如果为false, IE全系列下相当于setAttribute(xxx,''),
	    // 会影响到样式,需要进一步处理 eslint-disable-next-line
	    dom[name] = !!val;
	    if (!val) {
	      dom.removeAttribute(name);
	    }
	  },
	  removeAttribute: function removeAttribute(dom, name) {
	    dom.removeAttribute(name);
	  },
	  setAttribute: function setAttribute(dom, name, val) {
	    try {
	      dom.setAttribute(name, val);
	    } catch (e) {
	      console.log("setAttribute error", name, val);
	    }
	  },
	  svgClass: function svgClass(dom, name, val, lastProp) {
	    if (!val) {
	      dom.removeAttribute("class");
	    } else {
	      dom.setAttribute("class", val);
	    }
	  },
	  svgAttr: function svgAttr(dom, name, val) {
	    var method = typeNumber(val) < 3 && !val ? "removeAttribute" : "setAttribute";
	    if (svgprops[name]) {
	      dom[method + "NS"](xlink, svgprops[name], val || "");
	    } else {
	      dom[method](toLowerCase(name), val || "");
	    }
	  },
	  property: function property(dom, name, val) {
	    if (name !== "value" || dom[name] !== val) {
	      dom[name] = val;
	      if (controlled[name]) {
	        dom._lastValue = val;
	      }
	    }
	  },
	  children: noop,
	  className: function className(dom, _, val, lastProps) {
	    dom.className = val;
	  },
	  style: function style(dom, _, val, lastProps) {
	    patchStyle(dom, lastProps.style || emptyStyle, val || emptyStyle);
	  },
	  __event__: function __event__(dom, name, val, lastProps) {
	    var events = dom.__events || (dom.__events = {});
	
	    if (val === false) {
	      delete events[toLowerCase(name.slice(2))];
	    } else {
	      if (!lastProps[name]) {
	        //添加全局监听事件
	        var _name = getBrowserName(name);
	        addGlobalEventListener(_name);
	        var hook = eventHooks[_name];
	        if (hook) {
	          hook(dom, name);
	        }
	      }
	      //onClick --> click, onClickCapture --> clickcapture
	      events[toLowerCase(name.slice(2))] = val;
	    }
	  },
	
	  dangerouslySetInnerHTML: function dangerouslySetInnerHTML(dom, name, val, lastProps) {
	    var oldhtml = lastProps[name] && lastProps[name].__html;
	    if (val && val.__html !== oldhtml) {
	      dom.innerHTML = val.__html;
	    }
	  }
	};
	
	/**
	 input, select, textarea这几个元素如果指定了value/checked的**状态属性**，就会包装成受控组件或非受控组件
	 受控组件是指，用户除了为它指定**状态属性**，还为它指定了onChange/onInput/disabled等用于控制此状态属性
	 变动的属性
	 反之，它就是非受控组件，非受控组件会在框架内部添加一些事件，阻止**状态属性**被用户的行为改变，只能被setState改变
	 */
	function processFormElement(vnode, dom, props) {
	  var domType = dom.type;
	  var duplexType = duplexMap[domType];
	  if (duplexType) {
	    var data = duplexData[duplexType];
	    var duplexProp = data[0];
	    var keys = data[1];
	    var eventName = data[2];
	    if (duplexProp in props && !hasOtherControllProperty(props, keys)) {
	      console.warn("\u4F60\u4E3A" + vnode.type + "[type=" + domType + "]\u5143\u7D20\u6307\u5B9A\u4E86" + duplexProp + "\u5C5E\u6027\uFF0C\u4F46\u662F\u6CA1\u6709\u63D0\u4F9B\u53E6\u5916\u7684" + Object.keys(keys) + "\u7B49\u7528\u4E8E\u63A7\u5236" + duplexProp + "\n\n      \u53D8\u5316\u7684\u5C5E\u6027\uFF0C\u90A3\u4E48\u5B83\u662F\u4E00\u4E2A\u975E\u53D7\u63A7\u7EC4\u4EF6\uFF0C\u7528\u6237\u65E0\u6CD5\u901A\u8FC7\u8F93\u5165\u6539\u53D8\u5143\u7D20\u7684" + duplexProp + "\u503C");
	      dom[eventName] = data[3];
	    }
	    if (duplexType === 3) {
	      postUpdateSelectedOptions(vnode);
	    }
	  }
	}
	
	function hasOtherControllProperty(props, keys) {
	  for (var key in props) {
	    if (keys[key]) {
	      return true;
	    }
	  }
	}
	var duplexMap = {
	  color: 1,
	  date: 1,
	  datetime: 1,
	  "datetime-local": 1,
	  email: 1,
	  month: 1,
	  number: 1,
	  password: 1,
	  range: 1,
	  search: 1,
	  tel: 1,
	  text: 1,
	  time: 1,
	  url: 1,
	  week: 1,
	  textarea: 1,
	  checkbox: 2,
	  radio: 2,
	  "select-one": 3,
	  "select-multiple": 3
	};
	
	function preventUserInput(e) {
	  var target = e.target;
	  var name = e.type === "textarea" ? "innerHTML" : "value";
	  target[name] = target._lastValue;
	}
	
	function preventUserClick(e) {
	  e.preventDefault();
	}
	
	function preventUserChange(e) {
	  var target = e.target;
	  var value = target._lastValue;
	  var options$$1 = target.options;
	  if (target.multiple) {
	    updateOptionsMore(options$$1, options$$1.length, value);
	  } else {
	    updateOptionsOne(options$$1, options$$1.length, value);
	  }
	}
	
	var duplexData = {
	  1: ["value", {
	    onChange: 1,
	    onInput: 1,
	    readOnly: 1,
	    disabled: 1
	  }, "oninput", preventUserInput],
	  2: ["checked", {
	    onChange: 1,
	    onClick: 1,
	    readOnly: 1,
	    disabled: 1
	  }, "onclick", preventUserClick],
	  3: ["value", {
	    onChange: 1,
	    disabled: 1
	  }, "onchange", preventUserChange]
	};
	
	function postUpdateSelectedOptions(vnode) {
	  var props = vnode.props,
	      multiple = !!props.multiple,
	      value = typeNumber(props.value) > 1 ? props.value : typeNumber(props.defaultValue) > 1 ? props.defaultValue : multiple ? [] : "",
	      options$$1 = [];
	  collectOptions(vnode, props, options$$1);
	  if (multiple) {
	    updateOptionsMore(options$$1, options$$1.length, value);
	  } else {
	    updateOptionsOne(options$$1, options$$1.length, value);
	  }
	}
	
	/**
	 * 收集虚拟DOM select下面的options元素，如果是真实DOM直接用select.options
	 *
	 * @param {VNode} vnode
	 * @param {any} props
	 * @param {Array} ret
	 */
	function collectOptions(vnode, props, ret) {
	  var arr = props.children;
	  for (var i = 0, n = arr.length; i < n; i++) {
	    var el = arr[i];
	    if (el.type === "option") {
	      ret.push(el);
	    } else if (el.type === "optgroup") {
	      collectOptions(el, el.props, ret);
	    }
	  }
	}
	
	function updateOptionsOne(options$$1, n, propValue) {
	  var selectedValue = "" + propValue;
	  for (var i = 0; i < n; i++) {
	    var option = options$$1[i];
	    var value = getOptionValue(option, option.props);
	    if (value === selectedValue) {
	      getOptionSelected(option, true);
	      return;
	    }
	  }
	  if (n) {
	    getOptionSelected(options$$1[0], true);
	  }
	}
	
	function updateOptionsMore(options$$1, n, propValue) {
	  var selectedValue = {};
	  try {
	    for (var i = 0; i < propValue.length; i++) {
	      selectedValue["&" + propValue[i]] = true;
	    }
	  } catch (e) {
	    /* istanbul ignore next */
	    console.warn('<select multiple="true"> 的value应该对应一个字符串数组');
	  }
	  for (var _i = 0; _i < n; _i++) {
	    var option = options$$1[_i];
	    var value = getOptionValue(option, option.props);
	    var selected = selectedValue.hasOwnProperty("&" + value);
	    getOptionSelected(option, selected);
	  }
	}
	
	function getOptionValue(option, props) {
	  if (!props) {
	    return getDOMOptionValue(option);
	  }
	  return props.value === undefined ? props.children[0].text : props.value;
	}
	
	function getDOMOptionValue(node) {
	  if (node.hasAttribute && node.hasAttribute("value")) {
	    return node.getAttribute("value");
	  }
	  var attr = node.getAttributeNode("value");
	  if (attr && attr.specified) {
	    return attr.value;
	  }
	  return node.innerHTML.trim();
	}
	
	function getOptionSelected(option, selected) {
	  var dom = option._hostNode || option;
	  dom.selected = selected;
	}
	
	//innerMap_start
	var innerMap = win.Map;
	
	try {
	  var testNode = document.createComment("");
	  var map = new innerMap(),
	      value = "anujs";
	  map.set(testNode, value);
	  if (map.get(testNode) !== value) {
	    throw "使用自定义Map";
	  }
	} catch (e) {
	  var getID = function getID(a) {
	    if (a.uniqueID) {
	      return "Node" + a.uniqueID;
	    } else {
	      a.uniqueID = "_" + uniqueID++;
	      return "Node" + a.uniqueID;
	    }
	  };
	
	  var uniqueID = 1;
	  innerMap = function innerMap() {
	    this.map = {};
	  };
	
	  innerMap.prototype = {
	    get: function get(a) {
	      var id = getID(a);
	      return this.map[id];
	    },
	    set: function set(a, v) {
	      var id = getID(a);
	      this.map[id] = v;
	    },
	    "delete": function _delete(a) {
	      var id = getID(a);
	      delete this.map[id];
	    }
	  };
	}
	//innerMap_end
	var instanceMap = new innerMap();
	
	function disposeVnode(vnode) {
	  if (!vnode || vnode._disposed) {
	    return;
	  }
	  switch (vnode.vtype) {
	    case 1:
	      disposeElement(vnode);
	      break;
	    case 2:
	      disposeComponent(vnode);
	      break;
	    case 4:
	      disposeStateless(vnode);
	      break;
	    default:
	      vnode._hostNode = vnode._hostParent = null;
	      break;
	  }
	  vnode._disposed = true;
	}
	
	function disposeStateless(vnode) {
	  if (vnode._instance) {
	    disposeVnode(vnode._instance._rendered);
	    vnode._instance = null;
	  }
	}
	
	function disposeElement(vnode) {
	  var props = vnode.props;
	
	  var children = props.children;
	  for (var i = 0, n = children.length; i < n; i++) {
	    disposeVnode(children[i]);
	  }
	  //eslint-disable-next-line
	  vnode.ref && vnode.ref(null);
	  vnode._hostNode = vnode._hostParent = null;
	}
	
	function disposeComponent(vnode) {
	  var instance = vnode._instance;
	  if (instance) {
	    instance._disableSetState = true;
	    options.beforeUnmount(instance);
	    if (instance.componentWillUnmount) {
	      instance.componentWillUnmount();
	    }
	    //在执行componentWillUnmount后才将关联的元素节点解绑，防止用户在钩子里调用 findDOMNode方法
	    var node = instanceMap.get(instance);
	    if (node) {
	      node._component = null;
	      instanceMap["delete"](instance);
	    }
	    vnode._instance = instance._currentElement = null;
	    disposeVnode(instance._rendered);
	  }
	}
	
	/**
	 * ReactDOM.render 方法
	 *
	 */
	function render(vnode, container, callback) {
	  return renderByAnu(vnode, container, callback, {});
	}
	/**
	 * ReactDOM.unstable_renderSubtreeIntoContainer 方法， React.render的包装
	 *
	 */
	var warnOne = 1;
	function unstable_renderSubtreeIntoContainer(parentInstance, vnode, container, callback) {
	  if (warnOne) {
	    console.warn("unstable_renderSubtreeIntoContainer未见于文档的内部方法，不建议使用");
	    warnOne = 0;
	  }
	  var parentContext = parentInstance && parentInstance.context || {};
	  return renderByAnu(vnode, container, callback, parentContext);
	}
	function unmountComponentAtNode(dom) {
	  var prevVnode = dom._component;
	  if (prevVnode) {
	    var conext = prevVnode._instance ? prevVnode._instance.context : {};
	    alignVnodes(prevVnode, { type: "#text", text: "empty" }, container.firstChild, parentContext);
	  }
	}
	function isValidElement(vnode) {
	  return vnode && vnode.vtype;
	}
	
	function renderByAnu(vnode, container, callback, parentContext) {
	  if (!isValidElement(vnode)) {
	    throw new Error(vnode + "\u5FC5\u987B\u4E3A\u7EC4\u4EF6\u6216\u5143\u7D20\u8282\u70B9, \u4F46\u73B0\u5728\u4F60\u7684\u7C7B\u578B\u5374\u662F" + Object.prototype.toString.call(vnode));
	  }
	  if (!container || container.nodeType !== 1) {
	    console.warn(container + "\u5FC5\u987B\u4E3A\u5143\u7D20\u8282\u70B9");
	    return;
	  }
	  var prevVnode = container._component,
	      rootNode,
	      hostParent = {
	    _hostNode: container
	  };
	  if (!prevVnode) {
	    rootNode = genVnodes(vnode, container, hostParent, parentContext);
	  } else {
	    rootNode = alignVnodes(prevVnode, vnode, container.firstChild, parentContext);
	  }
	  // 如果存在后端渲染的对象（打包进去），那么在ReactDOM.render这个方法里，它就会判定容器的第一个孩子是否元素节点
	  // 并且它有data-reactroot与data-react-checksum，有就根据数据生成字符串，得到比较数
	
	  if (rootNode.setAttribute) {
	    rootNode.setAttribute("data-reactroot", "");
	  }
	
	  var instance = vnode._instance;
	  container._component = vnode;
	  if (callback) {
	    callback();
	  }
	
	  scheduler.run();
	
	  return instance || rootNode;
	  //组件返回组件实例，而普通虚拟DOM 返回元素节点
	}
	
	function genVnodes(vnode, container, hostParent, parentContext) {
	  var nodes = getNodes(container);
	  var prevRendered = null;
	  //eslint-disable-next-line
	  for (var i = 0, el; el = nodes[i++];) {
	    if (el.getAttribute && el.getAttribute("data-reactroot") !== null) {
	      prevRendered = el;
	    } else {
	      el.parentNode.removeChild(el);
	    }
	  }
	  vnode._hostParent = hostParent;
	
	  var rootNode = mountVnode(vnode, parentContext, prevRendered);
	  container.appendChild(rootNode);
	
	  return rootNode;
	}
	
	function mountVnode(vnode, parentContext, prevRendered) {
	  var vtype = vnode.vtype;
	
	  switch (vtype) {
	    case 1:
	      return mountElement(vnode, parentContext, prevRendered);
	    case 2:
	      return mountComponent(vnode, parentContext, prevRendered);
	    case 4:
	      return mountStateless(vnode, parentContext, prevRendered);
	    default:
	      var node = prevRendered && prevRendered.nodeName === vnode.type ? prevRendered : createDOMElement(vnode);
	      vnode._hostNode = node;
	      return node;
	  }
	}
	
	var formElements = {
	  select: 1,
	  textarea: 1,
	  input: 1
	};
	
	function genMountElement(vnode, type, prevRendered) {
	  if (prevRendered && toLowerCase(prevRendered.nodeName) === type) {
	    return prevRendered;
	  } else {
	    var ns = getNs(type);
	    vnode.ns = ns;
	    var dom = createDOMElement(vnode);
	    if (prevRendered && dom !== prevRendered) {
	      while (prevRendered.firstChild) {
	        dom.appendChild(prevRendered.firstChild);
	      }
	    }
	    return dom;
	  }
	}
	
	function mountElement(vnode, parentContext, prevRendered) {
	  var type = vnode.type,
	      props = vnode.props;
	
	  var dom = genMountElement(vnode, type, prevRendered);
	
	  vnode._hostNode = dom;
	  if (prevRendered) {
	    alignChildren(vnode, dom, parentContext, prevRendered.childNodes);
	  } else {
	    mountChildren(vnode, dom, parentContext);
	  }
	  if (vnode.checkProps) {
	    diffProps(props, {}, vnode, {}, dom);
	  }
	
	  if (vnode.ref) {
	    scheduler.add(function () {
	      vnode.ref(dom);
	    });
	  }
	  if (formElements[type]) {
	    processFormElement(vnode, dom, props);
	  }
	
	  return dom;
	}
	
	//将虚拟DOM转换为真实DOM并插入父元素
	function mountChildren(vnode, parentNode, parentContext) {
	  var children = vnode.props.children;
	  for (var i = 0, n = children.length; i < n; i++) {
	    var el = children[i];
	    el._hostParent = vnode;
	    var curNode = mountVnode(el, parentContext);
	
	    parentNode.appendChild(curNode);
	  }
	}
	
	function alignChildren(vnode, parentNode, parentContext, childNodes) {
	  var children = vnode.props.children,
	      insertPoint = childNodes[0] || null,
	      j = 0;
	  for (var i = 0, n = children.length; i < n; i++) {
	    var el = children[i];
	    el._hostParent = vnode;
	    var prevDom = childNodes[j];
	    var dom = mountVnode(el, parentContext, prevDom);
	    if (dom === prevDom) {
	      j++;
	    }
	    parentNode.insertBefore(dom, insertPoint);
	
	    insertPoint = dom.nextSibling;
	  }
	}
	function mountComponent(vnode, parentContext, prevRendered) {
	  var type = vnode.type;
	
	
	  var props = getComponentProps(vnode);
	
	  var instance = new type(props, parentContext); //互相持有引用
	
	  vnode._instance = instance;
	  instance._currentElement = vnode;
	  instance.props = instance.props || props;
	  instance.context = instance.context || parentContext;
	
	  if (instance.componentWillMount) {
	    instance._disableSetState = true;
	    instance.componentWillMount();
	    instance.state = instance._processPendingState();
	    instance._disableSetState = false;
	  } else {
	    instance.componentWillMount = null;
	  }
	
	  // 如果一个虚拟DOM vnode的type为函数，那么对type实例化所得的对象instance来说 instance._currentElement =
	  // vnode instance有一个render方法，它会生成下一级虚拟DOM ，如果是返回false或null，则变成 空虚拟DOM {type:
	  // '#comment', text: 'empty'} 这个下一级虚拟DOM，对于instance来说，为其_rendered属性
	
	  var rendered = safeRenderComponent(instance, type);
	
	  instance._rendered = rendered;
	  rendered._hostParent = vnode._hostParent;
	
	  var dom = mountVnode(rendered, getChildContext(instance, parentContext), prevRendered);
	  instanceMap.set(instance, dom);
	  vnode._hostNode = dom;
	  instance._disableSetState = false;
	  if (instance.componentDidMount) {
	    scheduler.add(instance);
	  } else {
	    instance._hasDidMount = true;
	    //componentWillMount钩子会产生一些回调
	    if (instance._pendingCallbacks.length) {
	      scheduler.add(instance);
	    }
	  }
	
	  if (vnode.ref) {
	    scheduler.add(function () {
	      vnode.ref(instance);
	    });
	  }
	  options.afterMount(instance);
	  vnode._hostNode = dom;
	  return dom;
	}
	
	function safeRenderComponent(instance, type) {
	  CurrentOwner.cur = instance;
	  var rendered = instance.render();
	  rendered = checkNull(rendered, type);
	
	  CurrentOwner.cur = null;
	  return rendered;
	}
	
	function mountStateless(vnode, parentContext, prevRendered) {
	  var props = getComponentProps(vnode);
	
	  var rendered = vnode.type(props, parentContext);
	  rendered = checkNull(rendered, vnode.type);
	
	  var dom = mountVnode(rendered, parentContext, prevRendered);
	  vnode._instance = {
	    _currentElement: vnode,
	    _rendered: rendered
	  };
	  vnode._hostNode = dom;
	
	  rendered._hostParent = vnode._hostParent;
	  return dom;
	}
	
	function updateStateless(lastVnode, nextVnode, node, parentContext) {
	  var instance = lastVnode._instance;
	  var vnode = instance._rendered;
	
	  var newVnode = nextVnode.type(getComponentProps(nextVnode), parentContext);
	  newVnode = checkNull(newVnode, nextVnode.type);
	
	  var dom = alignVnodes(vnode, newVnode, node, parentContext);
	  nextVnode._instance = instance;
	  instance._rendered = newVnode;
	  nextVnode._hostNode = dom;
	  return dom;
	}
	
	function refreshComponent(instance) {
	  //这里触发视图更新
	
	  reRenderComponent(instance);
	
	  instance._forceUpdate = false;
	  instance._pendingCallbacks.splice(0).forEach(function (fn) {
	    fn.call(instance);
	  });
	}
	
	//将Component中这个东西移动这里
	options.refreshComponent = refreshComponent;
	
	function reRenderComponent(instance) {
	  var node = instanceMap.get(instance);
	
	  if (!instance._hasDidMount) {
	    scheduler.addAndRun(function () {
	      instance._forceUpdate = false;
	      instance._pendingCallbacks.splice(0).forEach(function (fn) {
	        fn.call(instance);
	      });
	    });
	
	    return node;
	  }
	  var props = instance.props,
	      state = instance.state,
	      context = instance.context,
	      lastProps = instance.lastProps,
	      constructor = instance.constructor;
	
	
	  var lastRendered = instance._rendered;
	  var hostParent = lastRendered._hostParent;
	  var nextProps = props;
	  lastProps = lastProps || props;
	  var nextState = instance._processPendingState(props, context);
	
	  instance.props = lastProps;
	  //防止用户在shouldComponentUpdate中调用setState
	  instance._disableSetState = true;
	
	  if (!instance._forceUpdate && instance.shouldComponentUpdate && instance.shouldComponentUpdate(nextProps, nextState, context) === false) {
	    instance._disableSetState = false;
	    return node;
	  }
	
	  //生命周期 componentWillUpdate(nextProps, nextState, nextContext)
	  if (instance.componentWillUpdate) {
	    instance.componentWillUpdate(nextProps, nextState, context);
	  } else {
	    instance.componentWillUpdate = null;
	  }
	
	  instance.props = nextProps;
	  instance.state = nextState;
	  instance._updating = true;
	  var rendered = safeRenderComponent(instance, constructor);
	
	  var childContext = getChildContext(instance, context);
	  instance._rendered = rendered;
	  rendered._hostParent = hostParent;
	
	  var dom = alignVnodes(lastRendered, rendered, node, childContext);
	  instanceMap.set(instance, dom);
	  instance._currentElement._hostNode = dom;
	  instance._updating = false;
	
	  if (instance.componentDidUpdate) {
	    instance.componentDidUpdate(lastProps, state, context);
	  } else {
	    instance.componentDidUpdate = null;
	  }
	  options.afterUpdate(instance);
	  instance._disableSetState = false;
	  return dom;
	}
	
	function alignVnodes(vnode, newVnode, node, parentContext) {
	  var newNode = node;
	  //eslint-disable-next-line
	  if (newVnode == null) {
	    removeDOMElement(node);
	    disposeVnode(vnode);
	  } else if (!(vnode.type == newVnode.type && vnode.key === newVnode.key)) {
	    //replace
	    disposeVnode(vnode);
	    newNode = mountVnode(newVnode, parentContext);
	    var p = node.parentNode;
	    if (p) {
	      p.replaceChild(newNode, node);
	      removeDOMElement(node);
	    }
	  } else if (vnode !== newVnode) {
	    // same type and same key -> update
	    newNode = updateVnode(vnode, newVnode, node, parentContext);
	  }
	
	  return newNode;
	}
	
	function findDOMNode(componentOrElement) {
	  if (componentOrElement == null) {
	    return null;
	  }
	  if (componentOrElement.nodeType === 1) {
	    return componentOrElement;
	  }
	
	  return instanceMap.get(componentOrElement) || null;
	}
	
	function updateVnode(lastVnode, nextVnode, node, parentContext) {
	  switch (lastVnode.vtype) {
	    case 1:
	      var nextProps = nextVnode.props;
	      if (lastVnode.props[HTML_KEY]) {
	        while (node.firstChild) {
	          node.removeChild(node.firstChild);
	        }
	        updateElement(lastVnode, nextVnode, node, parentContext);
	        mountChildren(nextVnode, node, parentContext);
	      } else {
	        if (nextProps[HTML_KEY]) {
	          node.innerHTML = nextProps[HTML_KEY].__html;
	        } else {
	          updateChildren(lastVnode, nextVnode, node, parentContext);
	        }
	        updateElement(lastVnode, nextVnode, node, parentContext);
	      }
	      return node;
	    case 2:
	      return updateComponent(lastVnode, nextVnode, node, parentContext);
	    case 4:
	      return updateStateless(lastVnode, nextVnode, node, parentContext);
	    default:
	      return node;
	  }
	}
	/**
	 *
	 *
	 * @param {any} lastVnode
	 * @param {any} nextVnode
	 * @param {any} dom
	 * @returns
	 */
	function updateElement(lastVnode, nextVnode, dom) {
	  nextVnode._hostNode = dom;
	  if (lastVnode.checkProps || nextVnode.checkProps) {
	    diffProps(nextVnode.props, lastVnode.props, nextVnode, lastVnode, dom);
	  }
	  if (nextVnode.type === "select") {
	    postUpdateSelectedOptions(nextVnode);
	  }
	  if (nextVnode.ref) {
	    nextVnode.ref(nextVnode._hostNode);
	  }
	  return dom;
	}
	
	function updateComponent(lastVnode, nextVnode, node, parentContext) {
	  var instance = nextVnode._instance = lastVnode._instance;
	  if (!instance) {
	    lastVnode._return = lastVnode._disposed = true;
	    var dom = mountComponent(nextVnode, parentContext);
	    node.parentNode && node.parentNode.replaceChild(dom, node);
	
	    return dom;
	  }
	
	  var nextProps = getComponentProps(nextVnode);
	  instance.lastProps = instance.props;
	
	  if (instance.componentWillReceiveProps) {
	    instance._disableSetState = true;
	    instance.componentWillReceiveProps(nextProps, parentContext);
	    instance._disableSetState = false;
	  }
	
	  instance.props = nextProps;
	  instance.context = parentContext;
	  if (nextVnode.ref) {
	    nextVnode.ref(instance);
	  }
	  return reRenderComponent(instance);
	}
	
	function updateChildren(vnode, newVnode, node, parentContext) {
	  var patches = {
	    removes: [],
	    updates: [],
	    creates: []
	  };
	  diffChildren(patches, vnode, newVnode, node, parentContext);
	  patches.removes.forEach(applyDestroy);
	  patches.updates.forEach(applyUpdate);
	  patches.creates.forEach(applyCreate);
	  scheduler.run();
	}
	
	function diffChildren(patches, vnode, newVnode, node, parentContext) {
	  var children = vnode.props.children;
	  var childNodes = node.childNodes;
	  var newVchildren = newVnode.props.children;
	  var childrenLen = children.length;
	  var newVchildrenLen = newVchildren.length;
	
	  if (childrenLen === 0) {
	    if (newVchildrenLen > 0) {
	      for (var i = 0; i < newVchildrenLen; i++) {
	        patches.creates.push({
	          vnode: newVchildren[i],
	          parentNode: node,
	          parentContext: parentContext,
	          index: i
	        });
	      }
	    }
	    return;
	  } else if (newVchildrenLen === 0) {
	    for (var _i = 0; _i < childrenLen; _i++) {
	      patches.removes.push({ vnode: children[_i], node: childNodes[_i] });
	    }
	    return;
	  }
	  var cloneChildren = children.slice();
	  var updates = Array(newVchildrenLen);
	  var removes = [];
	  var creates = [];
	  // isEqual
	  for (var _i2 = 0; _i2 < childrenLen; _i2++) {
	    var _vnode = children[_i2];
	    for (var j = 0; j < newVchildrenLen; j++) {
	      if (updates[j]) {
	        continue;
	      }
	      var _newVnode = newVchildren[j];
	      if (_vnode === _newVnode) {
	        updates[j] = {
	          shouldIgnore: true,
	          vnode: _vnode,
	          newVnode: _newVnode,
	          node: childNodes[_i2],
	          parentContext: parentContext,
	          index: j
	        };
	        cloneChildren[_i2] = null;
	        break;
	      }
	    }
	  }
	
	  // isSimilar
	  for (var _i3 = 0; _i3 < childrenLen; _i3++) {
	    var _vnode2 = cloneChildren[_i3];
	    if (_vnode2 === null) {
	      continue;
	    }
	    var shouldRemove = true;
	    for (var _j = 0; _j < newVchildrenLen; _j++) {
	      if (updates[_j]) {
	        continue;
	      }
	      var _newVnode2 = newVchildren[_j];
	      if (!_vnode2._disposed && _newVnode2.type === _vnode2.type && _newVnode2.key === _vnode2.key) {
	        updates[_j] = {
	          vnode: _vnode2,
	          newVnode: _newVnode2,
	          node: childNodes[_i3],
	          parentContext: parentContext,
	          index: _j
	        };
	        shouldRemove = false;
	        break;
	      }
	    }
	    if (shouldRemove) {
	      removes.push({ vnode: _vnode2, node: childNodes[_i3] });
	    }
	  }
	
	  for (var _i4 = 0; _i4 < newVchildrenLen; _i4++) {
	    var item = updates[_i4];
	    if (!item) {
	      creates.push({
	        vnode: newVchildren[_i4],
	        parentNode: node,
	        parentContext: parentContext,
	        index: _i4
	      });
	    } else if (item.vnode.vtype === 1) {
	      diffChildren(patches, item.vnode, item.newVnode, item.node, item.parentContext);
	    }
	  }
	  if (removes.length) {
	    __push.apply(patches.removes, removes);
	  }
	  if (creates.length) {
	    __push.apply(patches.creates, creates);
	  }
	  __push.apply(patches.updates, updates);
	}
	
	function applyUpdate(data) {
	  if (!data) {
	    return;
	  }
	  var vnode = data.vnode;
	  var nextVnode = data.newVnode;
	  var dom = data.node;
	
	  // update
	  if (!data.shouldIgnore) {
	    if (!vnode.vtype) {
	      if (vnode.text !== nextVnode.text) {
	        dom.nodeValue = nextVnode.text;
	      }
	      if (!nextVnode._hostNode) {
	        nextVnode._hostNode = dom;
	        nextVnode._hostParent = vnode._hostParent;
	      }
	    } else if (vnode.vtype === 1) {
	      updateElement(vnode, nextVnode, dom, data.parentContext);
	    } else if (vnode.vtype === 4) {
	      dom = updateStateless(vnode, nextVnode, dom, data.parentContext);
	    } else if (vnode.vtype === 2) {
	      dom = updateComponent(vnode, nextVnode, dom, data.parentContext);
	      if (vnode._return) {
	        //如果vnode, nextVnode都没有实例
	        return dom;
	      }
	    }
	  }
	  if (dom.parentNode === null) {
	    return dom;
	  }
	  // re-order
	  var currentNode = dom.parentNode.childNodes[data.index];
	  if (currentNode !== dom) {
	    dom.parentNode.insertBefore(dom, currentNode);
	  }
	  return dom;
	}
	
	function applyDestroy(data) {
	  var node = data.node;
	  if (node) {
	    removeDOMElement(node);
	  }
	  disposeVnode(data.vnode);
	}
	
	function applyCreate(data) {
	  var node = mountVnode(data.vnode, data.parentContext);
	  data.parentNode.insertBefore(node, data.parentNode.childNodes[data.index]);
	}
	
	function fireEvent(e, type, dom) {
	  e = new SyntheticEvent(e);
	  e.type = type;
	  dispatchEvent(e);
	}
	
	//Ie6-8 oninput使用propertychange进行冒充，触发一个ondatasetchanged事件
	function fixIEInputHandle(e) {
	  if (e.propertyName === "value") {
	    fireEvent(e, "input");
	  }
	}
	function fixIEInput(dom, name) {
	  addEvent(dom, "propertychange", fixIEInputHandle);
	}
	
	function fixIEChangeHandle(e) {
	  var dom = e.srcElement;
	  if (dom.type === "select-one") {
	    var idx = dom.selectedIndex,
	        option,
	        attr;
	    if (idx > -1) {
	      //IE 下select.value不会改变
	      option = dom.options[idx];
	      attr = option.attributes.value;
	      dom.value = attr && attr.specified ? option.value : option.text;
	    }
	  }
	
	  fireEvent(e, "change");
	}
	function fixIEChange(dom, name) {
	  //IE6-8, radio, checkbox的点击事件必须在失去焦点时才触发
	  var eventType = dom.type === "radio" || dom.type === "checkbox" ? "click" : "change";
	  addEvent(dom, eventType, fixIEChangeHandle);
	}
	
	function fixIESubmit(dom, name) {
	  if (dom.nodeName === "FORM") {
	    addEvent(dom, "submit", dispatchEvent);
	  }
	}
	
	if (msie < 9) {
	  String("focus,blur").replace(/\w+/g, function (type) {
	    eventHooks[type] = function (dom) {
	      var eventType = type === "focus" ? "focusin" : "focusout";
	      addEvent(dom, eventType, function (e) {
	        fireEvent(e, type);
	      });
	    };
	  });
	
	  String("mouseenter,mouseleave").replace(/\w+/g, function (type) {
	    eventHooks[type] = function (dom) {
	      var eventType = type === "mouseenter" ? "mouseover" : "mouseout";
	      addEvent(dom, eventType, function (e) {
	        var t = e.relatedTarget;
	        if (!t || t !== elem && elem.contains(t)) {
	          fireEvent(e, type);
	        }
	      });
	    };
	  });
	
	  Object.assign(eventPropHooks, oneObject("mousemove, mouseout,mouseenter, mouseleave, mouseout,mousewheel, mousewheel, whe" + "el, click", function (event) {
	    if (!("pageX" in event)) {
	      var doc = event.target.ownerDocument || document;
	      var box = doc.compatMode === "BackCompat" ? doc.body : doc.documentElement;
	      event.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0);
	      event.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0);
	    }
	  }));
	
	  Object.assign(eventPropHooks, oneObject("keyup, keydown, keypress", function (event) {
	    /* istanbul ignore next  */
	    if (event.which == null && event.type.indexOf("key") === 0) {
	      /* istanbul ignore next  */
	      event.which = event.charCode != null ? event.charCode : event.keyCode;
	    }
	  }));
	
	  //IE8中select.value不会在onchange事件中随用户的选中而改变其value值，也不让用户直接修改value 只能通过这个hack改变
	  try {
	    Object.defineProperty(HTMLSelectElement.prototype, "value", {
	      set: function set(v) {
	        this._fixIEValue = v;
	      },
	      get: function get() {
	        return this._fixIEValue;
	      }
	    });
	  } catch (e) {}
	  eventHooks.input = fixIEInput;
	  eventHooks.inputcapture = fixIEInput;
	  eventHooks.change = fixIEChange;
	  eventHooks.changecapture = fixIEChange;
	  eventHooks.submit = fixIESubmit;
	}
	
	var React = {
	  version: "1.0.7",
	  PropTypes: PropTypes,
	  Children: Children, //为了react-redux
	  render: render,
	  findDOMNode: findDOMNode,
	  options: options,
	  unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
	  unmountComponentAtNode: unmountComponentAtNode,
	  isValidElement: isValidElement,
	  createClass: createClass,
	  createElement: createElement,
	  cloneElement: cloneElement,
	  PureComponent: PureComponent,
	  Component: Component,
	  createFactory: function createFactory(type) {
	    console.warn("createFactory将被废弃");
	    var factory = createElement.bind(null, type);
	    factory.type = type;
	    return factory;
	  }
	};
	
	win.ReactDOM = React;
	
	return React;
	
	})));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var styles = __webpack_require__(9);
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(2);
	
	var App = function App() {
	    return React.createElement(
	        'div',
	        { style: styles.container },
	        React.createElement(
	            'h1',
	            null,
	            'Welcome to use anujs'
	        )
	    );
	};
	
	window.onload = function () {
	    window.s = ReactDOM.render(React.createElement(App, null), document.getElementById('example'));
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};
	
	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}
	
		if (useSourceMap && typeof btoa === 'function') {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});
	
			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}
	
		return [content].join('\n');
	}
	
	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		// eslint-disable-next-line no-undef
		var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
	
		return '/*# ' + data + ' */';
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	   * CommonJS module that exports EventSource polyfill version 0.9.6
	   * This module is intended for browser side use
	   * =====================================================================
	   * THIS IS A POLYFILL MODULE, SO IT HAS SIDE EFFECTS
	   * IT AUTOMATICALLY CHECKS IF window OBJECT DEFINES EventSource
	   * AND ADD THE EXPORTED ONE IN CASE IT IS UNDEFINED
	   * =====================================================================
	   * Supported by sc AmvTek srl
	   * :email: devel@amvtek.com
	 */
	
	
	var PolyfillEventSource = __webpack_require__(6).EventSource;
	module.exports = PolyfillEventSource;
	
	// Add EventSource to window if it is missing...
	if (window && !window.EventSource){
	    window.EventSource = PolyfillEventSource;
	    if (console){
		console.log("polyfill-eventsource added missing EventSource to window");
	    }
	}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/*
	   * EventSource polyfill version 0.9.6
	   * Supported by sc AmvTek srl
	   * :email: devel@amvtek.com
	 */
	;(function (global) {
	
	    if (global.EventSource && !global._eventSourceImportPrefix){
	        return;
	    }
	
	    var evsImportName = (global._eventSourceImportPrefix||'')+"EventSource";
	
	    var EventSource = function (url, options) {
	
	        if (!url || typeof url != 'string') {
	            throw new SyntaxError('Not enough arguments');
	        }
	
	        this.URL = url;
	        this.setOptions(options);
	        var evs = this;
	        setTimeout(function(){evs.poll()}, 0);
	    };
	
	    EventSource.prototype = {
	
	        CONNECTING: 0,
	
	        OPEN: 1,
	
	        CLOSED: 2,
	
	        defaultOptions: {
	
	            loggingEnabled: false,
	
	            loggingPrefix: "eventsource",
	
	            interval: 500, // milliseconds
	
	            bufferSizeLimit: 256*1024, // bytes
	
	            silentTimeout: 300000, // milliseconds
	
	            getArgs:{
	                'evs_buffer_size_limit': 256*1024
	            },
	
	            xhrHeaders:{
	                'Accept': 'text/event-stream',
	                'Cache-Control': 'no-cache',
	                'X-Requested-With': 'XMLHttpRequest'
	            }
	        },
	
	        setOptions: function(options){
	
	            var defaults = this.defaultOptions;
	            var option;
	
	            // set all default options...
	            for (option in defaults){
	
	                if ( defaults.hasOwnProperty(option) ){
	                    this[option] = defaults[option];
	                }
	            }
	
	            // override with what is in options
	            for (option in options){
	
	                if (option in defaults && options.hasOwnProperty(option)){
	                    this[option] = options[option];
	                }
	            }
	
	            // if getArgs option is enabled
	            // ensure evs_buffer_size_limit corresponds to bufferSizeLimit
	            if (this.getArgs && this.bufferSizeLimit) {
	
	                this.getArgs['evs_buffer_size_limit'] = this.bufferSizeLimit;
	            }
	
	            // if console is not available, force loggingEnabled to false
	            if (typeof console === "undefined" || typeof console.log === "undefined") {
	
	                this.loggingEnabled = false;
	            }
	        },
	
	        log: function(message) {
	
	            if (this.loggingEnabled) {
	
	                console.log("[" + this.loggingPrefix +"]:" + message)
	            }
	        },
	
	        poll: function() {
	
	            try {
	
	                if (this.readyState == this.CLOSED) {
	                    return;
	                }
	
	                this.cleanup();
	                this.readyState = this.CONNECTING;
	                this.cursor = 0;
	                this.cache = '';
	                this._xhr = new this.XHR(this);
	                this.resetNoActivityTimer();
	
	            }
	            catch (e) {
	
	                // in an attempt to silence the errors
	                this.log('There were errors inside the pool try-catch');
	                this.dispatchEvent('error', { type: 'error', data: e.message });
	            }
	        },
	
	        pollAgain: function (interval) {
	
	            // schedule poll to be called after interval milliseconds
	            var evs = this;
	            evs.readyState = evs.CONNECTING;
	            evs.dispatchEvent('error', {
	                type: 'error',
	                data: "Reconnecting "
	            });
	            this._pollTimer = setTimeout(function(){evs.poll()}, interval||0);
	        },
	
	
	        cleanup: function() {
	
	            this.log('evs cleaning up')
	
	            if (this._pollTimer){
	                clearInterval(this._pollTimer);
	                this._pollTimer = null;
	            }
	
	            if (this._noActivityTimer){
	                clearInterval(this._noActivityTimer);
	                this._noActivityTimer = null;
	            }
	
	            if (this._xhr){
	                this._xhr.abort();
	                this._xhr = null;
	            }
	        },
	
	        resetNoActivityTimer: function(){
	
	            if (this.silentTimeout){
	
	                if (this._noActivityTimer){
	                    clearInterval(this._noActivityTimer);
	                }
	                var evs = this;
	                this._noActivityTimer = setTimeout(
	                        function(){ evs.log('Timeout! silentTImeout:'+evs.silentTimeout); evs.pollAgain(); },
	                        this.silentTimeout
	                        );
	            }
	        },
	
	        close: function () {
	
	            this.readyState = this.CLOSED;
	            this.log('Closing connection. readyState: '+this.readyState);
	            this.cleanup();
	        },
	
	        ondata: function() {
	
	            var request = this._xhr;
	
	            if (request.isReady() && !request.hasError() ) {
	                // reset the timer, as we have activity
	                this.resetNoActivityTimer();
	
	                // move this EventSource to OPEN state...
	                if (this.readyState == this.CONNECTING) {
	                    this.readyState = this.OPEN;
	                    this.dispatchEvent('open', { type: 'open' });
	                }
	
	                var buffer = request.getBuffer();
	
	                if (buffer.length > this.bufferSizeLimit) {
	                    this.log('buffer.length > this.bufferSizeLimit');
	                    this.pollAgain();
	                }
	
	                if (this.cursor == 0 && buffer.length > 0){
	
	                    // skip byte order mark \uFEFF character if it starts the stream
	                    if (buffer.substring(0,1) == '\uFEFF'){
	                        this.cursor = 1;
	                    }
	                }
	
	                var lastMessageIndex = this.lastMessageIndex(buffer);
	                if (lastMessageIndex[0] >= this.cursor){
	
	                    var newcursor = lastMessageIndex[1];
	                    var toparse = buffer.substring(this.cursor, newcursor);
	                    this.parseStream(toparse);
	                    this.cursor = newcursor;
	                }
	
	                // if request is finished, reopen the connection
	                if (request.isDone()) {
	                    this.log('request.isDone(). reopening the connection');
	                    this.pollAgain(this.interval);
	                }
	            }
	            else if (this.readyState !== this.CLOSED) {
	
	                this.log('this.readyState !== this.CLOSED');
	                this.pollAgain(this.interval);
	
	                //MV: Unsure why an error was previously dispatched
	            }
	        },
	
	        parseStream: function(chunk) {
	
	            // normalize line separators (\r\n,\r,\n) to \n
	            // remove white spaces that may precede \n
	            chunk = this.cache + this.normalizeToLF(chunk);
	
	            var events = chunk.split('\n\n');
	
	            var i, j, eventType, datas, line, retry;
	
	            for (i=0; i < (events.length - 1); i++) {
	
	                eventType = 'message';
	                datas = [];
	                parts = events[i].split('\n');
	
	                for (j=0; j < parts.length; j++) {
	
	                    line = this.trimWhiteSpace(parts[j]);
	
	                    if (line.indexOf('event') == 0) {
	
	                        eventType = line.replace(/event:?\s*/, '');
	                    }
	                    else if (line.indexOf('retry') == 0) {
	
	                        retry = parseInt(line.replace(/retry:?\s*/, ''));
	                        if(!isNaN(retry)) {
	                            this.interval = retry;
	                        }
	                    }
	                    else if (line.indexOf('data') == 0) {
	
	                        datas.push(line.replace(/data:?\s*/, ''));
	                    }
	                    else if (line.indexOf('id:') == 0) {
	
	                        this.lastEventId = line.replace(/id:?\s*/, '');
	                    }
	                    else if (line.indexOf('id') == 0) { // this resets the id
	
	                        this.lastEventId = null;
	                    }
	                }
	
	                if (datas.length) {
	                    // dispatch a new event
	                    var event = new MessageEvent(eventType, datas.join('\n'), window.location.origin, this.lastEventId);
	                    this.dispatchEvent(eventType, event);
	                }
	            }
	
	            this.cache = events[events.length - 1];
	        },
	
	        dispatchEvent: function (type, event) {
	            var handlers = this['_' + type + 'Handlers'];
	
	            if (handlers) {
	
	                for (var i = 0; i < handlers.length; i++) {
	                    handlers[i].call(this, event);
	                }
	            }
	
	            if (this['on' + type]) {
	                this['on' + type].call(this, event);
	            }
	
	        },
	
	        addEventListener: function (type, handler) {
	            if (!this['_' + type + 'Handlers']) {
	                this['_' + type + 'Handlers'] = [];
	            }
	
	            this['_' + type + 'Handlers'].push(handler);
	        },
	
	        removeEventListener: function (type, handler) {
	            var handlers = this['_' + type + 'Handlers'];
	            if (!handlers) {
	                return;
	            }
	            for (var i = handlers.length - 1; i >= 0; --i) {
	                if (handlers[i] === handler) {
	                    handlers.splice(i, 1);
	                    break;
	                }
	            }
	        },
	
	        _pollTimer: null,
	
	        _noactivityTimer: null,
	
	        _xhr: null,
	
	        lastEventId: null,
	
	        cache: '',
	
	        cursor: 0,
	
	        onerror: null,
	
	        onmessage: null,
	
	        onopen: null,
	
	        readyState: 0,
	
	        // ===================================================================
	        // helpers functions
	        // those are attached to prototype to ease reuse and testing...
	
	        urlWithParams: function (baseURL, params) {
	
	            var encodedArgs = [];
	
	            if (params){
	
	                var key, urlarg;
	                var urlize = encodeURIComponent;
	
	                for (key in params){
	                    if (params.hasOwnProperty(key)) {
	                        urlarg = urlize(key)+'='+urlize(params[key]);
	                        encodedArgs.push(urlarg);
	                    }
	                }
	            }
	
	            if (encodedArgs.length > 0){
	
	                if (baseURL.indexOf('?') == -1)
	                    return baseURL + '?' + encodedArgs.join('&');
	                return baseURL + '&' + encodedArgs.join('&');
	            }
	            return baseURL;
	        },
	
	        lastMessageIndex: function(text) {
	
	            var ln2 =text.lastIndexOf('\n\n');
	            var lr2 = text.lastIndexOf('\r\r');
	            var lrln2 = text.lastIndexOf('\r\n\r\n');
	
	            if (lrln2 > Math.max(ln2, lr2)) {
	                return [lrln2, lrln2+4];
	            }
	            return [Math.max(ln2, lr2), Math.max(ln2, lr2) + 2]
	        },
	
	        trimWhiteSpace: function(str) {
	            // to remove whitespaces left and right of string
	
	            var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
	            return str.replace(reTrim, '');
	        },
	
	        normalizeToLF: function(str) {
	
	            // replace \r and \r\n with \n
	            return str.replace(/\r\n|\r/g, '\n');
	        }
	
	    };
	
	    if (!isOldIE()){
	
	        EventSource.isPolyfill = "XHR";
	
	        // EventSource will send request using XMLHttpRequest
	        EventSource.prototype.XHR = function(evs) {
	
	            request = new XMLHttpRequest();
	            this._request = request;
	            evs._xhr = this;
	
	            // set handlers
	            request.onreadystatechange = function(){
	                if (request.readyState > 1 && evs.readyState != evs.CLOSED) {
	                    if (request.status == 200 || (request.status>=300 && request.status<400)){
	                        evs.ondata();
	                    }
	                    else {
	                        request._failed = true;
	                        evs.readyState = evs.CLOSED;
	                        evs.dispatchEvent('error', {
	                            type: 'error',
	                            data: "The server responded with "+request.status
	                        });
	                        evs.close();
	                    }
	                }
	            };
	
	            request.onprogress = function () {
	            };
	
	            request.open('GET', evs.urlWithParams(evs.URL, evs.getArgs), true);
	
	            var headers = evs.xhrHeaders; // maybe null
	            for (var header in headers) {
	                if (headers.hasOwnProperty(header)){
	                    request.setRequestHeader(header, headers[header]);
	                }
	            }
	            if (evs.lastEventId) {
	                request.setRequestHeader('Last-Event-Id', evs.lastEventId);
	            }
	
	            request.send();
	        };
	
	        EventSource.prototype.XHR.prototype = {
	
	            useXDomainRequest: false,
	
	            _request: null,
	
	            _failed: false, // true if we have had errors...
	
	            isReady: function() {
	
	
	                return this._request.readyState >= 2;
	            },
	
	            isDone: function() {
	
	                return (this._request.readyState == 4);
	            },
	
	            hasError: function() {
	
	                return (this._failed || (this._request.status >= 400));
	            },
	
	            getBuffer: function() {
	
	                var rv = '';
	                try {
	                    rv = this._request.responseText || '';
	                }
	                catch (e){}
	                return rv;
	            },
	
	            abort: function() {
	
	                if ( this._request ) {
	                    this._request.abort();
	                }
	            }
	        };
	    }
	    else {
	
		EventSource.isPolyfill = "IE_8-9";
	
	        // patch EventSource defaultOptions
	        var defaults = EventSource.prototype.defaultOptions;
	        defaults.xhrHeaders = null; // no headers will be sent
	        defaults.getArgs['evs_preamble'] = 2048 + 8;
	
	        // EventSource will send request using Internet Explorer XDomainRequest
	        EventSource.prototype.XHR = function(evs) {
	
	            request = new XDomainRequest();
	            this._request = request;
	
	            // set handlers
	            request.onprogress = function(){
	                request._ready = true;
	                evs.ondata();
	            };
	
	            request.onload = function(){
	                this._loaded = true;
	                evs.ondata();
	            };
	
	            request.onerror = function(){
	                this._failed = true;
	                evs.readyState = evs.CLOSED;
	                evs.dispatchEvent('error', {
	                    type: 'error',
	                    data: "XDomainRequest error"
	                });
	            };
	
	            request.ontimeout = function(){
	                this._failed = true;
	                evs.readyState = evs.CLOSED;
	                evs.dispatchEvent('error', {
	                    type: 'error',
	                    data: "XDomainRequest timed out"
	                });
	            };
	
	            // XDomainRequest does not allow setting custom headers
	            // If EventSource has enabled the use of GET arguments
	            // we add parameters to URL so that server can adapt the stream...
	            var reqGetArgs = {};
	            if (evs.getArgs) {
	
	                // copy evs.getArgs in reqGetArgs
	                var defaultArgs = evs.getArgs;
	                    for (var key in defaultArgs) {
	                        if (defaultArgs.hasOwnProperty(key)){
	                            reqGetArgs[key] = defaultArgs[key];
	                        }
	                    }
	                if (evs.lastEventId){
	                    reqGetArgs['evs_last_event_id'] = evs.lastEventId;
	                }
	            }
	            // send the request
	
	            request.open('GET', evs.urlWithParams(evs.URL,reqGetArgs));
	            request.send();
	        };
	
	        EventSource.prototype.XHR.prototype = {
	
	            useXDomainRequest: true,
	
	            _request: null,
	
	            _ready: false, // true when progress events are dispatched
	
	            _loaded: false, // true when request has been loaded
	
	            _failed: false, // true if when request is in error
	
	            isReady: function() {
	
	                return this._request._ready;
	            },
	
	            isDone: function() {
	
	                return this._request._loaded;
	            },
	
	            hasError: function() {
	
	                return this._request._failed;
	            },
	
	            getBuffer: function() {
	
	                var rv = '';
	                try {
	                    rv = this._request.responseText || '';
	                }
	                catch (e){}
	                return rv;
	            },
	
	            abort: function() {
	
	                if ( this._request){
	                    this._request.abort();
	                }
	            }
	        };
	    }
	
	    function MessageEvent(type, data, origin, lastEventId) {
	
	        this.bubbles = false;
	        this.cancelBubble = false;
	        this.cancelable = false;
	        this.data = data || null;
	        this.origin = origin || '';
	        this.lastEventId = lastEventId || '';
	        this.type = type || 'message';
	    }
	
	    function isOldIE () {
	
	        //return true if we are in IE8 or IE9
	        return (window.XDomainRequest && (window.XMLHttpRequest && new XMLHttpRequest().responseType === undefined)) ? true : false;
	    }
	
	    global[evsImportName] = EventSource;
	})(this);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [],
		fixUrls = __webpack_require__(8);
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		options.attrs = typeof options.attrs === "object" ? options.attrs : {};
	
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	};
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		options.attrs.type = "text/css";
	
		attachTagAttrs(styleElement, options.attrs);
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";
	
		attachTagAttrs(linkElement, options.attrs);
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function attachTagAttrs(element, attrs) {
		Object.keys(attrs).forEach(function (key) {
			element.setAttribute(key, attrs[key]);
		});
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement, options);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
	
		if (options.convertToAbsoluteUrls || autoFixUrls){
			css = fixUrls(css);
		}
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */
	
	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;
	
	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }
	
		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }
	
	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
	
		// convert each url(...)
		var fixedCss = css.replace(/url *\( *(.+?) *\)/g, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });
	
			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}
	
			// convert the url to a full url
			var newUrl;
	
			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}
	
			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});
	
		// send back the fixed css
		return fixedCss;
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(1);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(1, function() {
				var newContent = __webpack_require__(1);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	clientOverlay.style.display = 'none';
	clientOverlay.style.background = '#fdd';
	clientOverlay.style.color = '#000';
	clientOverlay.style.position = 'fixed';
	clientOverlay.style.zIndex = 9999;
	clientOverlay.style.left = 0;
	clientOverlay.style.right = 0;
	clientOverlay.style.top = 0;
	clientOverlay.style.bottom = 0;
	clientOverlay.style.overflow = 'auto';
	
	if (document.body) {
	  document.body.appendChild(clientOverlay);
	}
	
	exports.showProblems =
	function showProblems(lines) {
	  clientOverlay.innerHTML = '';
	  clientOverlay.style.display = 'block';
	  lines.forEach(function(msg) {
	    console.warn("[HMR] " + msg);
	    var pre = document.createElement('pre');
	    pre.textContent = msg;
	    clientOverlay.appendChild(pre);
	  });
	};
	
	exports.clear =
	function clear() {
	  clientOverlay.innerHTML = '';
	  clientOverlay.style.display = 'none';
	};
	


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*eslint-env browser*/
	/*global __resourceQuery*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false
	};
	if (true) {
	  var pathMatch = /path=(.*?)(\&|$)/.exec(__resourceQuery);
	  if (pathMatch) {
	    options.path = pathMatch[1];
	  }
	  var timeoutMatch = /timeout=(.*?)(\&|$)/.exec(__resourceQuery);
	  if (timeoutMatch) {
	    options.timeout = parseFloat(timeoutMatch[1]);
	  }
	  var overlayMatch = /overlay=(.*?)(\&|$)/.exec(__resourceQuery);
	  if (overlayMatch) {
	    options.overlay = overlayMatch[1] !== 'false';
	  }
	  var reloadMatch = /reload=(.*?)(\&|$)/.exec(__resourceQuery);
	  if (reloadMatch) {
	    options.reload = reloadMatch[1] !== 'false';
	  }
	}
	
	connect();
	
	function connect() {
	  var source = new window.EventSource(options.path);
	  var lastActivity = new Date();
	
	  source.onopen = handleOnline;
	  source.onmessage = handleMessage;
	  source.onerror = handleDisconnect;
	
	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);
	
	  function handleOnline() {
	    console.log("[HMR] connected");
	    lastActivity = new Date();
	  }
	
	  function handleMessage(event) {
	    lastActivity = new Date();
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(connect, options.timeout);
	  }
	
	}
	
	var strip = __webpack_require__(13);
	
	var overlay;
	if (options.overlay) {
	  overlay = __webpack_require__(10);
	}
	
	function problems(type, obj) {
	  console.warn("[HMR] bundle has " + type + ":");
	  var list = [];
	  obj[type].forEach(function(msg) {
	    var clean = strip(msg);
	    console.warn("[HMR] " + clean);
	    list.push(clean);
	  });
	  if (overlay && type !== 'warnings') overlay.showProblems(list);
	}
	
	function success() {
	  if (overlay) overlay.clear();
	}
	
	var processUpdate = __webpack_require__(14);
	
	function processMessage(obj) {
	  if (obj.action == "building") {
	    console.log("[HMR] bundle rebuilding");
	  } else if (obj.action == "built") {
	    console.log("[HMR] bundle rebuilt in " + obj.time + "ms");
	    if (obj.errors.length > 0) {
	      problems('errors', obj);
	    } else {
	      if (obj.warnings.length > 0) {
	        problems('warnings', obj);
	      } else {
	        success();
	      }
	      
	      processUpdate(obj.hash, obj.modules, options.reload);
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?reload=true"))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = function () {
		return /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/g;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(12)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */
	
	/* global window __webpack_hash__ */
	
	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };
	
	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}
	
	module.exports = function(hash, moduleMap, reload) {
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    console.log("[HMR] Checking for updates on the server...");
	    check();
	  }
	
	  function check() {
	    module.hot.check(function(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if(!updatedModules) {
	        console.warn("[HMR] Cannot find update (Full reload needed)");
	        console.warn("[HMR] (Probably because of restarting the server)");
	        performReload();
	        return null;
	      }
	
	      module.hot.apply(applyOptions, function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);
	
	        if (!upToDate()) check();
	
	        logUpdates(updatedModules, renewedModules);
	      });
	    });
	  }
	
	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });
	
	    if(unacceptedModules.length > 0) {
	      console.warn(
	        "[HMR] The following modules couldn't be hot updated: " +
	        "(Full reload needed)"
	      );
	      unacceptedModules.forEach(function(moduleId) {
	        console.warn("[HMR]  - " + moduleMap[moduleId]);
	      });
	      performReload();
	      return;
	    }
	
	    if(!renewedModules || renewedModules.length === 0) {
	      console.log("[HMR] Nothing hot updated.");
	    } else {
	      console.log("[HMR] Updated modules:");
	      renewedModules.forEach(function(moduleId) {
	        console.log("[HMR]  - " + moduleMap[moduleId]);
	      });
	    }
	
	    if (upToDate()) {
	      console.log("[HMR] App is up to date.");
	    }
	  }
	
	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      console.warn("[HMR] Cannot check for update (Full reload needed)");
	      console.warn("[HMR] " + err.stack || err.message);
	      performReload();
	      return;
	    }
	    console.warn("[HMR] Update check failed: " + err.stack || err.message);
	  }
	
	  function performReload() {
	    console.warn("[HMR] Reloading page");
	    if (reload) window.location.reload();
	  }
	};


/***/ })
/******/ ]);