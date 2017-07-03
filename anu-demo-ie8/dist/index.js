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
/******/ 	var hotCurrentHash = "b964f1392a2e342eb46b"; // eslint-disable-line no-unused-vars
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

	__webpack_require__(4);
	__webpack_require__(11);
	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 兼容IE6-8的版本，有问题请加QQ 453286795 by 司徒正美 Copyright 2017-06-12T07:50:45.015Z
	 */
	
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.React = factory());
	}(this, function () {
	
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
	
		function toLowerCase(s) {
		    return lowerCache[s] || (lowerCache[s] = s.toLowerCase());
		}
	
		/**
		 *
		 *
		 * @param {any} type
		 * @returns
		 */
		function isFn(type) {
		    return typeof type === 'function';
		}
	
		var rword = /[^, ]+/g;
	
		function oneObject(array, val) {
		    if (typeof array === 'string') {
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
		        return extend(extend({}, context), instance.getChildContext());
		    }
		    return context;
		}
		var rcamelize = /[-_][^-_]/g;
		var __push = Array.prototype.push;
	
		var HTML_KEY = 'dangerouslySetInnerHTML';
		function camelize(target) {
		    //提前判断，提高getStyle等的效率
		    if (!target || target.indexOf('-') < 0 && target.indexOf('_') < 0) {
		        return target;
		    }
		    //转换为驼峰风格
		    return target.replace(rcamelize, function (match) {
		        return match.charAt(1).toUpperCase();
		    });
		}
	
		var options = {
	
		    updateBatchNumber: 1,
		    immune: {} // Object.freeze(midway) ;midway.aaa = 'throw err';midway.immune.aaa = 'safe'
		};
	
		function checkNull(vnode, type) {
		    if (vnode === null || vnode === false) {
		        return { type: '#comment', text: 'empty' };
		    } else if (!vnode || !vnode.vtype) {
		        throw new Error('@' + type.name + '#render:You may have returned undefined, an array or some other invalid object');
		    }
		    return vnode;
		}
		function getComponentProps(type, props) {
		    var defaultProps = type.defaultProps;
		    props = extend({}, props); //注意，上面传下来的props已经被冻结，无法修改，需要先复制一份
		    for (var i in defaultProps) {
		        //eslint-disable-next-line
		        if (props[i] === void 666) {
		            props[i] = defaultProps[i];
		        }
		    }
		    return props;
		}
		var recyclables = {
		    '#text': [],
		    '#comment': [],
		    'span': [],
		    'div': [],
		    'td': [],
		    'p': []
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
		      children = EMPTY_CHILDREN;
		  while (stack.length) {
		    //比较巧妙地判定是否为子数组
		    if ((child = stack.pop()) && child.pop !== undefined) {
		      for (var i = 0; i < child.length; i++) {
		        stack[stack.length] = child[i];
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
	
		var queue = [];
		var callbacks = [];
	
		var transaction = {
		    isInTransation: false,
		    queueCallback: function queueCallback(obj) {
		        //它们是保证在ComponentDidUpdate后执行
		        callbacks.push(obj);
		    },
		    queueComponent: function queueComponent(instance) {
		        queue.push(instance);
		    },
		    dequeue: function dequeue(recursion) {
	
		        this.isInTransation = true;
		        var globalBatchNumber = options.updateBatchNumber;
		        var renderQueue = queue;
		        queue = [];
		        var processingCallbacks = callbacks;
		        callbacks = [];
		        var refreshComponent = options.immune.refreshComponent;
		        for (var i = 0, n = renderQueue.length; i < n; i++) {
		            var inst = renderQueue[i];
		            try {
		                if (inst._updateBatchNumber === globalBatchNumber) {
		                    refreshComponent(inst);
		                }
		            } catch (e) {
		                /* istanbul ignore next */
		                console.warn(e);
		            }
		        }
		        this.isInTransation = false;
		        processingCallbacks.forEach(function (request) {
		            request.cb.call(request.instance);
		        });
		        /* istanbul ignore next */
		        if (queue.length) {
		            this.dequeue(); //用于递归调用自身)
		        }
		    }
		};
	
		/**
		 *
		 *
		 * @param {any} props
		 * @param {any} context
		 */
	
		function Component(props, context) {
		    this.context = context;
		    this.props = props;
		    this.refs = {};
		    this._pendingStateQueue = [];
		    //  if (!this.state)
		    this.state = {};
		}
	
		Component.prototype = {
		    setState: function setState(state, cb) {
		        this._pendingStateQueue.push(state);
	
		        setStateProxy(this, cb);
		    },
		    forceUpdate: function forceUpdate(cb) {
		        this._pendingForceUpdate = true;
		        setStateProxy(this, cb);
		    },
	
		    _processPendingState: function _processPendingState(props, context) {
		        var n = this._pendingStateQueue.length;
		        if (n == 0) {
		            return this.state;
		        }
		        var queue = this._pendingStateQueue.concat();
		        this._pendingStateQueue.length = 0;
	
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
		    if (isFn(cb)) transaction.queueCallback({ //确保回调先进入
		        component: instance,
		        cb: cb
		    });
		    if (!instance._updateBatchNumber) {
		        instance._updateBatchNumber = options.updateBatchNumber + 1;
		    }
		    transaction.queueComponent(instance);
	
		    if (!transaction.isInTransation) {
		        options.updateBatchNumber++;
		        transaction.dequeue();
		    }
		}
	
		var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
		var hasOwnProperty = Object.prototype.hasOwnProperty;
	
		function shallowEqual(objA, objB) {
		    if (Object.is(objA, objB)) {
		        return true;
		    }
	
		    if ((typeof objA === 'undefined' ? 'undefined' : _typeof$1(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof$1(objB)) !== 'object' || objB === null) {
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
		String('replaceChild,appendChild,removeAttributeNS,setAttributeNS,removeAttribute,setAttribute' + ',getAttribute,insertBefore,removeChild,addEventListener,removeEventListener,attachEvent' + ',detachEvent').replace(/\w+/g, function (name) {
		    fn$1[name] = function () {
		        console.log('fire ' + name);
		    };
		});
	
		//用于后端的document
		var fakeDoc = new DOMElement();
		fakeDoc.createElement = fakeDoc.createElementNS = function (type) {
		    return new DOMElement(type);
		};
		fakeDoc.createTextNode = fakeDoc.createComment = Boolean;
		fakeDoc.documentElement = new DOMElement('html');
		fakeDoc.nodeName = '#document';
		var inBrowser = (typeof window === 'undefined' ? 'undefined' : _typeof$2(window)) === 'object' && window.alert;
	
		var win = inBrowser ? window : {
		    document: fakeDoc
		};
	
		var document = win.document || fakeDoc;
	
		var versions = {
		    objectobject: 7, //IE7-8
		    objectundefined: 6, //IE6
		    undefinedfunction: NaN, // other modern browsers
		    undefinedobject: NaN
		};
		/* istanbul ignore next  */
		var msie = document.documentMode || versions[_typeof$2(document.all) + (typeof XMLHttpRequest === 'undefined' ? 'undefined' : _typeof$2(XMLHttpRequest))];
	
		var modern = /NaN|undefined/.test(msie) || msie > 8;
	
		function createDOMElement(vnode) {
		    var type = vnode.type;
		    var node = recyclables[type] && recyclables[type].pop();
		    if (node) {
		        node.nodeValue = vnode.text;
		        return node;
		    }
		    if (type === '#text') {
		        return document.createTextNode(vnode.text);
		    }
		    if (type === '#comment') {
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
		var svgTags = oneObject('' +
		// structure
		'svg,g,defs,desc,metadata,symbol,use,' +
		// image & shape
		'image,path,rect,circle,line,ellipse,polyline,polygon,' +
		// text
		'text,tspan,tref,textpath,' +
		// other
		'marker,pattern,clippath,mask,filter,cursor,view,animate,' +
		// font
		'font,font-face,glyph,missing-glyph', svgNs);
	
		var rmathTags = /^m/;
		var mathNs = 'http://www.w3.org/1998/Math/MathML';
		var svgNs = 'http://www.w3.org/2000/svg';
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
		                val = ''; //清除样式
		            } else if (rnumber.test(val) && !cssNumber[name]) {
		                val = val + 'px'; //添加单位
		            }
		            dom.style[name] = val; //应用样式
		        }
		    }
		    // 如果旧样式存在，但新样式已经去掉
		    for (var name in oldStyle) {
		        if (!(name in newStyle)) {
		            dom.style[name] = ''; //清除样式
		        }
		    }
		}
	
		var cssNumber = oneObject('animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom');
	
		//var testStyle = document.documentElement.style
		var prefixes = ['', '-webkit-', '-o-', '-moz-', '-ms-'];
		var cssMap = oneObject('float', 'cssFloat');
	
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
	
		function dispatchEvent(e) {
		  var __type__ = e.__type__ || e.type;
		  e = new SyntheticEvent(e);
		  var target = e.target;
		  var paths = [];
		  do {
		    var events = target.__events;
		    if (events) {
		      paths.push({ dom: target, props: events });
		    }
		  } while ((target = target.parentNode) && target.nodeType === 1);
		  // target --> parentNode --> body --> html
		  var type = eventCamelCache[__type__] || __type__;
	
		  var capitalized = capitalize(type);
		  var bubble = "on" + capitalized;
		  var captured = "on" + capitalized + "Capture";
	
		  var hook = eventPropHooks[__type__];
		  if (hook) {
		    hook(e);
		  }
		  transaction.isInTransation = true;
		  triggerEventFlow(paths, captured, e);
	
		  if (!e._stopPropagation) {
		    triggerEventFlow(paths.reverse(), bubble, e);
		  }
		  transaction.isInTransation = false;
		  options.updateBatchNumber++;
		  transaction.dequeue();
		}
	
		function triggerEventFlow(paths, prop, e) {
		  for (var i = paths.length; i--;) {
		    var path = paths[i];
		    var fn = path.props[prop];
		    if (isFn(fn)) {
		      e.currentTarget = path._hostNode;
		      fn.call(path._hostNode, e);
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
	
		var inMobile = "ontouchstart" in document;
	
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
	
		if (inMobile) {
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
	
		var builtIdProperties = {}; //不规则的属性名映射
	
		//防止压缩时出错
	
		/*
		  contenteditable不是布尔属性
		  http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/
		  contenteditable=''
		  contenteditable='events'
		  contenteditable='caret'
		  contenteditable='plaintext-only'
		  contenteditable='true'
		  contenteditable='false'
		   */
		var bools = ["autofocus,autoplay,async,allowTransparency,checked,controls", "declare,disabled,defer,defaultChecked,defaultSelected,", "isMap,loop,multiple,noHref,noResize,noShade", "open,readOnly,selected"].join(",");
		var boolAttributes = {};
		bools.replace(/\w+/g, function (name) {
		  boolAttributes[name] = true;
		});
	
		var anomaly = ["accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan", "dateTime,defaultValue,contentEditable,frameBorder,maxLength,marginWidth", "marginHeight,rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"].join(",");
	
		anomaly.replace(/\w+/g, function (name) {
		  builtIdProperties[name] = name;
		});
		String("value,id,title,alt,htmlFor,name,type,longDesc,className").replace(/\w+/g, function (name) {
		  builtIdProperties[name] = name;
		});
	
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
		var booleanTag = {
		  script: 1,
		  iframe: 1,
		  a: 1,
		  map: 1,
	
		  vedio: 1,
		  bgsound: 1,
	
		  form: 1,
		  select: 1,
		  inout: 1,
		  textarea: 1,
		  option: 1,
		  keygen: 1
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
		      dom[method + "NS"]("http://www.w3.org/1999/xlink", svgprops[name], val || "");
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
		            console.warn('\u4F60\u4E3A' + vnode.type + '[type=' + domType + ']\u5143\u7D20\u6307\u5B9A\u4E86' + duplexProp + '\u5C5E\u6027\uFF0C\u4F46\u662F\u6CA1\u6709\u63D0\u4F9B\u53E6\u5916\u7684' + Object.keys(keys) + '\n           \u7B49\u7528\u4E8E\u63A7\u5236' + duplexProp + '\u53D8\u5316\u7684\u5C5E\u6027\uFF0C\u90A3\u4E48\u5B83\u662F\u4E00\u4E2A\u975E\u53D7\u63A7\u7EC4\u4EF6\uFF0C\u7528\u6237\u65E0\u6CD5\u901A\u8FC7\u8F93\u5165\u6539\u53D8\u5143\u7D20\u7684' + duplexProp + '\u503C');
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
		    'datetime-local': 1,
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
		    'select-one': 3,
		    'select-multiple': 3
		};
	
		function preventUserInput(e) {
		    var target = e.target;
		    var name = e.type === 'textarea' ? 'innerHTML' : 'value';
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
		    1: ['value', {
		        onChange: 1,
		        onInput: 1,
		        readOnly: 1,
		        disabled: 1
		    }, 'oninput', preventUserInput],
		    2: ['checked', {
		        onChange: 1,
		        onClick: 1,
		        readOnly: 1,
		        disabled: 1
		    }, 'onclick', preventUserClick],
		    3: ['value', {
		        onChange: 1,
		        disabled: 1
		    }, 'onchange', preventUserChange]
		};
	
		function postUpdateSelectedOptions(vnode) {
		    var props = vnode.props,
		        multiple = !!props.multiple,
		        value = isDefined(props.value) ? props.value : isDefined(props.defaultValue) ? props.defaultValue : multiple ? [] : '',
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
		        if (el.type === 'option') {
		            ret.push(el);
		        } else if (el.type === 'optgroup') {
		            collectOptions(el, el.props, ret);
		        }
		    }
		}
	
		function updateOptionsOne(options, n, propValue) {
		    var selectedValue = '' + propValue;
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
		            selectedValue['&' + propValue[i]] = true;
		        }
		    } catch (e) {
		        /* istanbul ignore next */
		        console.warn('<select multiple="true"> 的value应该对应一个字符串数组');
		    }
		    for (var _i = 0; _i < n; _i++) {
		        var option = options[_i];
		        var value = getOptionValue(option, option.props);
		        var selected = selectedValue.hasOwnProperty('&' + value);
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
		    if (node.hasAttribute && node.hasAttribute('value')) {
		        return node.getAttribute('value');
		    }
		    var attr = node.getAttributeNode('value');
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
		    var a = document.createComment('');
		    var map = new innerMap();
		    map.set(a, noop);
		    if (map.get(a) !== noop) {
		        throw '使用自定义Map';
		    }
		} catch (e) {
		    var getID = function getID(a) {
		        if (a.uniqueID) {
		            return 'Node' + a.uniqueID;
		        }
		        if (!a.uniqueID) {
		            a.uniqueID = "_" + idN++;
		            return 'Node' + a.uniqueID;
		        }
		    };
	
		    var idN = 1;
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
		        "delete": function _delete() {
		            var id = getID(a);
		            delete this.map[id];
		        }
		    };
		}
	
		var instanceMap = new innerMap();
		var _removeNodes = [];
	
		function render(vnode, container, callback) {
		    return updateView(vnode, container, callback, {});
		}
	
		function updateView(vnode, container, callback, parentContext) {
		    if (!vnode.vtype) {
		        throw new Error(vnode + '\u5FC5\u987B\u4E3A\u7EC4\u4EF6\u6216\u5143\u7D20\u8282\u70B9');
		    }
		    if (!container || container.nodeType !== 1) {
		        throw new Error(container + '\u5FC5\u987B\u4E3A\u5143\u7D20\u8282\u70B9');
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
		        rootNode.setAttribute('data-reactroot', '');
		    }
	
		    var instance = vnode._instance;
		    container._component = vnode;
		    // delete vnode._prevRendered
		    if (callback) {
		        callback();
		    }
		    return instance || rootNode;
		    //组件返回组件实例，而普通虚拟DOM 返回元素节点
		}
	
		function genVnodes(vnode, container, hostParent, parentContext) {
		    var nodes = getNodes(container);
		    var prevRendered = null;
		    //eslint-disable-next-line
		    for (var i = 0, el; el = nodes[i++];) {
		        if (el.getAttribute && el.getAttribute('data-reactroot') !== null) {
		            //   hostNode = el
		            prevRendered = el;
		        } else {
		            el.parentNode.removeChild(el);
		        }
		    }
		    vnode._hostParent = hostParent;
	
		    var rootNode = mountVnode(vnode, parentContext, prevRendered);
		    container.appendChild(rootNode);
	
		    if (readyCallbacks.length) {
		        fireMount();
		    }
		    return rootNode;
		}
	
		function mountVnode(vnode, parentContext, prevRendered) {
		    var vtype = vnode.vtype;
	
		    var node = null;
		    if (!vtype) {
		        // init text comment
		        node = prevRendered && prevRendered.nodeName === vnode.type ? prevRendered : createDOMElement(vnode);
		        vnode._hostNode = node;
		        return node;
		    }
	
		    if (vtype === 1) {
		        // 处理元素节点
		        node = mountElement(vnode, parentContext, prevRendered);
		    } else if (vtype === 2) {
		        // 处理有状态组件
		        node = mountComponent(vnode, parentContext, prevRendered);
		    } else if (vtype === 4) {
		        // 处理无状态组件
		        node = mountStateless(vnode, parentContext, prevRendered);
		    }
	
		    return node;
		}
		var formElements = {
		    select: 1,
		    textarea: 1,
		    input: 1
		};
	
		function mountElement(vnode, parentContext, prevRendered) {
		    var type = vnode.type,
		        props = vnode.props,
		        dom = void 0;
	
		    if (prevRendered && toLowerCase(prevRendered.nodeName) === type) {
		        dom = prevRendered;
		    } else {
		        var ns = getNs(type);
		        vnode.ns = ns;
		        dom = createDOMElement(vnode);
		    }
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
		        readyCallbacks.push(function () {
		            vnode.ref(dom);
		        });
		    }
		    if (formElements[type]) {
		        processFormElement(vnode, dom, props);
		    }
	
		    return dom;
		}
		var readyCallbacks = [];
	
		//将虚拟DOM转换为真实DOM并插入父元素
		function mountChildren(vnode, parentNode, parentContext) {
		    var children = vnode.props.children;
	
		    for (var i = 0, n = children.length; i < n; i++) {
		        var el = children[i];
		        el._hostParent = vnode;
		        parentNode.appendChild(mountVnode(el, parentContext));
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
	
		function fireMount() {
		    var queue = readyCallbacks;
		    readyCallbacks = [];
		    //eslint-disable-next-line
		    for (var i = 0, cb; cb = queue[i++];) {
		        //eslint-disable-next-line
		        cb();
		    }
		}
	
		function mountComponent(vnode, parentContext, prevRendered) {
		    var type = vnode.type,
		        props = vnode.props;
	
	
		    props = getComponentProps(type, props);
	
		    var instance = new type(props, parentContext); //互相持有引用
	
		    vnode._instance = instance;
		    instance._currentElement = vnode;
		    instance.props = instance.props || props;
		    instance.context = instance.context || parentContext;
	
		    if (instance.componentWillMount) {
		        instance.componentWillMount();
		    }
		    // 如果一个虚拟DOM vnode的type为函数，那么对type实例化所得的对象instance来说 instance._currentElement =
		    // vnode instance有一个render方法，它会生成下一级虚拟DOM ，如果是返回false或null，则变成 空虚拟DOM {type:
		    // '#comment', text: 'empty'} 这个下一级虚拟DOM，对于instance来说，为其_rendered属性
	
		    var rendered = safeRenderComponent(instance);
		    instance._rendered = rendered;
		    rendered._hostParent = vnode._hostParent;
	
		    if (vnode.ref) {
		        readyCallbacks.push(function () {
		            vnode.ref(instance);
		        });
		    }
		    var dom = mountVnode(rendered, getChildContext(instance, parentContext), prevRendered);
		    instanceMap.set(instance, dom);
		    if (instance.componentDidMount) {
		        readyCallbacks.push(function () {
		            instance.componentDidMount();
		        });
		    }
		    vnode._hostNode = dom;
	
		    return dom;
		}
		function safeRenderComponent(instance) {
	
		    CurrentOwner.cur = instance;
		    var rendered = instance.render();
		    rendered = checkNull(rendered);
	
		    CurrentOwner.cur = null;
		    return rendered;
		}
	
		function mountStateless(vnode, parentContext, prevRendered) {
		    var type = vnode.type,
		        props = vnode.props;
	
		    props = getComponentProps(type, props);
	
		    var rendered = type(props, parentContext);
		    rendered = checkNull(rendered);
	
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
	
		    var newVnode = nextVnode.type(nextVnode.props, parentContext);
		    newVnode = checkNull(newVnode);
	
		    var dom = alignVnodes(vnode, newVnode, node, parentContext);
		    nextVnode._instance = instance;
		    instance._rendered = newVnode;
		    nextVnode._hostNode = dom;
		    return dom;
		}
	
		function disposeStateless(vnode, node) {
		    disposeVnode(vnode._instance._rendered, node);
		}
	
		//将Component中这个东西移动这里
		options.immune.refreshComponent = function refreshComponent(instance) {
		    //这里触发视图更新
	
		    reRenderComponent(instance);
		    instance._forceUpdate = false;
		    if (readyCallbacks.length) {
		        fireMount();
		    }
		};
	
		function reRenderComponent(instance) {
		    // instance._currentElement
	
		    var props = instance.props,
		        state = instance.state,
		        context = instance.context,
		        lastProps = instance.lastProps;
	
		    var lastRendered = instance._rendered;
		    var node = instanceMap.get(instance);
	
		    var hostParent = lastRendered._hostParent;
		    var nextProps = props;
		    lastProps = lastProps || props;
		    var nextState = instance._processPendingState(props, context);
	
		    instance.props = lastProps;
		    // delete instance.lastProps 生命周期 shouldComponentUpdate(nextProps, nextState,
		    // nextContext)
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
	
		    var rendered = safeRenderComponent(instance);
		    var childContext = getChildContext(instance, context);
		    instance._rendered = rendered;
		    rendered._hostParent = hostParent;
	
		    var dom = alignVnodes(lastRendered, rendered, node, childContext);
		    instanceMap.set(instance, dom);
		    instance._currentElement._hostNode = dom;
		    if (instance.componentDidUpdate) {
		        instance.componentDidUpdate(lastProps, state, context);
		    }
	
		    return dom;
		}
	
		function alignVnodes(vnode, newVnode, node, parentContext) {
		    var newNode = node;
		    //eslint-disable-next-line
		    if (newVnode == null) {
		        disposeVnode(vnode, node);
		        node.parentNode.removeChild(node);
		    } else if (vnode.type !== newVnode.type || vnode.key !== newVnode.key) {
		        //replace
		        newNode = mountVnode(newVnode, parentContext);
		        var p = node.parentNode;
		        if (p) {
		            p.replaceChild(newNode, node);
		        }
		        removeVnode(vnode, node, newNode);
		    } else if (vnode !== newVnode) {
		        // same type and same key -> update
		        newNode = updateVnode(vnode, newVnode, node, parentContext);
		    }
	
		    return newNode;
		}
	
		function removeVnode(vnode, node, newNode) {
		    _removeNodes = [];
		    disposeVnode(vnode, node);
		    for (var i = 0, n = _removeNodes.length; i < n; i++) {
		        var _node = _removeNodes[i],
		            _nodeParent = _node.parentNode;
		        if (!(_node && _nodeParent)) {
		            continue;
		        }
		        if (newNode && i === n - 1) {
		            _nodeParent.replaceChild(newNode, _node);
		        } else {
		            _nodeParent.removeChild(_node);
		        }
		    }
		}
	
		function disposeVnode(vnode, node) {
		    if (node) {
		        _removeNodes.unshift(node);
		    }
		    if (!vnode) {
		        return;
		    }
		    var vtype = vnode.vtype;
	
		    if (!vtype) {
		        vnode._hostNode = null;
		        vnode._hostParent = null;
		    } else if (vtype === 1) {
		        // destroy element
		        disposeElement(vnode, node);
		    } else if (vtype === 2) {
		        // destroy state component
		        disposeComponent(vnode, node);
		    } else if (vtype === 4) {
		        // destroy stateless component
		        disposeStateless(vnode, node);
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
	
		function disposeElement(vnode, node) {
		    var props = vnode.props;
	
		    var children = props.children;
		    var childNodes = node.childNodes;
		    for (var i = 0, len = children.length; i < len; i++) {
		        disposeVnode(children[i], childNodes[i]);
		    }
		    //eslint-disable-next-line
		    vnode.ref && vnode.ref(null);
		    vnode._hostNode = null;
		    vnode._hostParent = null;
		}
	
		function disposeComponent(vnode, node) {
		    var instance = vnode._instance;
		    if (instance) {
		        instanceMap['delete'](instance);
		        if (instance.componentWillUnmount) {
		            instance.componentWillUnmount();
		        }
		        vnode._instance = instance._currentElement = instance.props = null;
		        disposeVnode(instance._rendered, node);
		    }
		}
	
		function updateVnode(lastVnode, nextVnode, node, parentContext) {
		    var vtype = lastVnode.vtype,
		        props = lastVnode.props;
	
	
		    if (vtype === 2) {
		        //类型肯定相同的
		        return updateComponent(lastVnode, nextVnode, node, parentContext);
		    }
	
		    if (vtype === 4) {
		        return updateStateless(lastVnode, nextVnode, node, parentContext);
		    }
	
		    // ignore VCOMMENT and other vtypes
		    if (vtype !== 1) {
		        return node;
		    }
	
		    var nextProps = nextVnode.props;
		    if (props[HTML_KEY]) {
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
		    if (nextVnode.type === 'select') {
		        postUpdateSelectedOptions(nextVnode);
		    }
		    if (nextVnode.ref) {
		        readyCallbacks.push(function () {
		            nextVnode.ref(nextVnode._hostNode);
		        });
		    }
		    return dom;
		}
	
		function updateComponent(lastVnode, nextVnode, node, parentContext) {
		    var instance = nextVnode._instance = lastVnode._instance;
		    var nextProps = nextVnode.props;
		    instance.lastProps = instance.props;
		    if (instance.componentWillReceiveProps) {
		        instance.componentWillReceiveProps(nextProps, parentContext);
		    }
	
		    instance.props = nextProps;
		    instance.context = parentContext;
		    if (nextVnode.ref) {
		        readyCallbacks.push(function () {
		            nextVnode.ref(instance);
		        });
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
		                patches.creates.push({ vnode: newVchildren[i], parentNode: node, parentContext: parentContext, index: i });
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
		            if (_newVnode2.type === _vnode2.type && _newVnode2.key === _vnode2.key) {
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
	
		            creates.push({ vnode: newVchildren[_i4], parentNode: node, parentContext: parentContext, index: _i4 });
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
		    removeVnode(data.vnode, data.node);
		    var node = data.node;
		    var nodeName = node.__n || (node.__n = toLowerCase(node.nodeName));
		    if (recyclables[nodeName] && recyclables[nodeName].length < 72) {
		        recyclables[nodeName].push(node);
		    } else {
		        recyclables[nodeName] = [node];
		    }
		}
	
		function applyCreate(data) {
		    var node = mountVnode(data.vnode, data.parentContext);
		    data.parentNode.insertBefore(node, data.parentNode.childNodes[data.index]);
		}
	
		//Ie6-8 oninput使用propertychange进行冒充，触发一个ondatasetchanged事件
		function fixIEInput(dom, name) {
		  addEvent(dom, "propertychange", function (e) {
		    if (e.propertyName === "value") {
		      addEvent.fire(dom, "input");
		    }
		  });
		}
	
		function fixIEChange(dom, name) {
		  //IE6-8, radio, checkbox的点击事件必须在失去焦点时才触发
		  var eventType = dom.type === "radio" || dom.type === "checkbox" ? "click" : "change";
		  addEvent(dom, eventType, function (e) {
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
		  });
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
	
		var check = function check() {
		    return check;
		};
		check.isRequired = check;
		var PropTypes = {
		    "array": check,
		    "bool": check,
		    "func": check,
		    "number": check,
		    "object": check,
		    "string": check,
		    "any": check,
		    "arrayOf": check,
		    "element": check,
		    "instanceOf": check,
		    "node": check,
		    "objectOf": check,
		    "oneOf": check,
		    "oneOfType": check,
		    "shape": check
		};
		var React = {
		    PropTypes: PropTypes,
		    Children: Children, //为了react-redux
		    render: render,
		    findDOMNode: findDOMNode,
		    options: options,
		    version: "1.0.2",
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

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
	};


/***/ }),
/* 3 */
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
/* 4 */
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
	
	
	var PolyfillEventSource = __webpack_require__(5).EventSource;
	module.exports = PolyfillEventSource;
	
	// Add EventSource to window if it is missing...
	if (window && !window.EventSource){
	    window.EventSource = PolyfillEventSource;
	    if (console){
		console.log("polyfill-eventsource added missing EventSource to window");
	    }
	}


/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(6);
	exports.encode = exports.stringify = __webpack_require__(7);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(2)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	clientOverlay.style.display = 'none';
	clientOverlay.style.background = '#fdd';
	clientOverlay.style.color = '#000';
	clientOverlay.style.whiteSpace = 'pre';
	clientOverlay.style.fontFamily = 'monospace';
	clientOverlay.style.position = 'fixed';
	clientOverlay.style.zIndex = 9999;
	clientOverlay.style.padding = '10px';
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
	    var div = document.createElement('div');
	    div.textContent = msg;
	    clientOverlay.appendChild(div);
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

	/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
	/*global __resourceQuery*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true
	};
	if (true) {
	  var querystring = __webpack_require__(8);
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
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
	  connect(window.EventSource);
	}
	
	function connect(EventSource) {
	  var source = new EventSource(options.path);
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
	    if (options.log) console.log("[HMR] connected");
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
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(function() { connect(EventSource); }, options.timeout);
	  }
	
	}
	
	var strip = __webpack_require__(9);
	
	var overlay;
	if (typeof document !== 'undefined' && options.overlay) {
	  overlay = __webpack_require__(10);
	}
	
	function problems(type, obj) {
	  if (options.warn) console.warn("[HMR] bundle has " + type + ":");
	  var list = [];
	  obj[type].forEach(function(msg) {
	    var clean = strip(msg);
	    if (options.warn) console.warn("[HMR] " + clean);
	    list.push(clean);
	  });
	  if (overlay && type !== 'warnings') overlay.showProblems(list);
	}
	
	function success() {
	  if (overlay) overlay.clear();
	}
	
	var processUpdate = __webpack_require__(12);
	
	var customHandler;
	function processMessage(obj) {
	  if (obj.action == "building") {
	    if (options.log) console.log("[HMR] bundle rebuilding");
	  } else if (obj.action == "built") {
	    if (options.log) console.log("[HMR] bundle " + (obj.name ? obj.name + " " : "") + "rebuilt in " + obj.time + "ms");
	    if (obj.errors.length > 0) {
	      problems('errors', obj);
	    } else {
	      if (obj.warnings.length > 0) problems('warnings', obj);
	      success();
	
	      processUpdate(obj.hash, obj.modules, options);
	    }
	  } else if (customHandler) {
	    customHandler(obj);
	  }
	}
	
	if (module) {
	  module.exports = {
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    }
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?reload=true", __webpack_require__(13)(module)))

/***/ }),
/* 12 */
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
	    module.hot.check(function(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if(!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
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
/* 13 */
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