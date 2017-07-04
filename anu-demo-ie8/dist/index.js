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
/******/ 	var hotCurrentHash = "c4ce0f53f91c9afc109d"; // eslint-disable-line no-unused-vars
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

	__webpack_require__(6);
	__webpack_require__(18);
	module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 兼容IE6-8的版本，有问题请加QQ 453286795 by 司徒正美 Copyright 2017-06-30T07:07:29.851Z
	 */
	
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.React = factory());
	}(this, function () {
	
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
	    return __type.call(obj) === "[object Function]";
	  }
	
	  var rword = /[^, ]+/g;
	
	  function oneObject(array, val) {
	    if (__type.call(array) === "[object String]") {
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
	    immune: {} // Object.freeze(midway) ;midway.aaa = 'throw err';midway.immune.aaa = 'safe'
	  };
	
	  function checkNull(vnode, type) {
	    if (vnode === null || vnode === false) {
	      return { type: "#comment", text: "empty" };
	    } else if (!vnode || !vnode.vtype) {
	      throw new Error("@" + type.name + "#render:You may have returned undefined, an array or some other invalid object");
	    }
	    return vnode;
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
	    "#comment": [],
	    span: [],
	    div: [],
	    td: [],
	    p: []
	  };
	
	  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
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
	            if (!stack.length && val && val.length) {
	              __push.apply(stack, val);
	            }
	            break;
	          default:
	            checkProps = 1;
	            props[_i] = val;
	        }
	      }
	    }
	
	    var children = flattenChildren(stack);
	
	    if (typeof type === "function") {
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
	        children = EMPTY_CHILDREN;
	
	    while (stack.length) {
	      //比较巧妙地判定是否为子数组
	      if ((child = stack.pop()) && child.pop !== undefined) {
	        //   deep = child._deep ? child._deep + 1 : 1;
	        for (var i = 0; i < child.length; i++) {
	          var el = stack[stack.length] = child[i];
	          //  if (el) {
	          //    el._deep = deep;
	          //  }
	        }
	      } else {
	        // eslint-disable-next-line
	        if (child === null || child === void 666 || child === false || child === true) {
	          continue;
	        }
	        var childType = typeof child === "undefined" ? "undefined" : _typeof(child);
	        if (childType !== "object") {
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
	
	        if (children === EMPTY_CHILDREN) {
	          children = [child];
	        } else {
	          children.unshift(child);
	        }
	      }
	    }
	    return children;
	  }
	
	  //fix 0.14对此方法的改动，之前refs里面保存的是虚拟DOM
	  function getDOMNode() {
	    return this;
	  }
	  function __ref(dom) {
	    var instance = this._owner;
	    if (dom) {
	      dom.getDOMNode = getDOMNode;
	    }
	    if (instance) {
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
	    var refType = typeof ref === "undefined" ? "undefined" : _typeof(ref);
	    if (refType === "string") {
	      this.__refKey = ref;
	      this.ref = __ref;
	    } else if (refType === "function") {
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
	
	  var list = [];
	  var scheduler = {
	    add: function add(el) {
	      list.push(el);
	    },
	    run: function run(no) {
	      var queue = list;
	      if (!list.length) return;
	      list = [];
	      queue.forEach(function (instance) {
	        if (typeof instance === "function") {
	          instance(); //处理ref方法
	          return;
	        }
	        if (instance._pendingCallbacks.length) {
	          //处理componentWillMount产生的回调
	          instance._pendingCallbacks.forEach(function (fn) {
	            fn.call(instance);
	          });
	          instance._pendingCallbacks.length = 0;
	        }
	        if (instance.componentDidMount) {
	          instance._updating = true;
	          instance.componentDidMount();
	          instance._updating = false;
	          instance._hasDidMount = true;
	
	          if (instance._pendingStates.length) if (!instance._asyncUpdating) {
	            instance._asyncUpdating = true;
	            var timeoutID = setTimeout(function () {
	              clearTimeout(timeoutID);
	              instance._asyncUpdating = false;
	              options.refreshComponent(instance);
	              //处理componentDidMount产生的回调
	            }, 0);
	          }
	        }
	      });
	    }
	  };
	
	  /**
	   *组件的基因
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
	     * this._disableSetState = true 用于阻止组件在componentWillMount/componentWillReceiveProps进行render
	     * this._updating = true 用于将componentDidMount发生setState/forceUpdate 延迟到整个render后再触发
	     * this._disposed = true 阻止组件在销毁后还进行diff
	     * this._asyncUpdating = true 让组件的异步更新在同一个时间段只触发一次
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
	      if (n == 0) {
	        return this.state;
	      }
	      var queue = this._pendingStates.concat();
	      this._pendingStates.length = 0;
	
	      var nextState = extend({}, this.state);
	      for (var i = 0; i < n; i++) {
	        var partial = queue[i];
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
	    if (instance._disableSetState === true) {
	      this._forceUpdate = false;
	      //只存储回调，但不会触发组件的更新
	      return;
	    }
	    if (instance._updating) {
	      scheduler.add(function () {
	        options.refreshComponent(instance);
	      });
	      return;
	    }
	
	    if (instance._forceUpdate) {
	      options.refreshComponent(instance);
	      return;
	    }
	    var timeoutID = setTimeout(function () {
	      clearTimeout(timeoutID);
	      options.refreshComponent(instance);
	    }, 0);
	  }
	
	  var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	  function shallowEqual(objA, objB) {
	    if (Object.is(objA, objB)) {
	      return true;
	    }
	
	    if ((typeof objA === "undefined" ? "undefined" : _typeof$1(objA)) !== "object" || objA === null || (typeof objB === "undefined" ? "undefined" : _typeof$1(objB)) !== "object" || objB === null) {
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
	
	  inherit(PureComponent, Component);
	
	  var fn = PureComponent.prototype;
	
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
	
	  var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
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
	  fakeDoc.textContent = '';
	  var inBrowser = (typeof window === "undefined" ? "undefined" : _typeof$2(window)) === "object" && window.alert;
	
	  var win = inBrowser ? window : {
	    document: fakeDoc
	  };
	
	  var document = win.document || fakeDoc;
	  var isStandard = 'textContent' in document;
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
	        node.textContent = '';
	      } else {
	        emptyElement(node);
	      }
	    }
	    fragment.appendChild(node);
	    fragment.removeChild(node);
	    var nodeName = node.__n || (node.__n = toLowerCase(node.nodeName));
	    if (recyclables[nodeName] && recyclables[nodeName].length < 72) {
	      recyclables[nodeName].push(node);
	    } else {
	      recyclables[nodeName] = [node];
	    }
	  }
	
	  var versions = {
	    objectobject: 7, //IE7-8
	    objectundefined: 6, //IE6
	    undefinedfunction: NaN, // other modern browsers
	    undefinedobject: NaN
	  };
	  /* istanbul ignore next  */
	  var msie = document.documentMode || versions[_typeof$2(document.all) + (typeof XMLHttpRequest === "undefined" ? "undefined" : _typeof$2(XMLHttpRequest))];
	
	  var modern = /NaN|undefined/.test(msie) || msie > 8;
	
	  function createDOMElement(vnode) {
	    var type = vnode.type;
	    var node = recyclables[type] && recyclables[type].pop();
	    if (node) {
	      node.nodeValue = vnode.text;
	      return node;
	    }
	    if (type === "#text") {
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
	        if (val === void 0 || val === null || val === false) {
	          val = ""; //清除样式
	        } else if (rnumber.test(val) && !cssNumber[name]) {
	          val = val + "px"; //添加单位
	        }
	        dom.style[name] = val; //应用样式
	      }
	    }
	    // 如果旧样式存在，但新样式已经去掉
	    for (var name in oldStyle) {
	      if (!(name in newStyle)) {
	        dom.style[name] = ""; //清除样式
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
	  var eventCamelCache = {}; //根据事件对象的type得到驼峰风格的type， 如 click --> Click, mousemove --> MouseMove
	  var eventPropHooks = {}; //用于在事件回调里对事件对象进行
	  var eventHooks = {}; //用于在元素上绑定特定的事件
	  var eventLowerCache = {
	    //根据onXXX得到其全小写的事件名, onClick --> click, onMouseMove --> mousemove
	    onClick: "click",
	    onChange: "change",
	    onWheel: "wheel",
	    onFocus: "datasetchanged",
	    onBlur: "datasetchanged"
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
	    var __type__ = e.__type__ || e.type;
	    e = new SyntheticEvent(e);
	
	    var target = e.target;
	    var paths = [];
	    do {
	      var events = target.__events;
	      if (events) {
	        paths.push({ dom: target, events: events });
	      }
	    } while ((target = target.parentNode) && target.nodeType === 1);
	    // target --> parentNode --> body --> html
	    var type = eventCamelCache[__type__] || __type__;
	
	    var capitalized = capitalize(type);
	    var bubble = "on" + capitalized;
	    var captured = "on" + capitalized + "Capture";
	
	    var hook = eventPropHooks[__type__];
	    if (hook && false === hook(e)) {
	      return;
	    }
	    scheduler.run();
	    triggerEventFlow(paths, captured, e);
	
	    if (!e._stopPropagation) {
	      triggerEventFlow(paths.reverse(), bubble, e);
	    }
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
	
	  function capitalize(str) {
	    return str.charAt(0).toUpperCase() + str.slice(1);
	  }
	
	  function addGlobalEventListener(name) {
	    if (!globalEvents[name]) {
	      globalEvents[name] = true;
	      addEvent(document, name, dispatchEvent);
	    }
	  }
	  function addEvent(el, type, fn) {
	    if (el.addEventListener) {
	      el.addEventListener(type, fn);
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
	    eventCamelCache[lower] = camel;
	    return lower;
	  }
	
	  addEvent.fire = function fire(dom, name, opts) {
	    var hackEvent = document.createEvent("Events");
	    hackEvent.initEvent("datasetchanged", true, true, opts);
	    if (opts) {
	      Object.assign(hackEvent, opts);
	    }
	    hackEvent.__type__ = name;
	    dom.dispatchEvent(hackEvent);
	  };
	
	  eventLowerCache.onWheel = "datasetchanged";
	  /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
	              firefox DOMMouseScroll detail 下3 上-3
	              firefox wheel detlaY 下3 上-3
	              IE9-11 wheel deltaY 下40 上-40
	              chrome wheel deltaY 下100 上-100 */
	  var fixWheelType = "onmousewheel" in document ? "mousewheel" : document.onwheel !== void 0 ? "wheel" : "DOMMouseScroll";
	  var fixWheelDelta = fixWheelType === "mousewheel" ? "wheelDetla" : fixWheelType === "wheel" ? "deltaY" : "detail";
	  eventHooks.onWheel = function (dom) {
	    addEvent(dom, fixWheelType, function (e) {
	      var delta = e[fixWheelDelta] > 0 ? -120 : 120;
	      var wheelDelta = ~~dom._ms_wheel_ + delta;
	      dom._ms_wheel_ = wheelDelta;
	      addEvent.fire(dom, "wheel", {
	        detail: wheelDelta,
	        wheelDeltaY: wheelDelta,
	        wheelDelta: wheelDelta
	      });
	    });
	  };
	
	  eventHooks.onFocus = function (dom) {
	    addEvent(dom, "focus", function (e) {
	      addEvent.fire(dom, "focus");
	    }, true);
	  };
	  eventHooks.onBlur = function (dom) {
	    addEvent(dom, "blur", function (e) {
	      addEvent.fire(dom, "blur");
	    }, true);
	  };
	
	  if (isTouch) {
	    eventHooks.onClick = noop;
	    eventHooks.onClickCapture = noop;
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
	  Object.freeze || (Object.freeze = function (a) {
	    return a;
	  });
	
	  var boolAttributes = oneObject("autofocus,autoplay,async,allowTransparency,checked,controls," + "declare,disabled,defer,defaultChecked,defaultSelected," + "isMap,loop,multiple,noHref,noResize,noShade," + "open,readOnly,selected", true);
	
	  var builtIdProperties = oneObject("accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan," + "dateTime,defaultValue,contentEditable,frameBorder,maxLength,marginWidth," + "marginHeight,rowSpan,tabIndex,useMap,vSpace,valueType,vAlign," + //驼蜂风格
	  "value,id,title,alt,htmlFor,name,type,longDesc,className", 1);
	
	  var booleanTag = oneObject("script,iframe,a,map,video,bgsound,form,select,input,textarea,option,keygen,optgroup,label");
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
	    for (var _name in lastProps) {
	      if (!nextProps.hasOwnProperty(_name)) {
	        var hookName2 = getHookType(_name, false, vnode.type, dom);
	        propHooks[hookName2](dom, _name, builtIdProperties[_name] ? "" : false, lastProps);
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
	    for (var _name2 in lastProps) {
	      if (!nextProps.hasOwnProperty(_name2)) {
	        var _val = nextProps[_name2];
	        var hookName2 = getHookTypeSVG(_name2, _val, vnode.type, dom);
	        propHooks[hookName2](dom, _name2, false, lastProps);
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
	    if (!val && val !== "" && val !== 0) {
	      return "removeAttribute";
	    }
	    return name.indexOf("data-") === 0 || typeof dom[name] === "undefined" ? "setAttribute" : "property";
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
	      var method = val === false || val === null || val === undefined ? "removeAttribute" : "setAttribute";
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
	        delete events[name];
	      } else {
	        if (!lastProps[name]) {
	          //添加全局监听事件
	          addGlobalEventListener(getBrowserName(name));
	          var hook = eventHooks[name];
	          if (hook) {
	            hook(dom, name);
	          }
	        }
	
	        events[name] = val;
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
	        console.warn("\u4F60\u4E3A" + vnode.type + "[type=" + domType + "]\u5143\u7D20\u6307\u5B9A\u4E86" + duplexProp + "\u5C5E\u6027\uFF0C\u4F46\u662F\u6CA1\u6709\u63D0\u4F9B\u53E6\u5916\u7684" + Object.keys(keys) + "\n           \u7B49\u7528\u4E8E\u63A7\u5236" + duplexProp + "\u53D8\u5316\u7684\u5C5E\u6027\uFF0C\u90A3\u4E48\u5B83\u662F\u4E00\u4E2A\u975E\u53D7\u63A7\u7EC4\u4EF6\uFF0C\u7528\u6237\u65E0\u6CD5\u901A\u8FC7\u8F93\u5165\u6539\u53D8\u5143\u7D20\u7684" + duplexProp + "\u503C");
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
	    var options = target.options;
	    if (target.multiple) {
	      updateOptionsMore(options, options.length, value);
	    } else {
	      updateOptionsOne(options, options.length, value);
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
	        value = isDefined(props.value) ? props.value : isDefined(props.defaultValue) ? props.defaultValue : multiple ? [] : "",
	        options = [];
	    collectOptions(vnode, props, options);
	    if (multiple) {
	      updateOptionsMore(options, options.length, value);
	    } else {
	      updateOptionsOne(options, options.length, value);
	    }
	  }
	
	  function isDefined(a) {
	    return !(a === null || a === undefined);
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
	
	  function updateOptionsOne(options, n, propValue) {
	    var selectedValue = "" + propValue;
	    for (var i = 0; i < n; i++) {
	      var option = options[i];
	      var value = getOptionValue(option, option.props);
	      if (value === selectedValue) {
	        getOptionSelected(option, true);
	        return;
	      }
	    }
	    if (n) {
	      getOptionSelected(options[0], true);
	    }
	  }
	
	  function updateOptionsMore(options, n, propValue) {
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
	      var option = options[_i];
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
	      }
	      if (!a.uniqueID) {
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
	
	  var instanceMap = new innerMap();
	
	  /**
	   * ReactDOM.render 方法
	   *
	   */
	  function render(vnode, container, callback) {
	    return updateView(vnode, container, callback, {});
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
	    return updateView(vnode, container, callback, parentContext);
	  }
	
	  function isValidElement(vnode) {
	    return vnode && vnode.vtype;
	  }
	
	  function updateView(vnode, container, callback, parentContext) {
	    if (!isValidElement(vnode)) {
	      throw new Error(vnode + "\u5FC5\u987B\u4E3A\u7EC4\u4EF6\u6216\u5143\u7D20\u8282\u70B9, \u4F46\u73B0\u5728\u4F60\u7684\u7C7B\u578B\u5374\u662F" + Object.prototype.toString.call(vnode));
	    }
	    if (!container || container.nodeType !== 1) {
	      throw new Error(container + "\u5FC5\u987B\u4E3A\u5143\u7D20\u8282\u70B9");
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
	      instance.componentWillMount();
	      instance.state = instance._processPendingState();
	    }
	
	    // 如果一个虚拟DOM vnode的type为函数，那么对type实例化所得的对象instance来说 instance._currentElement =
	    // vnode instance有一个render方法，它会生成下一级虚拟DOM ，如果是返回false或null，则变成 空虚拟DOM {type:
	    // '#comment', text: 'empty'} 这个下一级虚拟DOM，对于instance来说，为其_rendered属性
	
	    var rendered = safeRenderComponent(instance, type);
	
	    instance._rendered = rendered;
	    rendered._hostParent = vnode._hostParent;
	
	    var dom = mountVnode(rendered, getChildContext(instance, parentContext), prevRendered);
	    instanceMap.set(instance, dom);
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
	
	  function disposeStateless(vnode) {
	    vnode._disposed = true;
	    disposeVnode(vnode._instance._rendered);
	    vnode._instance = null;
	  }
	
	  function refreshComponent(instance) {
	    //这里触发视图更新
	
	    reRenderComponent(instance);
	
	    instance._forceUpdate = false;
	    instance._pendingCallbacks.forEach(function (fn) {
	      fn.call(instance);
	    });
	    instance._pendingCallbacks.length = 0;
	  }
	
	  //将Component中这个东西移动这里
	  options.refreshComponent = refreshComponent;
	
	  function reRenderComponent(instance) {
	    var node = instanceMap.get(instance);
	
	    if (!instance._hasDidMount) {
	      scheduler.add(function () {
	        setTimeout(function () {
	          refreshComponent(instance);
	        });
	      });
	      scheduler.run();
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
	    // delete instance.lastProps
	    // 生命周期 shouldComponentUpdate(nextProps, nextState, nextContext)
	    if (!instance._forceUpdate && instance.shouldComponentUpdate && instance.shouldComponentUpdate(nextProps, nextState, context) === false) {
	      return node; //注意
	    }
	
	    //生命周期 componentWillUpdate(nextProps, nextState, nextContext)
	    if (instance.componentWillUpdate) {
	      instance.componentWillUpdate(nextProps, nextState, context);
	    }
	
	    instance.props = nextProps;
	    instance.state = nextState;
	    delete instance._updateBatchNumber;
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
	    }
	
	    return dom;
	  }
	
	  function alignVnodes(vnode, newVnode, node, parentContext) {
	    var newNode = node;
	    //eslint-disable-next-line
	    if (newVnode == null) {
	      removeDOMElement(node);
	      disposeVnode(vnode);
	    } else if (!(vnode.type == newVnode.type && vnode.key === newVnode.key && vnode._deep === newVnode._deep)) {
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
	
	  function disposeVnode(vnode) {
	    if (!vnode) {
	      console.warn("in `disposeVnode` method, vnode is undefined", vnode);
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
	        vnode._disposed = true;
	        vnode._hostNode = null;
	        vnode._hostParent = null;
	        break;
	    }
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
	
	  function disposeElement(vnode) {
	    var props = vnode.props;
	
	    var children = props.children;
	    // var childNodes = node.childNodes;
	    for (var i = 0, len = children.length; i < len; i++) {
	      disposeVnode(children[i]);
	    }
	    //eslint-disable-next-line
	    vnode.ref && vnode.ref(null);
	    vnode._hostNode = null;
	    vnode._hostParent = null;
	  }
	
	  function disposeComponent(vnode) {
	    if (!vnode._instance) return;
	    var instance = vnode._instance;
	    vnode._disposed = true;
	    var instance = vnode._instance;
	    if (instance) {
	      if (instance.componentWillUnmount) {
	        instance.componentWillUnmount();
	      }
	      instanceMap["delete"](instance);
	      vnode._instance = instance._currentElement = instance.props = null;
	      disposeVnode(instance._rendered);
	    }
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
	    try {
	      return reRenderComponent(instance);
	    } catch (e) {
	      scheduler.run();
	    }
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
	      } else if (vnode.vtype === 1) {
	        updateElement(vnode, nextVnode, dom, data.parentContext);
	      } else if (vnode.vtype === 4) {
	        dom = updateStateless(vnode, nextVnode, dom, data.parentContext);
	      } else if (vnode.vtype === 2) {
	        dom = updateComponent(vnode, nextVnode, dom, data.parentContext);
	      }
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
	
	  //Ie6-8 oninput使用propertychange进行冒充，触发一个ondatasetchanged事件
	  function fixIEInputHandle(e) {
	    if (e.propertyName === "value") {
	      addEvent.fire(e.srcElement, "input");
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
	    addEvent.fire(dom, "change");
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
	    eventHooks.onFocus = function (dom) {
	      addEvent(dom, "focusin", function (e) {
	        addEvent.fire(dom, "focus");
	      });
	    };
	    eventHooks.onBlur = function (dom) {
	      addEvent(dom, "blurout", function (e) {
	        addEvent.fire(dom, "blur");
	      });
	    };
	
	    Object.assign(eventPropHooks, oneObject("mousemove, mouseout, mouseout, mousewheel, mousewheel, wheel, click", function (event) {
	      if (!("pageX" in event)) {
	        var doc = event.target.ownerDocument || document;
	        var box = doc.compatMode === "BackCompat" ? doc.body : doc.documentElement;
	        event.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0);
	        event.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0);
	      }
	    }));
	
	    Object.assign(eventPropHooks, oneObject("keyup, keydown, keypress", function (event) {
	      if (event.which == null && event.type.indexOf("key") === 0) {
	        event.which = event.charCode != null ? event.charCode : event.keyCode;
	      }
	    }));
	
	    addEvent.fire = function dispatchIEEvent(dom, type, obj) {
	      try {
	        var hackEvent = document.createEventObject();
	        if (obj) {
	          Object.assign(hackEvent, obj);
	        }
	        hackEvent.__type__ = type;
	        //IE6-8触发事件必须保证在DOM树中,否则报"SCRIPT16389: 未指明的错误"
	        dom.fireEvent("ondatasetchanged", hackEvent);
	      } catch (e) {}
	    };
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
	    eventLowerCache.onInput = "datasetchanged";
	    eventLowerCache.onChange = "datasetchanged";
	    eventLowerCache.onInputCapture = "datasetchanged";
	    eventLowerCache.onChangeCapture = "datasetchanged";
	    eventHooks.onInput = fixIEInput;
	    eventHooks.onInputCapture = fixIEInput;
	    eventHooks.onChange = fixIEChange;
	    eventHooks.onChangeCapture = fixIEChange;
	    eventHooks.onSubmit = fixIESubmit;
	    eventHooks.mousewheelFix = eventHooks.mousewheel;
	  }
	
	  var React = {
	    PropTypes: PropTypes,
	    Children: Children, //为了react-redux
	    render: render,
	    findDOMNode: findDOMNode,
	    options: options,
	    unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
	    isValidElement: isValidElement,
	    version: "1.0.3",
	    createElement: createElement,
	    cloneElement: cloneElement,
	    PureComponent: PureComponent,
	    Component: Component
	  };
	
	  win.ReactDOM = React;
	
	  return React;
	
	}));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
	
	var alphaIndex = {};
	var charIndex = {};
	
	createIndexes(alphaIndex, charIndex);
	
	/**
	 * @constructor
	 */
	function Html5Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.decode = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1) === 'x' ?
	                parseInt(entity.substr(2).toLowerCase(), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.decode = function(str) {
	    return new Html5Entities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encode = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    var strLength = str.length;
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var charInfo = charIndex[str.charCodeAt(i)];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        result += str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encode = function(str) {
	    return new Html5Entities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonUTF = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    var strLength = str.length;
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var charInfo = charIndex[c];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonUTF = function(str) {
	    return new Html5Entities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonASCII = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    var strLength = str.length;
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonASCII = function(str) {
	    return new Html5Entities().encodeNonASCII(str);
	 };
	
	/**
	 * @param {Object} alphaIndex Passed by reference.
	 * @param {Object} charIndex Passed by reference.
	 */
	function createIndexes(alphaIndex, charIndex) {
	    var i = ENTITIES.length;
	    var _results = [];
	    while (i--) {
	        var e = ENTITIES[i];
	        var alpha = e[0];
	        var chars = e[1];
	        var chr = chars[0];
	        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
	        var charInfo;
	        if (addChar) {
	            charInfo = charIndex[chr] = charIndex[chr] || {};
	        }
	        if (chars[1]) {
	            var chr2 = chars[1];
	            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
	            _results.push(addChar && (charInfo[chr2] = alpha));
	        } else {
	            alphaIndex[alpha] = String.fromCharCode(chr);
	            _results.push(addChar && (charInfo[''] = alpha));
	        }
	    }
	}
	
	module.exports = Html5Entities;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict'
	
	module.exports = ansiHTML
	
	// Reference to https://github.com/sindresorhus/ansi-regex
	var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/
	
	var _defColors = {
	  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
	  black: '000',
	  red: 'ff0000',
	  green: '209805',
	  yellow: 'e8bf03',
	  blue: '0000ff',
	  magenta: 'ff00ff',
	  cyan: '00ffee',
	  lightgrey: 'f0f0f0',
	  darkgrey: '888'
	}
	var _styles = {
	  30: 'black',
	  31: 'red',
	  32: 'green',
	  33: 'yellow',
	  34: 'blue',
	  35: 'magenta',
	  36: 'cyan',
	  37: 'lightgrey'
	}
	var _openTags = {
	  '1': 'font-weight:bold', // bold
	  '2': 'opacity:0.5', // dim
	  '3': '<i>', // italic
	  '4': '<u>', // underscore
	  '8': 'display:none', // hidden
	  '9': '<del>' // delete
	}
	var _closeTags = {
	  '23': '</i>', // reset italic
	  '24': '</u>', // reset underscore
	  '29': '</del>' // reset delete
	}
	
	;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
	  _closeTags[n] = '</span>'
	})
	
	/**
	 * Converts text with ANSI color codes to HTML markup.
	 * @param {String} text
	 * @returns {*}
	 */
	function ansiHTML (text) {
	  // Returns the text if the string has no ANSI escape code.
	  if (!_regANSI.test(text)) {
	    return text
	  }
	
	  // Cache opened sequence.
	  var ansiCodes = []
	  // Replace with markup.
	  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
	    var ot = _openTags[seq]
	    if (ot) {
	      // If current sequence has been opened, close it.
	      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
	        ansiCodes.pop()
	        return '</span>'
	      }
	      // Open tag.
	      ansiCodes.push(seq)
	      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
	    }
	
	    var ct = _closeTags[seq]
	    if (ct) {
	      // Pop sequence
	      ansiCodes.pop()
	      return ct
	    }
	    return ''
	  })
	
	  // Make sure tags are closed.
	  var l = ansiCodes.length
	  ;(l > 0) && (ret += Array(l + 1).join('</span>'))
	
	  return ret
	}
	
	/**
	 * Customize colors.
	 * @param {Object} colors reference to _defColors
	 */
	ansiHTML.setColors = function (colors) {
	  if (typeof colors !== 'object') {
	    throw new Error('`colors` parameter must be an Object.')
	  }
	
	  var _finalColors = {}
	  for (var key in _defColors) {
	    var hex = colors.hasOwnProperty(key) ? colors[key] : null
	    if (!hex) {
	      _finalColors[key] = _defColors[key]
	      continue
	    }
	    if ('reset' === key) {
	      if (typeof hex === 'string') {
	        hex = [hex]
	      }
	      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
	        return typeof h !== 'string'
	      })) {
	        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
	      }
	      var defHexColor = _defColors[key]
	      if (!hex[0]) {
	        hex[0] = defHexColor[0]
	      }
	      if (hex.length === 1 || !hex[1]) {
	        hex = [hex[0]]
	        hex.push(defHexColor[1])
	      }
	
	      hex = hex.slice(0, 2)
	    } else if (typeof hex !== 'string') {
	      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
	    }
	    _finalColors[key] = hex
	  }
	  _setTags(_finalColors)
	}
	
	/**
	 * Reset colors.
	 */
	ansiHTML.reset = function () {
	  _setTags(_defColors)
	}
	
	/**
	 * Expose tags, including open and close.
	 * @type {Object}
	 */
	ansiHTML.tags = {}
	
	if (Object.defineProperty) {
	  Object.defineProperty(ansiHTML.tags, 'open', {
	    get: function () { return _openTags }
	  })
	  Object.defineProperty(ansiHTML.tags, 'close', {
	    get: function () { return _closeTags }
	  })
	} else {
	  ansiHTML.tags.open = _openTags
	  ansiHTML.tags.close = _closeTags
	}
	
	function _setTags (colors) {
	  // reset all
	  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
	  // inverse
	  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
	  // dark grey
	  _openTags['90'] = 'color:#' + colors.darkgrey
	
	  for (var code in _styles) {
	    var color = _styles[code]
	    var oriColor = colors[color] || '000'
	    _openTags[code] = 'color:#' + oriColor
	    code = parseInt(code)
	    _openTags[(code + 10).toString()] = 'background:#' + oriColor
	  }
	}
	
	ansiHTML.reset()


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(1);
	
	var Select = function (_React$Component) {
	    _inherits(Select, _React$Component);
	
	    function Select() {
	        _classCallCheck(this, Select);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this));
	
	        _this.state = {
	            value: 'bbbbb'
	        };
	        _this.onChange = _this.onChange.bind(_this);
	        return _this;
	    }
	
	    Select.prototype.onChange = function onChange(e) {
	        console.log(e.target.value);
	        this.setState({
	            value: e.target.value
	        });
	    };
	
	    Select.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'select',
	                { value: this.state.value, onChange: this.onChange },
	                React.createElement(
	                    'option',
	                    { value: 'aaa' },
	                    'aaa'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'bbb' },
	                    'bbb'
	                ),
	                React.createElement(
	                    'option',
	                    { value: 'ccc' },
	                    'ccc'
	                )
	            ),
	            React.createElement(
	                'p',
	                null,
	                this.state.value
	            )
	        );
	    };
	
	    return Select;
	}(React.Component);
	
	var Input = function (_React$Component2) {
	    _inherits(Input, _React$Component2);
	
	    function Input() {
	        _classCallCheck(this, Input);
	
	        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));
	
	        _this2.state = {
	            value: 'bbbb'
	        };
	        _this2.onInput = _this2.onInput.bind(_this2);
	        return _this2;
	    }
	
	    Input.prototype.onInput = function onInput(e) {
	        this.setState({
	            value: e.target.value
	        });
	    };
	
	    Input.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement('input', { value: this.state.value, onInput: this.onInput }),
	            this.state.value
	        );
	    };
	
	    return Input;
	}(React.Component);
	
	var Radio = function (_React$Component3) {
	    _inherits(Radio, _React$Component3);
	
	    function Radio(props) {
	        _classCallCheck(this, Radio);
	
	        var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));
	
	        _this3.state = {
	            value: _this3.props.value
	        };
	        _this3.onChange = _this3.onChange.bind(_this3);
	        return _this3;
	    }
	
	    Radio.prototype.onChange = function onChange(e) {
	        console.log(e.target.value);
	        this.setState({
	            value: e.target.value
	        });
	    };
	
	    Radio.prototype.render = function render() {
	        return React.createElement(
	            'span',
	            null,
	            React.createElement('input', { type: 'radio', name: this.props.name, value: this.props.value, onChange: this.onChange }),
	            this.state.value + ''
	        );
	    };
	
	    return Radio;
	}(React.Component);
	
	var Playground = function (_React$Component4) {
	    _inherits(Playground, _React$Component4);
	
	    function Playground(props) {
	        _classCallCheck(this, Playground);
	
	        var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));
	
	        _this4.state = {
	            value: '请上下滚动鼠标滚轮'
	        };
	        _this4.onWheel = _this4.onWheel.bind(_this4);
	        return _this4;
	    }
	
	    Playground.prototype.onWheel = function onWheel(e) {
	        this.setState({
	            value: e.wheelDelta
	        });
	    };
	
	    Playground.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { style: { width: 300, height: 300, backgroundColor: 'red', display: 'inline-block' }, onWheel: this.onWheel },
	            this.state.value
	        );
	    };
	
	    return Playground;
	}(React.Component);
	
	var MouseMove = function (_React$Component5) {
	    _inherits(MouseMove, _React$Component5);
	
	    function MouseMove(props) {
	        _classCallCheck(this, MouseMove);
	
	        var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this, props));
	
	        _this5.state = {
	            value: '请在绿色区域移动'
	        };
	        _this5.onMouseMove = _this5.onMouseMove.bind(_this5);
	        return _this5;
	    }
	
	    MouseMove.prototype.onMouseMove = function onMouseMove(e) {
	        var v = e.pageX + ' ' + e.pageY;
	        this.setState({
	            value: v
	        });
	    };
	
	    MouseMove.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { style: { width: 300, height: 300, backgroundColor: '#a9ea00', display: 'inline-block' }, onMouseMove: this.onMouseMove },
	            this.state.value
	        );
	    };
	
	    return MouseMove;
	}(React.Component);
	
	var FocusEl = function (_React$Component6) {
	    _inherits(FocusEl, _React$Component6);
	
	    function FocusEl(props) {
	        _classCallCheck(this, FocusEl);
	
	        var _this6 = _possibleConstructorReturn(this, _React$Component6.call(this, props));
	
	        _this6.state = {
	            value: '点我'
	        };
	        _this6.onFocus = _this6.onFocus.bind(_this6);
	        return _this6;
	    }
	
	    FocusEl.prototype.onFocus = function onFocus(e) {
	        console.log(e.target.title);
	    };
	
	    FocusEl.prototype.render = function render() {
	        return React.createElement('input', { title: this.props.title, onKeyUp: function onKeyUp(e) {
	                console.log(e.which);
	            }, style: { width: 100, height: 50, backgroundColor: 'green', display: 'inline-block' }, onFocus: this.onFocus });
	    };
	
	    return FocusEl;
	}(React.Component);
	
	window.onload = function () {
	    window.s = ReactDOM.render(React.createElement(
	        'div',
	        null,
	        React.createElement(Select, null),
	        React.createElement(Input, null),
	        React.createElement(Radio, { name: 'sex', value: '\u7537' }),
	        React.createElement(Radio, { name: 'sex', value: '\u5973' }),
	        React.createElement(
	            'p',
	            null,
	            React.createElement(Playground, null),
	            React.createElement(MouseMove, null),
	            React.createElement(FocusEl, { title: 'aaa' }),
	            React.createElement(FocusEl, { title: 'bbb' })
	        )
	    ), document.getElementById('example'));
	};

/***/ }),
/* 6 */
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
	
	
	var PolyfillEventSource = __webpack_require__(7).EventSource;
	module.exports = PolyfillEventSource;
	
	// Add EventSource to window if it is missing...
	if (window && !window.EventSource){
	    window.EventSource = PolyfillEventSource;
	    if (console){
		console.log("polyfill-eventsource added missing EventSource to window");
	    }
	}


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = {
	  XmlEntities: __webpack_require__(10),
	  Html4Entities: __webpack_require__(9),
	  Html5Entities: __webpack_require__(2),
	  AllHtmlEntities: __webpack_require__(2)
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
	var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
	
	var alphaIndex = {};
	var numIndex = {};
	
	var i = 0;
	var length = HTML_ALPHA.length;
	while (i < length) {
	    var a = HTML_ALPHA[i];
	    var c = HTML_CODES[i];
	    alphaIndex[a] = String.fromCharCode(c);
	    numIndex[c] = a;
	    i++;
	}
	
	/**
	 * @constructor
	 */
	function Html4Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.decode = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1).toLowerCase() === 'x' ?
	                parseInt(entity.substr(2), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.decode = function(str) {
	    return new Html4Entities().decode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encode = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    var strLength = str.length;
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var alpha = numIndex[str.charCodeAt(i)];
	        result += alpha ? "&" + alpha + ";" : str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encode = function(str) {
	    return new Html4Entities().encode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonUTF = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    var strLength = str.length;
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var cc = str.charCodeAt(i);
	        var alpha = numIndex[cc];
	        if (alpha) {
	            result += "&" + alpha + ";";
	        } else if (cc < 32 || cc > 126) {
	            result += "&#" + cc + ";";
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonUTF = function(str) {
	    return new Html4Entities().encodeNonUTF(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonASCII = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    var strLength = str.length;
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonASCII = function(str) {
	    return new Html4Entities().encodeNonASCII(str);
	};
	
	module.exports = Html4Entities;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	var ALPHA_INDEX = {
	    '&lt': '<',
	    '&gt': '>',
	    '&quot': '"',
	    '&apos': '\'',
	    '&amp': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&apos;': '\'',
	    '&amp;': '&'
	};
	
	var CHAR_INDEX = {
	    60: 'lt',
	    62: 'gt',
	    34: 'quot',
	    39: 'apos',
	    38: 'amp'
	};
	
	var CHAR_S_INDEX = {
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&apos;',
	    '&': '&amp;'
	};
	
	/**
	 * @constructor
	 */
	function XmlEntities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encode = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    return str.replace(/<|>|"|'|&/g, function(s) {
	        return CHAR_S_INDEX[s];
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encode = function(str) {
	    return new XmlEntities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.decode = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
	        if (s.charAt(1) === '#') {
	            var code = s.charAt(2).toLowerCase() === 'x' ?
	                parseInt(s.substr(3), 16) :
	                parseInt(s.substr(2));
	
	            if (isNaN(code) || code < -32768 || code > 65535) {
	                return '';
	            }
	            return String.fromCharCode(code);
	        }
	        return ALPHA_INDEX[s] || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.decode = function(str) {
	    return new XmlEntities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonUTF = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    var strLength = str.length;
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var alpha = CHAR_INDEX[c];
	        if (alpha) {
	            result += "&" + alpha + ";";
	            i++;
	            continue;
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonUTF = function(str) {
	    return new XmlEntities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonASCII = function(str) {
	    if (!str || !str.length) {
	        return '';
	    }
	    var strLenght = str.length;
	    var result = '';
	    var i = 0;
	    while (i < strLenght) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonASCII = function(str) {
	    return new XmlEntities().encodeNonASCII(str);
	 };
	
	module.exports = XmlEntities;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(13);
	exports.encode = exports.stringify = __webpack_require__(14);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(4)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
	var styles = {
	  background: 'rgba(0,0,0,0.85)',
	  color: '#E8E8E8',
	  lineHeight: '1.2',
	  whiteSpace: 'pre',
	  fontFamily: 'Menlo, Consolas, monospace',
	  fontSize: '13px',
	  position: 'fixed',
	  zIndex: 9999,
	  padding: '10px',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  overflow: 'auto',
	  dir: 'ltr',
	  textAlign: 'left'
	};
	for (var key in styles) {
	  clientOverlay.style[key] = styles[key];
	}
	
	var ansiHTML = __webpack_require__(3);
	var colors = {
	  reset: ['transparent', 'transparent'],
	  black: '181818',
	  red: 'E36049',
	  green: 'B3CB74',
	  yellow: 'FFD080',
	  blue: '7CAFC2',
	  magenta: '7FACCA',
	  cyan: 'C3C2EF',
	  lightgrey: 'EBE7E3',
	  darkgrey: '6D7891'
	};
	ansiHTML.setColors(colors);
	
	var Entities = __webpack_require__(8).AllHtmlEntities;
	var entities = new Entities();
	
	exports.showProblems =
	function showProblems(type, lines) {
	  clientOverlay.innerHTML = '';
	  lines.forEach(function(msg) {
	    msg = ansiHTML(entities.encode(msg));
	    var div = document.createElement('div');
	    div.style.marginBottom = '26px';
	    div.innerHTML = problemType(type) + ' in ' + msg;
	    clientOverlay.appendChild(div);
	  });
	  if (document.body) {
	    document.body.appendChild(clientOverlay);
	  }
	};
	
	exports.clear =
	function clear() {
	  if (document.body && clientOverlay.parentNode) {
	    document.body.removeChild(clientOverlay);
	  }
	};
	
	var problemColors = {
	  errors: colors.red,
	  warnings: colors.yellow
	};
	
	function problemType (type) {
	  var color = problemColors[type] || colors.red;
	  return (
	    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
	      type.slice(0, -1).toUpperCase() +
	    '</span>'
	  );
	}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
	/*global __resourceQuery __webpack_public_path__*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true,
	  name: ''
	};
	if (true) {
	  var path = __webpack_require__(11);
	  var querystring = __webpack_require__(15);
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.name) {
	    options.name = overrides.name;
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
	  }
	  if (overrides.dynamicPublicPath) {
	    options.path = path.join(__webpack_require__.p, options.path);
	  }
	}
	
	if (typeof window === 'undefined') {
	  // do nothing
	} else if (typeof window.EventSource === 'undefined') {
	  console.warn(
	    "webpack-hot-middleware's client requires EventSource to work. " +
	    "You should include a polyfill if you want to support this browser: " +
	    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
	  );
	} else {
	  connect();
	}
	
	function EventSourceWrapper() {
	  var source;
	  var lastActivity = new Date();
	  var listeners = [];
	
	  init();
	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);
	
	  function init() {
	    source = new window.EventSource(options.path);
	    source.onopen = handleOnline;
	    source.onerror = handleDisconnect;
	    source.onmessage = handleMessage;
	  }
	
	  function handleOnline() {
	    if (options.log) console.log("[HMR] connected");
	    lastActivity = new Date();
	  }
	
	  function handleMessage(event) {
	    lastActivity = new Date();
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i](event);
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(init, options.timeout);
	  }
	
	  return {
	    addMessageListener: function(fn) {
	      listeners.push(fn);
	    }
	  };
	}
	
	function getEventSourceWrapper() {
	  if (!window.__whmEventSourceWrapper) {
	    window.__whmEventSourceWrapper = {};
	  }
	  if (!window.__whmEventSourceWrapper[options.path]) {
	    // cache the wrapper for other entries loaded on
	    // the same page with the same options.path
	    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
	  }
	  return window.__whmEventSourceWrapper[options.path];
	}
	
	function connect() {
	  getEventSourceWrapper().addMessageListener(handleMessage);
	
	  function handleMessage(event) {
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }
	}
	
	// the reporter needs to be a singleton on the page
	// in case the client is being used by multiple bundles
	// we only want to report once.
	// all the errors will go to all clients
	var singletonKey = '__webpack_hot_middleware_reporter__';
	var reporter;
	if (typeof window !== 'undefined') {
	  if (!window[singletonKey]) {
	    window[singletonKey] = createReporter();
	  }
	  reporter = window[singletonKey];
	}
	
	function createReporter() {
	  var strip = __webpack_require__(16);
	
	  var overlay;
	  if (typeof document !== 'undefined' && options.overlay) {
	    overlay = __webpack_require__(17);
	  }
	
	  var styles = {
	    errors: "color: #ff0000;",
	    warnings: "color: #999933;"
	  };
	  var previousProblems = null;
	  function log(type, obj) {
	    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');
	    if (previousProblems == newProblems) {
	      return;
	    } else {
	      previousProblems = newProblems;
	    }
	
	    var style = styles[type];
	    var name = obj.name ? "'" + obj.name + "' " : "";
	    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
	    // NOTE: console.warn or console.error will print the stack trace
	    // which isn't helpful here, so using console.log to escape it.
	    if (console.group && console.groupEnd) {
	      console.group("%c" + title, style);
	      console.log("%c" + newProblems, style);
	      console.groupEnd();
	    } else {
	      console.log(
	        "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
	        style + "font-weight: bold;",
	        style + "font-weight: normal;"
	      );
	    }
	  }
	
	  return {
	    cleanProblemsCache: function () {
	      previousProblems = null;
	    },
	    problems: function(type, obj) {
	      if (options.warn) {
	        log(type, obj);
	      }
	      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
	    },
	    success: function() {
	      if (overlay) overlay.clear();
	    },
	    useCustomOverlay: function(customOverlay) {
	      overlay = customOverlay;
	    }
	  };
	}
	
	var processUpdate = __webpack_require__(19);
	
	var customHandler;
	var subscribeAllHandler;
	function processMessage(obj) {
	  switch(obj.action) {
	    case "building":
	      if (options.log) {
	        console.log(
	          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
	          "rebuilding"
	        );
	      }
	      break;
	    case "built":
	      if (options.log) {
	        console.log(
	          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
	          "rebuilt in " + obj.time + "ms"
	        );
	      }
	      // fall through
	    case "sync":
	      if (obj.name && options.name && obj.name !== options.name) {
	        return;
	      }
	      if (obj.errors.length > 0) {
	        if (reporter) reporter.problems('errors', obj);
	      } else {
	        if (reporter) {
	          if (obj.warnings.length > 0) {
	            reporter.problems('warnings', obj);
	          } else {
	            reporter.cleanProblemsCache();
	          }
	          reporter.success();
	        }
	        processUpdate(obj.hash, obj.modules, options);
	      }
	      break;
	    default:
	      if (customHandler) {
	        customHandler(obj);
	      }
	  }
	
	  if (subscribeAllHandler) {
	    subscribeAllHandler(obj);
	  }
	}
	
	if (module) {
	  module.exports = {
	    subscribeAll: function subscribeAll(handler) {
	      subscribeAllHandler = handler;
	    },
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    },
	    useCustomOverlay: function useCustomOverlay(customOverlay) {
	      if (reporter) reporter.useCustomOverlay(customOverlay);
	    }
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?reload=true", __webpack_require__(20)(module)))

/***/ }),
/* 19 */
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
	
	var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len
	
	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };
	
	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}
	
	module.exports = function(hash, moduleMap, options) {
	  var reload = options.reload;
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    if (options.log) console.log("[HMR] Checking for updates on the server...");
	    check();
	  }
	
	  function check() {
	    var cb = function(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if(!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
	        performReload();
	        return null;
	      }
	
	      var applyCallback = function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);
	
	        if (!upToDate()) check();
	
	        logUpdates(updatedModules, renewedModules);
	      };
	
	      var applyResult = module.hot.apply(applyOptions, applyCallback);
	      // webpack 2 promise
	      if (applyResult && applyResult.then) {
	        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
	        applyResult.then(function(outdatedModules) {
	          applyCallback(null, outdatedModules);
	        });
	        applyResult["catch"](applyCallback);
	      }
	
	    };
	
	    var result = module.hot.check(false, cb);
	    // webpack 2 promise
	    if (result && result.then) {
	        result.then(function(updatedModules) {
	            cb(null, updatedModules);
	        });
	        result["catch"](cb);
	    }
	  }
	
	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });
	
	    if(unacceptedModules.length > 0) {
	      if (options.warn) {
	        console.warn(
	          "[HMR] The following modules couldn't be hot updated: " +
	          "(Full reload needed)\n" +
	          "This is usually because the modules which have changed " +
	          "(and their parents) do not know how to hot reload themselves. " +
	          "See " + hmrDocsUrl + " for more details."
	        );
	        unacceptedModules.forEach(function(moduleId) {
	          console.warn("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	      performReload();
	      return;
	    }
	
	    if (options.log) {
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
	  }
	
	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      if (options.warn) {
	        console.warn("[HMR] Cannot check for update (Full reload needed)");
	        console.warn("[HMR] " + err.stack || err.message);
	      }
	      performReload();
	      return;
	    }
	    if (options.warn) {
	      console.warn("[HMR] Update check failed: " + err.stack || err.message);
	    }
	  }
	
	  function performReload() {
	    if (reload) {
	      if (options.warn) console.warn("[HMR] Reloading page");
	      window.location.reload();
	    }
	  }
	};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ })
/******/ ]);