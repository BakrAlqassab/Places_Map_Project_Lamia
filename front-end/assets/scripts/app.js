/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/UI/Modal.js":
/*!*************************!*\
  !*** ./src/UI/Modal.js ***!
  \*************************/
/*! exports provided: Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Modal\", function() { return Modal; });\nclass Modal {\r\n  constructor(contentId, fallbackText) {\r\n    this.contentTemplateEl = document.getElementById(contentId);\r\n    this.modalTemplateEl = document.getElementById(\"modal-template\");\r\n    this.fallbackText = fallbackText;\r\n  }\r\n  show() {\r\n    //check if template tag is available in target browser\r\n    if (\"content\" in document.createElement(\"template\")) {\r\n      const modalElements = document.importNode(\r\n        this.modalTemplateEl.content,\r\n        true\r\n      );\r\n      const modalElement = modalElements.querySelector(\".modal\");\r\n      const backdropElement = modalElements.querySelector(\".backdrop\");\r\n      const contentElement = document.importNode(\r\n        this.contentTemplateEl.content,\r\n        true\r\n      );\r\n\r\n      modalElement.appendChild(contentElement);\r\n      // modal and backdrop elements to the Dom\r\n      document.body.insertAdjacentElement('afterbegin',modalElement)\r\n      document.body.insertAdjacentElement('afterbegin',backdropElement)\r\n    } else {\r\n      //fall back code\r\n      alert(this.fallbackText);\r\n    }\r\n  }\r\n\r\n  hide() {}\r\n}\r\n\n\n//# sourceURL=webpack:///./src/UI/Modal.js?");

/***/ }),

/***/ "./src/Utility/collapseHandler.js":
/*!****************************************!*\
  !*** ./src/Utility/collapseHandler.js ***!
  \****************************************/
/*! exports provided: CollapseHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CollapseHandler\", function() { return CollapseHandler; });\nclass CollapseHandler {\r\n  constructor() {\r\n    //  content wrap collapsing\r\n\r\n    // toggle collapse of specified content\r\n\r\n    const colls = document.getElementsByClassName(\"picking_btn\");\r\n    this.toggleContent = (content) => {\r\n      if (content.style.height) {\r\n        content.style.height = null;\r\n      } else {\r\n        content.style.height = content.scrollHeight + \"px\";\r\n      }\r\n    };\r\n\r\n    this.collapseAllOpenContent = () => {\r\n      const colls = document.getElementsByClassName(\"picking_btn\");\r\n      for (const coll of colls) {\r\n        if (coll.classList.contains(\"picking_btn__active\")) {\r\n          coll.classList.remove(\"picking_btn__active\");\r\n          toggleContent(coll.nextElementSibling);\r\n        }\r\n      }\r\n    };\r\n\r\n    // collapse all open content\r\n    for (const coll of colls) {\r\n      coll.addEventListener(\"click\", function () {\r\n        if (!this.classList.contains(\"picking_btn__active\")) {\r\n          collapseAllOpenContent();\r\n        }\r\n        this.classList.toggle(\"picking_btn__active\");\r\n        toggleContent(this.nextElementSibling);\r\n      });\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Utility/collapseHandler.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Utility_collapseHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility/collapseHandler.js */ \"./src/Utility/collapseHandler.js\");\n/* harmony import */ var _UI_Modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/Modal.js */ \"./src/UI/Modal.js\");\n\r\n\r\n\r\nclass placeFinder {\r\n  constructor() {\r\n    const addressForm = document.querySelector(\"form\");\r\n    const locateUserBtn = document.getElementById(\"locate-btn\");\r\n\r\n    // const status = document.getElementById(\"status\");\r\n    // const mapLink = document.getElementById(\"status\");\r\n    locateUserBtn.addEventListener(\"click\", this.locateUserHandler);\r\n    addressForm.addEventListener(\"submit\", this.findAddressHandler);\r\n  }\r\n\r\n  locateUserHandler() {\r\n    // unsupport broswser fall back\r\n    if (!navigator.geolocation) {\r\n      alert(\r\n        \"Location feature is not available in your browser - please use a more moder browser or manually enter the address! \"\r\n      );\r\n      return;\r\n    }\r\n\r\n    navigator.geolocation.getCurrentPosition(\r\n      (successResult) => {\r\n        console.log(successResult);\r\n        const myCoordinates = {\r\n          lat: successResult.coords.latitude,\r\n          lng: successResult.coords.longitude,\r\n        };\r\n        console.log(myCoordinates);\r\n      },\r\n      (error) => {\r\n        alert(\r\n          \" Could not locate you unfortunately, Please enter an address manually\"\r\n        );\r\n      }\r\n    );\r\n\r\n    // mapLink.href = \"\";\r\n    // mapLink.textContent = \"\";\r\n\r\n    // function success(position) {\r\n    //   const latitude = position.coords.latitude;\r\n    //   const longitude = position.coords.longitude;\r\n\r\n    //   status.textContent = \"\";\r\n    //   mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;\r\n    //   mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;\r\n    // }\r\n\r\n    // function error() {\r\n    //   status.textContent = \"Unable to retrieve your location\";\r\n    // }\r\n\r\n    // if (!navigator.geolocation) {\r\n    //   status.textContent = \"Geolocation is not supported by your browser\";\r\n    // } else {\r\n    //   status.textContent = \"Locating…\";\r\n    //   navigator.geolocation.getCurrentPosition(success, error);\r\n    // }\r\n  }\r\n  findAddressHandler(e) {\r\n    e.preventDefault();\r\n    console.log(\"hrhr\");\r\n  }\r\n}\r\nnew placeFinder();\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });