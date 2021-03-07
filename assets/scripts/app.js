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

/***/ "./src/UI/Map.js":
/*!***********************!*\
  !*** ./src/UI/Map.js ***!
  \***********************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return Map; });\nclass Map {\r\n  constructor(coords) {\r\n    // this.coordinates = coords;\r\n    this.render(coords);\r\n    this.centerPosition;\r\n  }\r\n  render(coordinates) {\r\n    // console.log(\"coordinates\");\r\n    // console.log(coordinates);\r\n    // console.log(Array.isArray(coordinates));\r\n    //check if we have access to global google variable\r\n    if (!google) {\r\n      alert(\"could not load maps library - please try again later! \");\r\n      return;\r\n    }\r\n\r\n    if (Array.isArray(coordinates)) {\r\n      this.centerPosition = coordinates[0].latLng[0];\r\n    } else {\r\n      this.centerPosition = coordinates;\r\n    }\r\n\r\n    const map = new google.maps.Map(document.getElementById(\"map\"), {\r\n      center: this.centerPosition,\r\n      zoom: 14,\r\n    });\r\n\r\n    // check if the coordinates contain only one place or as Array\r\n    let marker = \"\";\r\n    let infowindow = new google.maps.InfoWindow();\r\n    let InfoObj = [];\r\n    function closeOtherInfoWindows() {\r\n      console.log(InfoObj.length);\r\n      if (InfoObj.length > 0) {\r\n        InfoObj[0].set(\"marker\", null);\r\n        InfoObj[0].close();\r\n        InfoObj.length = 0;\r\n      }\r\n    }\r\n    if (Array.isArray(coordinates)) {\r\n      for (let i = 0; i < coordinates.length; i++) {\r\n        var contentString = `<div style='color:black'><h3> ${coordinates[i].name}</h3><br><h3> ${coordinates[i].rating}</h3><br> <h5>${coordinates[i].formatted_address}</h5></div>`;\r\n        marker = new google.maps.Marker({\r\n          position: coordinates[i].latLng[0],\r\n          map: map,\r\n        });\r\n\r\n        let infowindow = new google.maps.InfoWindow({\r\n          content: contentString,\r\n        });\r\n\r\n        google.maps.event.addListener(\r\n          marker,\r\n          \"click\",\r\n          (function (marker, i) {\r\n            return function () {\r\n              // add the data to the infoWindow in the map\r\n              closeOtherInfoWindows();\r\n              infowindow.open(marker.get(\"map\"), marker);\r\n              InfoObj[0] = infowindow;\r\n            };\r\n          })(marker, i)\r\n        );\r\n      }\r\n    } else {\r\n      marker = new google.maps.Marker({\r\n        position: coordinates,\r\n        map: map,\r\n      });\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/UI/Map.js?");

/***/ }),

/***/ "./src/UI/Modal.js":
/*!*************************!*\
  !*** ./src/UI/Modal.js ***!
  \*************************/
/*! exports provided: Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Modal\", function() { return Modal; });\nclass Modal {\r\n  constructor(contentId, fallbackText) {\r\n    this.contentTemplateEl = document.getElementById(contentId);\r\n    this.modalTemplateEl = document.getElementById(\"modal-template\");\r\n    this.fallbackText = fallbackText;\r\n  }\r\n\r\n   //                                           feedback loader \r\n  show() {\r\n    //check if template tag is available in target browser\r\n    if (\"content\" in document.createElement(\"template\")) {\r\n      const modalElements = document.importNode(\r\n        this.modalTemplateEl.content,\r\n        true\r\n      );\r\n      // to ability of delete this elements make them properties for model class\r\n      this.modalElement = modalElements.querySelector(\".modal\");\r\n      this.backdropElement = modalElements.querySelector(\".backdrop\");\r\n      const contentElement = document.importNode(\r\n        this.contentTemplateEl.content,\r\n        true\r\n      );\r\n\r\n      this.modalElement.appendChild(contentElement);\r\n      // Detect modal and backdrop elements to the Dom\r\n      document.body.insertAdjacentElement(\"afterbegin\", this.modalElement);\r\n      document.body.insertAdjacentElement(\"afterbegin\", this.backdropElement);\r\n    } else {\r\n      //fall back code\r\n      alert(this.fallbackText);\r\n    }\r\n  }\r\n\r\n  hide() {\r\n    if (this.modalElement) {\r\n      document.body.removeChild(this.modalElement); // can easily use this.modalElement.remove(); but not all brwosers support that\r\n      document.body.removeChild(this.backdropElement);\r\n      this.modalElement = null;\r\n      this.backdropElement = null;\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/UI/Modal.js?");

/***/ }),

/***/ "./src/Utility/Location.js":
/*!*********************************!*\
  !*** ./src/Utility/Location.js ***!
  \*********************************/
/*! exports provided: getAddressFromCoords, getCoordsFromAddress, getOpenSelectedLocations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAddressFromCoords\", function() { return getAddressFromCoords; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCoordsFromAddress\", function() { return getCoordsFromAddress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getOpenSelectedLocations\", function() { return getOpenSelectedLocations; });\nconst Google_API_KEY = \"AIzaSyDRENO4_Rz8_aVgj7KVXI8UsxabmJ12kiA\";\r\n\r\n//                              For getting the Address fom the Coords\r\nasync function getAddressFromCoords(coords) {\r\n  const response = await fetch(\r\n    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${Google_API_KEY}`\r\n  );\r\n  if (!response.ok) {\r\n    throw new Error(\"Failed to fetch Address - Please try again!\");\r\n  }\r\n  const data = await response.json();\r\n  if (data.error_message) {\r\n    throw new Error(data.error_message);\r\n  }\r\n\r\n  const address = data.results[0].formatted_address;\r\n  return address;\r\n}\r\n\r\n//                              For getting the cords fom the netered address\r\nasync function getCoordsFromAddress(address) {\r\n  const urlAddress = encodeURI(address);\r\n  console.log(urlAddress);\r\n\r\n  const response = await fetch(\r\n    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${Google_API_KEY}`\r\n  );\r\n  if (!response.ok) {\r\n    throw new Error(\"Failed to fetch coordinates - Please try again!\");\r\n    return;\r\n  }\r\n\r\n  const data = await response.json();\r\n  if (data.error_message) {\r\n    console.log(\"location error\");\r\n    throw new Error(data.error_message);\r\n  }\r\n    const coordinates = [];\r\n  // const coordinates = data.results[0].geometry.location;\r\n      for (let i = 0; i < data.results.length; i++) {\r\n      coordinates.push({latLng:[{lat:data.results[i].geometry.location.lat,lng:data.results[i].geometry.location.lng}],formatted_address:data.results[i].formatted_address,name:data.results[i].name,rating:data.results[i].rating})\r\n     }\r\n  return coordinates;\r\n  console.log(data);\r\n}\r\n\r\n//                                        getting places from selected category and chooose between opennow or all the times\r\nasync function getOpenSelectedLocations(type,open,coords) {\r\n  console.log(type,open,coords);\r\n  const response = await fetch(\r\n    // `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=1500&type=restaurant&${open}&key=${Google_API_KEY}.`,\r\n   `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${coords.lat},${coords.lng}&query=${type}&sensor=true&${open}&radius=2000&key=${Google_API_KEY}`\r\n  );\r\n\r\n\r\n  if (!response.ok) {\r\n    console.log(\"RESPONSE NOT OK\");\r\n    throw new Error(\"Failed to fetch coordinates - Please try again!\");\r\n    return;\r\n  }\r\n\r\n  const data = await response.json();\r\n  if (data.error_message) {\r\n    console.log(\"location error\");\r\n    throw new Error(data.error_message);\r\n  }\r\n  console.log(\"result length\");\r\n  console.log(data.results.length);\r\n  console.log(data);\r\n\r\n  const coordinates = [];\r\n\r\n     for (let i = 0; i < data.results.length; i++) {\r\n    coordinates.push({latLng:[{lat:data.results[i].geometry.location.lat,lng:data.results[i].geometry.location.lng}],formatted_address:data.results[i].formatted_address,name:data.results[i].name,rating:data.results[i].rating})\r\n     }\r\n\r\n\r\n  return coordinates;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Utility/Location.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Modal.js */ \"./src/UI/Modal.js\");\n/* harmony import */ var _UI_Map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/Map.js */ \"./src/UI/Map.js\");\n/* harmony import */ var _Utility_Location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Location */ \"./src/Utility/Location.js\");\n// import { CollapseHandler } from \"./Utility/collapseHandler.js\";\r\n// import \"./Utility/autoComplete\";\r\n\r\n\r\n\r\n\r\nclass placeFinder {\r\n  constructor() {\r\n    const addressForm = document.querySelector(\"form\");\r\n    const locateUserBtn = document.getElementById(\"locate-btn\");\r\n    //\r\n    const fetchPlaces = document.querySelector(\".looking-for-form\");\r\n    //\r\n    const SearchPlaces = document.querySelector(\".search-bar\");\r\n    this.mapArea = document.getElementById(\"selected-place\");\r\n    this.searchSeaction = document.querySelector(\".search-box\");\r\n    this.statusText = document.getElementById(\"status\");\r\n    this.selectedCategory;\r\n    this.openTime;\r\n    this.coordinatesForSearchArround=[];\r\n    let autoComplete;\r\n\r\n    locateUserBtn.addEventListener(\"click\", this.locateUserHandler.bind(this));\r\n    fetchPlaces.addEventListener(\"submit\", this.openSelectedPlaces.bind(this));\r\n    addressForm.addEventListener(\"submit\", this.findAddressHandler.bind(this));\r\n  }\r\n  alertFunc() {\r\n    this.statusText.textContent = \" \";\r\n  }\r\n  clearStatus(message, clear, seconds) {\r\n    this.statusText.textContent = message;\r\n    if (clear) {\r\n      setTimeout(function () {\r\n        this.alertFunc;\r\n      }, seconds);\r\n    }\r\n  }\r\n  styleSearchboxWhenMapRender() {\r\n    this.searchSeaction.style.margin = \"0%\";\r\n    this.mapArea.style.display = \"block\";\r\n  }\r\n unsupportBrowsersHandler() {\r\n    // unsupport broswser fall back\r\n    if (!navigator.geolocation) {\r\n      alert(\r\n        \"Location feature is not available in your browser - please use a more moder browser or manually enter the address! \"\r\n      );\r\n      return;\r\n    }\r\n  }\r\n\r\n  selectPlace(coordinates, address) {\r\n    // To reuse the existing one and just render the data\r\n    if (this.map) {\r\n      this.map.render(coordinates);\r\n    } else {\r\n      this.map = new _UI_Map_js__WEBPACK_IMPORTED_MODULE_1__[\"Map\"](coordinates);\r\n    }\r\n\r\n    fetch(\"http://localhost:3000/add-location\", {\r\n      method: \"POST\",\r\n      body: JSON.stringify({\r\n        address: address,\r\n        lat: coordinates.lat,\r\n        lng: coordinates.lng,\r\n      }),\r\n      headers: {\r\n        \"Content-Type\": \"application/json\",\r\n      },\r\n    })\r\n      .then((response) => {\r\n        if (!response.ok) {\r\n          throw new Error(\"Failed to fetch coordinates - Please try again!\");\r\n        }\r\n        return response.json();\r\n      })\r\n      .then((data) => {\r\n        if (data.error_message) {\r\n          throw new Error(data.error_message);\r\n        }\r\n      });\r\n  }\r\n\r\n  async openSelectedPlaces(e) {\r\n    e.preventDefault();\r\n    const types = document.getElementsByName(\"type\");\r\n    const open = document.getElementsByName(\"open\");\r\n    for (let i = 0; i < types.length; i++) {\r\n      if (types[i].checked) {\r\n        this.selectedCategory = types[i].value;\r\n      } else {\r\n        this.clearStatus(\"Should select one of the places first\", true, 5000);\r\n      }\r\n    }\r\n\r\n    for (let i = 0; i < open.length; i++) {\r\n      if (open[i].checked) {\r\n        this.openTime = open[i].value;\r\n      }\r\n    }\r\n\r\n    // get  current user's coordinates to search arround it\r\n        this.unsupportBrowsersHandler();\r\n        navigator.geolocation.getCurrentPosition(\r\n      async (successResult) => {\r\n    const  myCurrentCoordinates = {\r\n        lat: successResult.coords.latitude,\r\n        lng: successResult.coords.longitude,\r\n      };\r\n        console.log('myCurrentCoordinates1');\r\n    console.log(myCurrentCoordinates);\r\n     const address = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getAddressFromCoords\"])(myCurrentCoordinates);\r\n    if (this.selectedCategory && this.openTime) {\r\n      const openPlaces = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getOpenSelectedLocations\"])(\r\n        this.selectedCategory,\r\n        this.openTime,\r\n        myCurrentCoordinates\r\n      );\r\n      this.selectPlace(openPlaces, \"\");\r\n      this.styleSearchboxWhenMapRender();\r\n    }\r\n    });\r\n    console.log('myCurrentCoordinates2');\r\n    console.log(this.coordinatesForSearchArround);\r\n\r\n  }\r\n  locateUserHandler() {\r\n    // unsupport broswser fall back\r\n      this.unsupportBrowsersHandler();\r\n\r\n    const modal = new _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"](\r\n      \"loading-modal-content\",\r\n      \"Loading location Please wait\"\r\n    );\r\n    modal.show();\r\n    navigator.geolocation.getCurrentPosition(\r\n      async (successResult) => {\r\n        modal.hide();\r\n        const myCurrentCoordinates = {\r\n          lat: successResult.coords.latitude,\r\n          lng: successResult.coords.longitude,\r\n        };\r\n\r\n        const address = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getAddressFromCoords\"])(myCurrentCoordinates);\r\n\r\n        this.selectPlace(myCurrentCoordinates, address);\r\n        console.log(myCurrentCoordinates);\r\n        this.styleSearchboxWhenMapRender();\r\n\r\n        this.clearStatus(address, false, \"\");\r\n      },\r\n      (error) => {\r\n        modal.hide();\r\n        alert(\r\n          \" Could not locate you unfortunately, Please enter an address manually\"\r\n        );\r\n        return;\r\n      }\r\n    );\r\n  }\r\n\r\n  async findAddressHandler(e) {\r\n    e.preventDefault();\r\n    const address = e.target.querySelector(\"input\").value;\r\n    if (!address || address.trim().length === 0) {\r\n      this.clearStatus(\r\n        \"Invalid entered address - Please try again! \",\r\n        true,\r\n        5000\r\n      );\r\n\r\n      alert(\"Invalid entered address - Please try again! \");\r\n      return;\r\n    }\r\n\r\n    const modal = new _UI_Modal_js__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"](\r\n      \"loading-modal-content\",\r\n      \"Loading location Please wait\"\r\n    );\r\n    modal.show();\r\n    try {\r\n      const coordinates = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getCoordsFromAddress\"])(address);\r\n\r\n      this.selectPlace(coordinates, address);\r\n    } catch (err) {\r\n      this.clearStatus(err, true, 5000);\r\n      console.log(err);\r\n      alert(err.message);\r\n    }\r\n    modal.hide();\r\n    this.statusText.textContent = address;\r\n    this.searchSeaction.style.margin = \"0%\";\r\n    this.mapArea.style.display = \"block\";\r\n  }\r\n}\r\nnew placeFinder();\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });