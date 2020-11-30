/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "f37a11aec2649222d6c8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
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
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
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
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.jsx","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/styles/index.less":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/styles/index.less ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "a:hover {\n  color: #ff8018;\n}\na:active {\n  color: #ff8018;\n}\n.button:hover {\n  color: #ff8018;\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/index.less"],"names":[],"mappings":"AAEC;EACI,cAAA;AADL;AAMC;EACI,cAAA;AAJL;AASC;EACI,cAAA;EACA,eAAA;AAPL","sourcesContent":[" @import './variable.less';\n\n a:hover {\n     color: @primary-color;\n }\n\n\n\n a:active {\n     color: @primary-color;\n }\n\n\n\n .button:hover {\n     color: @primary-color;\n     cursor: pointer;\n }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/assets/imgs/pic1.png":
/*!**********************************!*\
  !*** ./src/assets/imgs/pic1.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAP6ElEQVR4Xu2dB6wuRRmGHySGIhEIRRRBVECBiBos1ItYsEQxKqIhtAAKAioIiNKUqtIslCCCBQuCUg0oLVIVQzOIEmmhiQUQEEWMNe9lf3Lv8ZSd2Znd2d33SwgapnzfM/OenX/qIthMwARmJLCI2ZiACcxMwAJx7zCBWQhYIO4eJmCBuA+YQBwBf0HiuDnXSAhYICNpaIcZR8ACiePmXCMhYIGMpKEdZhwBCySOm3ONhIAFMpKGdphxBCyQOG7ONRICFshIGtphxhGwQOK4OddICFggI2lohxlHwAKJ4+ZcIyFggYykoR1mHAELJI6bc42EgAUykoZ2mHEELJA4bs41EgIWyEga2mHGEbBA4rg510gIWCAjaWiHGUegC4GsC2xc/bMRsGqc6841EgL3AtcC1wBXA7e2GXdbAnkxsCuwDfCCNgN0XYMjcD9wOvBVQP87q+UWyMrA4cAOWaNw4WMlcDJwMPBQLgC5BLI4cBCwfy7HXa4JVASeBI4EjshBJIdA1gHOBl6Ww2GXaQIzELgR2BK4JyWh1ALZBLgYWCKlky7LBGoSeBR4I/DLmunnTJZSIJtX4pizUicwgYwEngA2BW5OUUcqgawP/BTQbw+bCXRN4BFgQ+D2po6kEMhKwG3AMk2dcX4TSEjgbkBrbn9rUmYKgVwJzGvihPOaQCYCXwd2alJ2U4HsARzfxAHnNYHMBDYDroito4lAVgD0GVsqovL7gPOr7QN3AA/kXOyJ8M9ZuifwfGA14N3AdoD+f4zdBawek1F5mghECzOhC4GPAQcCJ8Y67HyjJbAb8FlAf5hDbWvgjNBMTQSi2ao/AEsHVKq5af010NfDZgIxBJarlhLWC8x8C/DKwDzzk8d+QfTJ+1ZAhb8CNmg6oxBQn5MOl8BzgAurtY6QKCUQCSXIYgVyCfCWmjU9BazZxs7Lmv44Wf8JLAlcBYR8SY4C9gsNPUYgi1VfgkVrVnYMsG/NtE5mAnUJ6AiFJnjq9sOoYVaMQEK3lGj2Qb9XbCaQmsBXgI8GFLosoImi2hYjkL2A42rWcFPgZ7BmsU5mAvMJrBI46aMTrD8LYRcjkJOAj9SsJGrcV7NsJzMBEfgF8LqaKLavTiPWTB43i/Xt6uhsnUp2ByQomwnkInA0sE/NwrUGF3SwKuYL8l1ACy917APAWXUSOo0JRBL4EHBKzbxaoNb2qNoWI5CQL8h7gXNre+OEJhBOQH1MJ1jrmPqu1vBqmwVSG5UTFkrAAim0YexWGQQskDLawV4USsACKbRh7FYZBCyQMtrBXhRKwAIptGHsVhkELJAy2sFeFErAAim0YexWGQQskDLawV4USsACKbRh7FYZBIoTiI7a1l2ufw9wXhkcR++FdryqM+n+5BWB5avL/vR0wMPAg9V57zMDt5B3DVZ97JyaTuhdEe3orW0xW00skNp4i0i4N/CxwJe8bqieFOjDPjoLpIhu1j8n9GjRodWholjvrwP2rM5cxJaRO19xAvFu3txN3qx8PT3xnWo41aykp3P/u7rs4NgUhWUow79BMkAdapE6///j2Dug5oCic0B6Y7I08xektBYp1B99OfTbYe2M/n0D2DFj+TFFF/cF8RArphnz59Fdx1vkr2b+LSIntFBP3SoskLqkRpxOR5u/31L8/wReUl043lKVs1ZjgZTQCgX7oIvT7qxuQm/LzeD1hIyOWSAZ4Q6haF3B1PbNMf+pfuv8tgCAxQnEC4UF9IoFXNAbLbqGs20r5SviWay2W75H9b0i5sbyRPE9Dug5Aq2TdGnFfUE8i9Vld1i47gOAwzt0R2+S63XjLq04gXiI1WV3WLhubQTVo0Rd2SHVq09d1a96PcTqkn7hdevVrqiXkxLF1fgV2QR+FPcF8RArQasmKuLRjt+n/wnw9kSxxBZTnEA0e7FtzWh8HqQmqMhk/43Mlyrb9QE3q6eqc2o5xQnEX5BcTR1e7hORz3CH1zR9Dm2MfEeqwiLLsUAiwY0h2+3AGh0Gehqwc4f1q2oLpOMGKLn6K4F5HTp4GHBwh/VbIB3DL716veDV5QOp76yeZO6Sk78gXdIvvG5dxKAnyLow/f7RSrp293ZpxQnEC4Vddof/r7urvVjqBzr33rV5obDrFii8/pAnyFKFot28awGaJOjaivuCeJq36y6xcP06D3JHyzt6g58yy4jMAskIdyhFbwn8oKVg9JtD2+t/11J9c1VjgcxFyP99PgE9ZKnOktt8Jn0Owh5i5e6CceUvCeiiN50RyWW6b6vuNqNcPkwtt7gviGex2mr68Hpy3ov1Q+D94S5lz+FZrOyIh1WBviTfS3hORBsitVre5cGs2VqouC+Ih1j9EJT+2h8JrN7A3WuBPQCdOynVihOIh1ildpXp/dod+GTE7e6fAS7qQajFDbEskB70mmlcfC3wPmBj4HnTvA+iaduLAf3WuKdHIRYnEA+xetR7RuBqcUMsC2QEva5HIVogPWosu9o+AQukfeausUcELJAeNZZdbZ9AcQIZ4izWutUWjVWqTXg3A7e239auMYJAcbNYQxLI/tULsJr2nGp3Afv4GeuILttuFgskA28d9rmw5hmKLwKfyOCDi0xDwAJJw/GZUl4P6EbAZQLK/RTwhYD0TtoegeIE0ud1EB30uRFYNrD9tGHvbcAlgfmcPD+B4n6k91UgS1XiWDOyzR4DXgXcG5nf2fIQsEAScH1WtfHurQ3LuqW6i/YfDctx9nQELJAELI+uZqQSFEWJp+pSxNXXMiyQhi23DaBhYUrTw5knpyzQZUUTsECi0YG2eOvQz7MblDFdVt3ssUH1myZx0S4ukEBxAunLQqFWxW+qzj0EMq+V/AHg1cDDtVIPJ9ESwPqAJjuWBu4Hbqju5uoiyuKmefsgEDXiz1t4nuxy4M1d9IoO6lynOsK7xQx160ut9aJrWvbNAokAfk71uGNE1uAsnwO0ZWXIdhBwaM0AtwbOqJk2RTILJJCiXl5t+80KvTR7QaCffUl+fHVxQ4i/OtqrP1JtmAUSQHkr4MyA9KmS/gVYD7gzVYGFlKOZul0ifPk7sElLkxjFCaTUlXStcutmwcUiGjRFltuA1wBPpiis4zIWAU4Fdmzghy6B0BPVjzQoo07W4maxShSIbhTUHiv9u0sr9fbBUCZ6e7CJOCb1XQG8CdBzCbnMApmDrL4Y+nLoC1KClXa5cyiTkwAthKYy7YLW7FYus0DmIHtWYXfG/qt6WFPTzH2z1OKYxK+p4R9lgmGBzAJW06tHZALfpNg/Alo3yD3+buLj1Ly5xKF6/lotquaYxLBAZugF+qt0HqAflCVaG+PvVHHnFMfEx1yTGBbINL1g7Wp7g1bMS7ZjOn6muQ6bNsQx8SPHJIYFMqWVV6hmrLTXqg+Wc/zdNP42xTHxNfUkhgWyQC/Qrlzt+dEu3b5YzvF3EwZdiEP+ahJDmx01LZ/CLJAFKIaswaSAn6qMXOPvWP+6EsfE35SLiBZIRVVX7xwb2yMKyJdj/B0TVtfimPicahLDAgE2Ay4DdLa8z7YX8KUOAyhFHBMEOgqtx32a2OgFooM51wPPbUKxkLxdLiKWJo5JkzSdxBi1QCQKvY+n+6yGYlpE1CY+/bstK1Ucir/pJMZoBbIocGk1vGqrI7VVj7ahzKtmdHLXWbI4JrE3mcQYrUBOBHbL3Xs6LF+/RfSbJKfpXuE9c1aQsOzYSYxRCmRn4GsJ4ZdalJ5qVsfIYX0SxyR+ifnLgTBGJ5CNgCsBDbGGbjpcpUNWGmKktD6KQ/HHTGKMSiCxl0un7Fxtl6Udrro+SD9WU1hfxTGJPXQSYzQCaXq5dIrO1VUZOisx03U6IT71XRyTWEMmMUYhkFSXS4d0ptLS7gto92+sDUUck/i1a0IvfM1loxCIYIz9FSed29b5bW3BCLWhiWMSf51FxMELJMfl0qEdrJT0OoGok4ghi4hDFYfapM4i4qAFkuty6VI6fIwfIePvIYtjwm6uRcTBCkQHnnQmQAegbAsTOAHQwaLZbAzimMQ/2yLiIAWio7K6EVxHZ23TE5htEXFM4pjQ0W9UxT3VBicQXbKgyxZSTGsOWVwzLSKOURxq55kWEQcnkMOBA4bcsxPGNnURUTfJ57yELaHrWYqabhFxUALRsEEXvdnqE5gsIo5dHBNimsTYcAF8xQkk9gEd3X6ux1UWr983nLIioIsqtEfN9jSB44C9KxiDuN29lMul3cGGQ2AyiVHcFyTkZhE5f1Fhl0sPp4uMO5LJJMZawNk1Uajvblcz7fxkMdd2ng5sW7MSff70JJfUbjOB1AQ0iaGn4dQn65jSbV8n4SRNjEC+GVCJx84hreG0MQR0x9bKNTPq9/MONdNGf0FChlghvjitCeQm0MoQywLJ3YwuPxcBCyQXWZc7CAIWyCCa0UHkImCB5CLrcgdBwAIZRDM6iFwELJBcZF3uIAhYIINoRgeRi4AFkousyx0EAQtkEM3oIHIRsEBykXW5gyBggQyiGR1ELgKtCORUYKdcEbhcE8hIQC8GfDik/JjdvHrX4uMhlTitCRRCoO51ps+4GyOQA4HDCgnYbphACIH9gKNCMsQI5IPAGSGVOK0JFEJAJ1zPDfElRiB6gFIPa9pMoG8E9GLyHSFOxwhEef4MLBNSkdOaQMcEHgJWDPUhRiCqQ0MsDbVsJtAXAsEzWAosViDvAi7oCxn7aQLApsBVoSRiBaJ6fg+sFFqh05tABwR0+8kaMfU2EcingSNjKnUeE2iZwC7AKTF1NhGIfqTfAywdU7HzmEBLBO4DXhRbVxOBqE5tOdHWE5sJlEpgc+DSWOeaCkT1XlY9Phnrg/OZQC4CwTcpTnUkhUB0MfWvgWVzRelyTSCCgIb/ehBVd/hGWwqBqHK913C5nzaIbgdnTEtAC9nrh66aT+dCKoGobI31Lk4bp0szgWACjwNvSLUdKqVAFIkc03MHeqTTZgJtE9A78/OA36SqOLVA5JfGfecDL03lpMsxgRoErgO2Au6vkbZ2khwCUeVLAQcD+9b2xAlNII7AE8AhgA5DJbdcApk4ulrlfNCrPsmjdIFDJPAUcDzw+Wp3eZYYcwtk4vTLgV2BbYDlskTiQsdCQNO3pwHanatnobNaWwJZMAi9dqsXWyWaVYEXVi8ELZ81UhfeNwJ/Au4GHgS0XeRW4Grg9jYD6UIgbcbnukygEQELpBE+Zx46AQtk6C3s+BoRsEAa4XPmoROwQIbewo6vEQELpBE+Zx46AQtk6C3s+BoRsEAa4XPmoROwQIbewo6vEQELpBE+Zx46AQtk6C3s+BoRsEAa4XPmoROwQIbewo6vEQELpBE+Zx46AQtk6C3s+BoRsEAa4XPmoROwQIbewo6vEQELpBE+Zx46AQtk6C3s+BoRsEAa4XPmoROwQIbewo6vEQELpBE+Zx46AQtk6C3s+BoR+B+JTVb2/6qG8wAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/imgs/pic2.png":
/*!**********************************!*\
  !*** ./src/assets/imgs/pic2.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "bb9f4d0b1dacd654145ac9c8abf8bea9.png");

/***/ }),

/***/ "./src/assets/imgs/pic3.png":
/*!**********************************!*\
  !*** ./src/assets/imgs/pic3.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "500ac84918e5f3c2621fd80b326b5322.png");

/***/ }),

/***/ "./src/assets/imgs/pic4.png":
/*!**********************************!*\
  !*** ./src/assets/imgs/pic4.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "38de66c15d0ee03801b05e267a6f6a9e.png");

/***/ }),

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _pages_Battle_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/pages/Battle.jsx */ "./src/pages/Battle.jsx");
/* harmony import */ var _pages_Popular_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/pages/Popular.jsx */ "./src/pages/Popular.jsx");
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hot-loader/root */ "./node_modules/react-hot-loader/root.js");
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_9__);






(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};




 // import axios from 'axios'

 // setConfig({
//   showReactDomPatchNotification: false
// });

var App = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, App);

    _this = _super.call(this, props);
    _this.state = {
      route: 'Popular'
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(App, [{
    key: "handleMenu",
    value: function handleMenu(key) {
      // console.log('key', key);
      this.setState({
        route: key
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var menuItems = ['Popular', 'Battle'];
      var route = this.state.route;
      var page = null;

      switch (route) {
        case 'Battle':
          page = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_pages_Battle_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], null);
          break;

        case 'Popular':
          page = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_pages_Popular_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null);
          break;

        default:
          page = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_pages_Popular_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null);
          break;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Container"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Nav"], {
        className: "justify-content-center",
        style: {
          border: 'soild black'
        },
        variant: "tabs",
        defaultActiveKey: "All",
        onSelect: function onSelect(selectedKey) {
          return _this2.handleMenu(selectedKey);
        }
      }, menuItems.map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Nav"].Item, {
          key: key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Nav"].Link, {
          eventKey: item
        }, item));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, page))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

var _default = Object(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_9__["hot"])(App);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "E:\\VsCode\\train\\Train\\day5_03\\src\\components\\App.jsx");
  reactHotLoader.register(_default, "default", "E:\\VsCode\\train\\Train\\day5_03\\src\\components\\App.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/components/BattleAfter.jsx":
/*!****************************************!*\
  !*** ./src/components/BattleAfter.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BatteAfter; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");






(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






var BatteAfter = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(BatteAfter, _React$Component);

  var _super = _createSuper(BatteAfter);

  function BatteAfter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, BatteAfter);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BatteAfter, [{
    key: "render",
    value: function render() {
      var _this = this;

      var LiSyle = {
        width: '100%',
        textAlign: 'left',
        paddingLeft: '15%',
        boxSizing: 'border-box',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '15px' // height:'4%',
        // overflow: "hidden"

      };
      var one = "";
      var two = "";

      var win = function win() {
        if (_this.props.Item1.stargazers_count && _this.props.Item2.stargazers_count) {
          if (_this.props.Item1.stargazers_count > _this.props.Item2.stargazers_count) {
            one = "Winning";
            two = "Failed";
          } else {
            two = "Winning";
            one = "Failed";
          }
        }
      };

      win();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Container"], {
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], {
        style: {
          padding: '10px auto'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], {
        border: "primary",
        style: {
          margin: '8px auto',
          width: '18rem'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Header, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h4", {
        className: "text-center  font-weight-bold text-danger"
      }, one)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Body, {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Img, {
        className: "lazyload",
        src: this.props.Name1 ? "https://github.com/".concat(this.props.Name1, ".png?size=200") : "./img/1.png",
        alt: "",
        style: {
          width: '200px',
          height: '200px'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Title, {
        className: "text-center",
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Link, {
        className: "text-danger",
        target: "_blank",
        style: {
          fontSize: '28px'
        }
      }, this.props.Name1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroup"], {
        className: "list-group-flush"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "fa fa-user fa-lg fa-fw",
        style: {
          color: 'orange'
        }
      }), this.props.Item1.name ? this.props.Item1.name : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "fa fa-star fa-lg fa-fw",
        style: {
          color: 'yellow'
        }
      }), this.props.Item1.stargazers_count ? this.props.Item1.stargazers_count : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "fa fa-code-fork fa-lg fa-fw",
        style: {
          color: 'lightblue'
        }
      }), this.props.Item1.forks_count ? this.props.Item1.forks_count : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "fa fa-warning fa-lg fa-fw",
        style: {
          color: 'purple'
        }
      }), this.props.Item1.open_issues_count ? this.props.Item1.open_issues_count : "")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"], {
        border: "primary",
        style: {
          margin: '8px auto',
          width: '18rem'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Header, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h4", {
        className: "text-center  font-weight-bold text-danger"
      }, two)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Body, {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Img, {
        className: "lazyload",
        src: this.props.Name2 ? "https://github.com/".concat(this.props.Name2, ".png?size=200") : "./img/1.png",
        alt: "",
        style: {
          width: '200px',
          height: '200px'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Title, {
        className: "text-center",
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Link, {
        className: "text-danger",
        target: "_blank",
        style: {
          fontSize: '28px'
        }
      }, this.props.Name2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroup"], {
        className: "list-group-flush"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "fa fa-user fa-lg fa-fw",
        style: {
          color: 'orange'
        }
      }), this.props.Item2.name ? this.props.Item2.name : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "fa fa-star fa-lg fa-fw",
        style: {
          color: 'yellow'
        }
      }), this.props.Item2.stargazers_count ? this.props.Item2.stargazers_count : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "fa fa-code-fork fa-lg fa-fw",
        style: {
          color: 'lightblue'
        }
      }), this.props.Item2.forks_count ? this.props.Item2.forks_count : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["ListGroupItem"], {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Card"].Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "fa fa-warning fa-lg fa-fw",
        style: {
          color: 'purple'
        }
      }), this.props.Item2.open_issues_count ? this.props.Item2.open_issues_count : ""))))))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return BatteAfter;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BatteAfter, "BatteAfter", "E:\\VsCode\\train\\Train\\day5_03\\src\\components\\BattleAfter.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/components/BattleAgo.jsx":
/*!**************************************!*\
  !*** ./src/components/BattleAgo.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BatteAgo; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _assets_imgs_pic2_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/assets/imgs/pic2.png */ "./src/assets/imgs/pic2.png");
/* harmony import */ var _assets_imgs_pic3_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/assets/imgs/pic3.png */ "./src/assets/imgs/pic3.png");
/* harmony import */ var _assets_imgs_pic4_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/assets/imgs/pic4.png */ "./src/assets/imgs/pic4.png");










(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};










var BatteAgo = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(BatteAgo, _React$Component);

  var _super = _createSuper(BatteAgo);

  function BatteAgo(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, BatteAgo);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "userChange", function (ev) {
      ev.persist();

      _this.setState({
        userName1: ev.target.value
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "userChange2", function (ev) {
      ev.persist();

      _this.setState({
        userName2: ev.target.value
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "userSubmit", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.state.userName1 === '')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _this.setState({
                loadKey1: true,
                bKey1: 0
              });

              _context.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_12___default.a.get("https://api.github.com/search/repositories?q=".concat(_this.state.userName1, "&order=desc&sort=stars")).then(function (res) {
                // console.log("数据1", res);
                _this.setState({
                  userItem1: res.data.items[0],
                  oneKey: 1,
                  loadKey1: false,
                  bKey1: 1
                });
              })["catch"](function (err) {
                console.error(err);
              });

            case 5:
              _this.props.getChildData(_this.state);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "twoSubmit", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.state.userName2 === '')) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _this.setState({
                loadKey2: true,
                bKey2: 0
              });

              _context2.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_12___default.a.get("https://api.github.com/search/repositories?q=".concat(_this.state.userName2, "&order=desc&sort=stars")).then(function (res) {
                _this.setState({
                  userItem2: res.data.items[0],
                  twoKey: 1,
                  loadKey2: false,
                  bKey2: 1
                });
              })["catch"](function (err) {
                console.error(err);
              });

            case 5:
              _this.props.getChildData(_this.state);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "selKey1", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this.setState({
                oneKey: 0,
                userName1: ""
              });

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "selKey2", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.setState({
                twoKey: 0,
                userName2: ""
              });

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    _this.state = {
      userName1: "",
      userName2: "",
      userItem1: [],
      userItem2: [],
      oneKey: 0,
      twoKey: 0,
      loadKey1: false,
      loadKey2: false,
      bKey1: 1,
      bKey2: 1
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(BatteAgo, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Container"], {
        className: "text-center",
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Col"], {
        className: "text-center",
        style: {
          margin: '20px auto',
          flex: 1
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h2", null, "Instrutions"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h5", {
        className: "text-info",
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, "Enter Two Users"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        src: _assets_imgs_pic2_png__WEBPACK_IMPORTED_MODULE_14__["default"],
        alt: ""
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h5", {
        className: "text-info"
      }, "Battle"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        src: _assets_imgs_pic3_png__WEBPACK_IMPORTED_MODULE_15__["default"],
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h5", {
        className: "text-info",
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, "See The Winner"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        src: _assets_imgs_pic4_png__WEBPACK_IMPORTED_MODULE_16__["default"],
        alt: ""
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Row"], {
        style: {
          margin: '80px auto'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Col"], {
        style: {
          margin: '20px 20px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "player1"
      }, this.state.oneKey ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"], _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()({
        border: "primary",
        style: {
          width: '18rem'
        }
      }, "style", {
        margin: '10px auto'
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"].Img, {
        variant: "top",
        src: 0 ? undefined : "https://github.com/".concat(this.state.userName1, ".png?size=200"),
        alt: "",
        className: "lazyload",
        style: {
          width: '200px',
          height: '200px',
          margin: '0 auto'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"].Body, {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"].Title, {
        className: "text-danger"
      }, this.state.userName1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        className: "button",
        variant: "primary",
        onClick: this.selKey1
      }, "close")))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "input"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h4", {
        className: "text-info"
      }, "palyers one"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["InputGroup"], {
        className: "mb-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["FormControl"], {
        placeholder: "Github UserName",
        "aria-label": "Recipient's username",
        "aria-describedby": "basic-addon2",
        value: this.state.userName1,
        onChange: this.userChange,
        onKeyDown: function onKeyDown() {
          if (window.event.keyCode === 13) {
            _this2.userSubmit();
          }
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["InputGroup"].Append, null, this.state.userName1 !== "" && this.state.bKey1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        className: "button",
        variant: "primary",
        onClick: this.userSubmit
      }, "Submit") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        className: "button",
        disabled: "disabled",
        variant: "outline-secondary"
      }, " Input"))), this.state.loadKey1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h5", {
        style: {
          textAlign: 'center'
        },
        className: "loading"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__["faSpinner"],
        spin: true,
        style: {
          fontSize: '30px'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        className: "sr-only"
      }, "Loading...")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Col"], {
        style: {
          margin: '20px 20px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "player2"
      }, this.state.twoKey ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"], _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()({
        border: "primary",
        style: {
          width: '18rem'
        }
      }, "style", {
        margin: '10px auto'
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"].Img, {
        variant: "top",
        src: 0 ? undefined : "https://github.com/".concat(this.state.userName2, ".png?size=200"),
        alt: "",
        className: "lazyload",
        style: {
          width: '200px',
          height: '200px',
          margin: '0 auto'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"].Body, {
        className: "bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"].Title, {
        className: "text-danger"
      }, this.state.userName2), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        className: "button",
        variant: "primary",
        onClick: this.selKey2
      }, "close")))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "input"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h4", {
        className: "text-info"
      }, "palyers two"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["InputGroup"], {
        className: "mb-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["FormControl"], {
        placeholder: "Github UserName",
        "aria-label": "Recipient's username",
        "aria-describedby": "basic-addon2",
        value: this.state.userName2,
        onChange: this.userChange2,
        onKeyDown: function onKeyDown() {
          if (window.event.keyCode === 13) {
            _this2.twoSubmit();
          }
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["InputGroup"].Append, null, this.state.userName2 !== "" && this.state.bKey2 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        className: "button",
        variant: "primary",
        onClick: this.twoSubmit
      }, "Submit") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        className: "button",
        disabled: "disabled",
        variant: "outline-secondary"
      }, " Input"))), this.state.loadKey2 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h5", {
        style: {
          textAlign: 'center'
        },
        className: "loading"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_10__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_11__["faSpinner"],
        spin: true,
        style: {
          fontSize: '30px'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        className: "sr-only"
      }, "Loading...")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", null)))))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return BatteAgo;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BatteAgo, "BatteAgo", "E:\\VsCode\\train\\Train\\day5_03\\src\\components\\BattleAgo.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/App.jsx */ "./src/components/App.jsx");
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var font_awesome_css_font_awesome_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! font-awesome/css/font-awesome.min.css */ "./node_modules/font-awesome/css/font-awesome.min.css");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _styles_index_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/styles/index.less */ "./src/styles/index.less");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};






 // import '@/styles/index.css'


react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('app'));

/***/ }),

/***/ "./src/pages/Battle.jsx":
/*!******************************!*\
  !*** ./src/pages/Battle.jsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Battle; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_BattleAfter_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/components/BattleAfter.jsx */ "./src/components/BattleAfter.jsx");
/* harmony import */ var _components_BattleAgo_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/components/BattleAgo.jsx */ "./src/components/BattleAgo.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");










(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};








var Battle = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Battle, _React$Component);

  var _super = _createSuper(Battle);

  function Battle(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Battle);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "getNewData1", function () {
      axios__WEBPACK_IMPORTED_MODULE_10___default.a.get("https://api.github.com/search/repositories?q=".concat(_this.state.userName1, "&order=desc&sort=stars")).then(function (res) {
        _this.setState({
          userItem1: res.data.items[0]
        });
      })["catch"](function (err) {
        console.error(err);
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "getNewData2", function () {
      axios__WEBPACK_IMPORTED_MODULE_10___default.a.get("https://api.github.com/search/repositories?q=".concat(_this.state.userName2, "&order=desc&sort=stars")).then(function (res) {
        _this.setState({
          userItem2: res.data.items[0]
        });
      })["catch"](function (err) {
        console.error(err);
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "getData", function (data) {
      var userName1 = data.userName1,
          userName2 = data.userName2,
          userItem1 = data.userItem1,
          userItem2 = data.userItem2,
          oneKey = data.oneKey,
          twoKey = data.twoKey;

      _this.setState({
        userName1: userName1,
        userName2: userName2,
        userItem1: userItem1,
        userItem2: userItem2,
        oneKey: oneKey,
        twoKey: twoKey
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "openBattle", function () {
      if (_this.state.openKey) {
        _this.setState({
          openKey: 0,
          oneKey: 0,
          twoKey: 0
        });
      } else {
        _this.setState({
          openKey: 1
        });
      }
    });

    _this.state = {
      userName1: "",
      userName2: "",
      userItem1: [],
      userItem2: [],
      openKey: 0,
      oneKey: 0,
      twoKey: 0
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Battle, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var arr;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.props.match.params.user) {
                  _context.next = 6;
                  break;
                }

                arr = this.props.match.params.user.split("&");
                _context.next = 4;
                return this.setState({
                  userName1: arr[0],
                  userName2: arr[1],
                  openKey: 1,
                  oneKey: 1,
                  twoKey: 1
                });

              case 4:
                this.getNewData1();
                this.getNewData2();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "text-center"
      }, this.state.openKey ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_BattleAfter_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], {
        Name1: this.state.userName1,
        Name2: this.state.userName2,
        Item1: this.state.userItem1,
        Item2: this.state.userItem2
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_BattleAgo_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], {
        getChildData: this.getData
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["HashRouter"], null, this.state.oneKey && this.state.twoKey ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["Link"], {
        to: {
          pathname: this.state.openKey ? "/battle" : "/battle/".concat(this.state.userName1, "&").concat(this.state.userName2)
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_14__["Button"], {
        className: "button",
        type: "button",
        variant: "primary",
        onClick: this.openBattle
      }, this.state.openKey ? "GOBACK" : "BATTLE")) : null));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Battle;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Battle, "Battle", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Battle.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/pages/Popular.jsx":
/*!*******************************!*\
  !*** ./src/pages/Popular.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _assets_imgs_pic1_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/assets/imgs/pic1.png */ "./src/assets/imgs/pic1.png");











(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};



 // import styles from 'bootstrap/dist/css/bootstrap.min.css';



var ListGroup = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["ListGroup"];
var Spinner = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Spinner"];
var Alert = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Alert"];
var Container = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Container"];
var Nav = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Nav"];
var Card = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"];
var Row = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Row"];
var Col = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Col"];
var Button = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Button"];
var ListGroupItem = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["ListGroupItem"];

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i += 1) {
    var pair = vars[i].split('=');

    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }

  return null;
}

var Header = function Header(props) {
  var menuItems = ['All', 'Javascript', 'Ruby', 'Java', 'Css', 'Python'];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Nav, {
    className: "justify-content-center" // className={styles.}
    ,
    style: {
      border: 'soild black'
    },
    variant: "tabs",
    defaultActiveKey: "All",
    onSelect: function onSelect(selectedKey) {
      return props.onClick(selectedKey);
    }
  }, menuItems.map(function (item, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Nav.Item, {
      key: key
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Nav.Link, {
      eventKey: item
    }, item));
  }))));
};

var Content = function Content(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Container, null, props.children));
};

var Footer = function Footer(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Container, null, props.children));
};

var RepoCard = function RepoCard(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card, {
    border: "primary",
    style: {
      marginTop: '8px',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Header, {
    className: "text-center bg-white font-weight-bold"
  }, props.no), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Body, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Img, {
    src: _assets_imgs_pic1_png__WEBPACK_IMPORTED_MODULE_14__["default"],
    "data-src": props.img,
    className: "lazyload"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Title, {
    className: "text-center",
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Link, {
    href: props.url,
    className: "text-danger",
    target: "_blank"
  }, props.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroup, {
    className: "list-group-flush"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroupItem, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
    className: "fa fa-user fa-lg fa-fw",
    style: {
      color: 'orange'
    }
  }), props.author)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroupItem, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
    className: "fa fa-star fa-lg fa-fw",
    style: {
      color: 'yellow'
    }
  }), props.stars)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroupItem, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
    className: "fa fa-code-fork fa-lg fa-fw",
    style: {
      color: 'lightblue'
    }
  }), props.forks)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroupItem, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
    className: "fa fa-warning fa-lg fa-fw",
    style: {
      color: 'purple'
    }
  }), props.issues)))));
};

var App = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, App);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "handleNavClick", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var type,
          page,
          cards,
          url,
          beforeState,
          res,
          newCards,
          _args = arguments;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'all';
              page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
              cards = _this.state.cards;
              url = '';
              _context.t0 = type;
              _context.next = _context.t0 === 'Javascript' ? 7 : _context.t0 === 'Ruby' ? 9 : _context.t0 === 'Java' ? 11 : _context.t0 === 'Css' ? 13 : 15;
              break;

            case 7:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories';
              return _context.abrupt("break", 16);

            case 9:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories';
              return _context.abrupt("break", 16);

            case 11:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories';
              return _context.abrupt("break", 16);

            case 13:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories';
              return _context.abrupt("break", 16);

            case 15:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories';

            case 16:
              url = "".concat(url, "&page=").concat(page, "&per_page=10");
              _context.prev = 17;
              beforeState = {
                type: type,
                loading: true,
                error: null
              };

              if (page === 1) {
                beforeState.cards = [];
              }

              _this.setState(beforeState);

              _context.next = 23;
              return axios__WEBPACK_IMPORTED_MODULE_11___default.a.get(url);

            case 23:
              res = _context.sent;
              newCards = res.data.items.map(function (item, key) {
                return {
                  no: "#".concat(page === 1 ? 1 + key : cards.length + 1 + key),
                  img: item.owner.avatar_url,
                  title: item.full_name,
                  author: item.owner.login,
                  stars: item.stargazers_count,
                  forks: item.forks,
                  issues: item.open_issues,
                  url: item.html_url
                };
              });

              if (page > 1) {
                _this.setState(function (state) {
                  return {
                    cards: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(state.cards), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(newCards)),
                    loading: false,
                    page: page
                  };
                });
              } else {
                _this.setState({
                  cards: newCards,
                  loading: false,
                  page: page
                });
              }

              _context.next = 31;
              break;

            case 28:
              _context.prev = 28;
              _context.t1 = _context["catch"](17);

              _this.setState({
                loading: false,
                error: _context.t1
              });

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[17, 28]]);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "loadMore", function () {
      var _this$state = _this.state,
          type = _this$state.type,
          page = _this$state.page;

      _this.handleNavClick(type, page + 1);
    });

    var _cards = [];
    _this.state = {
      cards: _cards,
      loading: false,
      error: null,
      type: 'all',
      page: 1
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleNavClick();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          cards = _this$state2.cards,
          loading = _this$state2.loading,
          error = _this$state2.error;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h2", {
        style: {
          margin: '20px auto'
        }
      }, "github\u70ED\u95E8\u9879\u76EE"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "container"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Header, {
        onClick: this.handleNavClick
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Row, {
        className: "justify-content-around"
      }, cards.map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Col, {
          sm: 6,
          md: 4,
          lg: 3,
          key: key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(RepoCard, {
          no: item.no,
          img: item.img,
          title: item.title,
          author: item.author,
          stars: item.stars,
          forks: item.forks,
          issues: item.issues,
          url: item.url
        }));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "text-center"
      }, error && error.response && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Alert, {
        variant: "danger"
      }, error.response.status, " ", error.response.statusText)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Button, {
        className: "button",
        onClick: this.loadMore,
        disabled: loading
      }, " ", loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Spinner, {
        as: "span",
        animation: "grow",
        size: "sm",
        role: "status",
        "aria-hidden": "true"
      }), " \u52A0\u8F7D\u66F4\u591A"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "text-center text-black jumbotron bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("p", null, "\u7248\u6743\u6240\u6709 \xA9 \u5F20\u88D5\u5802")))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ListGroup, "ListGroup", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Spinner, "Spinner", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Alert, "Alert", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Container, "Container", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Nav, "Nav", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Card, "Card", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Row, "Row", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Col, "Col", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Button, "Button", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(ListGroupItem, "ListGroupItem", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(getQueryVariable, "getQueryVariable", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Header, "Header", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Content, "Content", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Footer, "Footer", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(RepoCard, "RepoCard", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
  reactHotLoader.register(App, "App", "E:\\VsCode\\train\\Train\\day5_03\\src\\pages\\Popular.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/styles/index.less":
/*!*******************************!*\
  !*** ./src/styles/index.less ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/styles/index.less");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__["default"], options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__["default"].locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__["default"].locals;

    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/styles/index.less",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/styles/index.less");
(function () {
        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__["default"].locals, undefined)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__["default"].locals;

              update(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__["default"]);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

/******/ });
//# sourceMappingURL=index.f37a11ae.js.map