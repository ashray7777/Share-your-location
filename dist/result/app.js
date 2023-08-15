/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SharePlace.js":
/*!***************************!*\
  !*** ./src/SharePlace.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Modal.js */ \"./src/UI/Modal.js\");\n/* harmony import */ var _UI_Map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/Map.js */ \"./src/UI/Map.js\");\n/* harmony import */ var _Utility_Location_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Location.js */ \"./src/Utility/Location.js\");\n\r\n\r\n\r\n\r\nclass PlaceFinder {\r\n\r\n    constructor() {\r\n        const addressForm = document.querySelector('form');\r\n        const locateButton = document.getElementById('locate-btn');\r\n        this.shareBtn = document.getElementById('share-btn');\r\n\r\n        locateButton.addEventListener('click', this.locateUserHandler.bind(this));\r\n        this.shareBtn.addEventListener('click', this.sharePlaceHandler);\r\n        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));\r\n    }\r\n\r\n    sharePlaceHandler() {\r\n        const sharedLinkInputElement = document.getElementById('share-link');\r\n        if(!navigator.clipboard) {\r\n            sharedLinkInputElement.select();\r\n            return;\r\n        }\r\n\r\n        navigator.clipboard.writeText(sharedLinkInputElement.value).then(()=>{\r\n            alert('Copied into clipboard');\r\n        })\r\n        .catch(err => {\r\n            console.log(err);\r\n            sharedLinkInputElement.select();\r\n        })\r\n    }\r\n\r\n    selectPlace(coordinates, address){\r\n        if (this.map){\r\n            this.map.render(coordinates);\r\n        } else {\r\n            this.map = new _UI_Map_js__WEBPACK_IMPORTED_MODULE_1__.Map(coordinates);\r\n        }\r\n        this.shareBtn.disabled = false;\r\n        const sharedLinkInputElement = document.getElementById('share-link');\r\n        sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;\r\n    }\r\n\r\n    locateUserHandler() {\r\n        if (!navigator.geolocation){\r\n            alert('Location feature is not available in your browser - please add more modern browser or manually enter an address');\r\n            return;\r\n        }\r\n        const modal = new _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__.Modal('loading-modal-content', 'Loading location please wait!');\r\n        modal.show();   \r\n        navigator.geolocation.getCurrentPosition(\r\n            async successResult => {\r\n            const coordinates = {\r\n                lat: successResult.coords.latitude,\r\n                lng: successResult.coords.longitude\r\n            };\r\n            console.log(coordinates);\r\n            const address = await (0,_Utility_Location_js__WEBPACK_IMPORTED_MODULE_2__.getAddressFromCoords)(coordinates);\r\n            console.log(address);\r\n            modal.hide();\r\n            console.log(coordinates);\r\n            this.selectPlace(coordinates, address);\r\n        }, error => {\r\n            modal.hide();\r\n            alert('Could not locate you unfortunately. Please enter an address manually!'\r\n            );\r\n        });\r\n    }\r\n\r\n    async findAddressHandler(event) {\r\n        event.preventDefault();\r\n        const address = event.target.querySelector('input').value;\r\n        if(!address || address.trim().length === 0){\r\n            alert('Invalid address entered - please try again!');\r\n            return;\r\n        }\r\n        const modal = new _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__.Modal('loading-modal-content', 'Loading location please wait!');\r\n        modal.show();\r\n        try {\r\n            const coordinates = await (0,_Utility_Location_js__WEBPACK_IMPORTED_MODULE_2__.getCoordsFromAddress)(address);\r\n            this.selectPlace(coordinates, address);\r\n        } catch (err){\r\n            alert(err.message);\r\n        }\r\n        modal.hide();\r\n    }\r\n}\r\n\r\nnew PlaceFinder();\n\n//# sourceURL=webpack://tooling-01-starting-project/./src/SharePlace.js?");

/***/ }),

/***/ "./src/UI/Map.js":
/*!***********************!*\
  !*** ./src/UI/Map.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Map: () => (/* binding */ Map)\n/* harmony export */ });\nclass Map {\r\n    constructor(coords){\r\n        // this.coordinates = coords;\r\n        this.render(coords);\r\n    }\r\n\r\n    render(coordinates) {\r\n        if (!ol){\r\n            alert('Could not load maps library - please try again later');\r\n            return;\r\n        } else{\r\n            document.getElementById('map').innerHTML= '';\r\n            const key = 'SMQO44blB5u3ULvvaQZG';\r\n            const source = new ol.source.TileJSON({\r\n              url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`,\r\n              tileSize: 512,\r\n              crossOrigin: 'anonymous'\r\n            });\r\n            const attribution = new ol.control.Attribution({\r\n                collapsible: false,\r\n                });\r\n                const map = new ol.Map({\r\n                  layers: [\r\n                    new ol.layer.Tile({\r\n                      source: source\r\n                    })\r\n                  ],\r\n                  controls: ol.control.defaults.defaults({attribution: false}).extend([attribution]),\r\n                  target: 'map',\r\n                  view: new ol.View({\r\n                    constrainResolution: true,\r\n                    center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),\r\n                    zoom: 14\r\n                  })\r\n                });\r\n              \r\n            const layer = new ol.layer.Vector({\r\n                source: new ol.source.Vector({\r\n                  features: [\r\n                  new ol.Feature({\r\n                      geometry: new ol.geom.Point(ol.proj.fromLonLat([coordinates.lng, coordinates.lat])),\r\n                  })\r\n                  ]\r\n              }),\r\n              style: new ol.style.Style({\r\n                  image: new ol.style.Icon({\r\n                  anchor: [0.5, 1],\r\n                  crossOrigin: 'anonymous',\r\n                  src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',\r\n                  })\r\n                })\r\n              });\r\n              map.addLayer(layer);           \r\n            // const map = new ol.Map({\r\n            //     view: new ol.View({\r\n            //       center: ol.proj.fromLonLat[coordinates.lng, coordinates.lat],\r\n            //       zoom: 4\r\n            //     }),\r\n            //     layers: [\r\n            //       new ol.Tile({\r\n            //         source: new ol.source.OSM(),\r\n            //       }),\r\n            //     ],\r\n            //     target: 'map',\r\n            //   });\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://tooling-01-starting-project/./src/UI/Map.js?");

/***/ }),

/***/ "./src/UI/Modal.js":
/*!*************************!*\
  !*** ./src/UI/Modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Modal: () => (/* binding */ Modal)\n/* harmony export */ });\nclass Modal {    // Modal an overlay on the screen\r\n    constructor(contentId, fallbackText) {\r\n        this.contentTemplateEl = document.getElementById(contentId);\r\n        this.modalTemplateEl = document.getElementById('modal-template');\r\n    }\r\n\r\n    show() {\r\n        if ('content' in document.createElement('template')) {  //As createElement not in IE-Check fails there\r\n            const modalElements = document.importNode(this.modalTemplateEl.content, true); //true to get deep clone\r\n            this.modalElement = modalElements.querySelector('.modal');\r\n            this.backdropElement = modalElements.querySelector('.backdrop');\r\n            //2 elements needed as a frame and background for background overlay\r\n\r\n            //content we want to display\r\n            const contentElement = document.importNode(\r\n                this.contentTemplateEl.content, true\r\n            );\r\n\r\n            this.modalElement.appendChild(contentElement);   \r\n\r\n            document.body.insertAdjacentElement('afterbegin', this.modalElement); //Inside of the body right after beginning\r\n            document.body.insertAdjacentElement('afterbegin', this.backdropElement); \r\n\r\n        } else {\r\n            // fallback code\r\n            alert(this.fallbackText);\r\n        }\r\n    }\r\n\r\n    hide() {\r\n        if (this.modalElement){\r\n            document.body.removeChild(this.modalElement); //this.modalElement.remove()\r\n            document.body.removeChild(this.backdropElement);\r\n            this.modalElement = null; //Tell DOM these elements are empty and reference to the\r\n                                      //copied DOM element is no longer needed and can be cleared up\r\n            this.backdropElement = null;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://tooling-01-starting-project/./src/UI/Modal.js?");

/***/ }),

/***/ "./src/Utility/Location.js":
/*!*********************************!*\
  !*** ./src/Utility/Location.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAddressFromCoords: () => (/* binding */ getAddressFromCoords),\n/* harmony export */   getCoordsFromAddress: () => (/* binding */ getCoordsFromAddress)\n/* harmony export */ });\nconst API_KEY = 'SMQO44blB5u3ULvvaQZG';\r\n\r\nasync function getAddressFromCoords(coords){\r\n    const response = await fetch(`https://api.maptiler.com/geocoding/${coords.lng},${coords.lat}.json?key=${API_KEY}`);\r\n    if(!response.ok){\r\n        throw new Error('Failed to fetch address. Please try again');\r\n    }\r\n    const data = await response.json();\r\n    if(data.error){\r\n        throw new Error(data.error.message);\r\n    }   \r\n\r\n    const address =  data.features[0].place_name;\r\n    return address;\r\n}\r\n\r\nasync function getCoordsFromAddress(address){\r\n    const urlAddress = encodeURI(address);  //to get url firendly string \r\n    const response = await fetch(`https://api.maptiler.com/geocoding/${urlAddress}.json?key=${API_KEY}`);\r\n    console.log(response);\r\n    if(!response.ok){\r\n        throw new Error('Failed to fetch coordinates. Please try again');\r\n    }\r\n    const data = await response.json();\r\n    console.log(data);\r\n    if(data.error){\r\n        throw new Error(data.error.message);\r\n    }\r\n\r\n    const coordinates = {\r\n        lat: data.features[0].center[1],\r\n        lng: data.features[0].center[0]\r\n    }\r\n    return coordinates;\r\n}\n\n//# sourceURL=webpack://tooling-01-starting-project/./src/Utility/Location.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/SharePlace.js");
/******/ 	
/******/ })()
;