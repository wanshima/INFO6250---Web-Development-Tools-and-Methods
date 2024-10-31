/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PAGES: () => (/* binding */ PAGES)
/* harmony export */ });
var PAGES = {
  LOGIN: 'login',
  WORD_VIEW: 'wordView'
};

/***/ }),

/***/ "./src/fetchService.js":
/*!*****************************!*\
  !*** ./src/fetchService.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchService: () => (/* binding */ fetchService)
/* harmony export */ });
function fetchService(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fetch(url, options)["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/messages.js":
/*!*************************!*\
  !*** ./src/messages.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES)
/* harmony export */ });
var MESSAGES = {
  'network-error': 'Server is unavailable. Please try again later.',
  'auth-missing': 'You need to be logged in to perform this action.',
  'auth-insufficient': 'Invalid username.',
  'required-username': 'Username is required and must be alphanumeric.',
  'required-word': 'Word is required.',
  'invalid-word': 'Word contains invalid characters.',
  "default": 'An unexpected error occurred. Please try again.'
};

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

function render(state, rootEl) {
  var page = state.page;
  if (page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.LOGIN) {
    renderLoginView(state, rootEl);
  } else if (page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.WORD_VIEW) {
    renderWordView(state, rootEl);
  }
}
function renderLoginView(state, rootEl) {
  var error = state.error;
  var html = "\n    ".concat(error ? "<div class=\"error\">".concat(error, "</div>") : '', "\n    <form class=\"form\" id=\"login-form\">\n      <label class=\"label\" for=\"username\">Enter Username:</label>\n      <input class=\"input\" type=\"text\" name=\"username\" id=\"username\" required />\n      <button class=\"button\" type=\"submit\">Login</button>\n    </form>\n  ");
  rootEl.innerHTML = html;
}
function renderWordView(state, rootEl) {
  var username = state.username,
    storedWord = state.storedWord,
    error = state.error;
  var html = "\n    <div class=\"nav\">\n      <span>Welcome, ".concat(username, "</span>\n      <button class=\"button\" id=\"logout-btn\">Logout</button>\n    </div>\n    ").concat(error ? "<div class=\"error\">".concat(error, "</div>") : '', "\n    <div class=\"content\">\n      <form class=\"form\" id=\"word-form\">\n        <label class=\"label\" for=\"word\">Your Stored Word:</label>\n        <input class=\"input\" type=\"text\" name=\"word\" id=\"word\" value=\"").concat(storedWord, "\" />\n        <button class=\"button\" type=\"submit\">Update Word</button>\n      </form>\n    </div>\n  ");
  rootEl.innerHTML = html;
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchStoredWord: () => (/* binding */ fetchStoredWord),
/* harmony export */   loginUser: () => (/* binding */ loginUser),
/* harmony export */   logoutUser: () => (/* binding */ logoutUser),
/* harmony export */   updateWord: () => (/* binding */ updateWord)
/* harmony export */ });
/* harmony import */ var _fetchService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchService */ "./src/fetchService.js");

function fetchSession() {
  return (0,_fetchService__WEBPACK_IMPORTED_MODULE_0__.fetchService)('/api/session');
}
function loginUser(username) {
  return (0,_fetchService__WEBPACK_IMPORTED_MODULE_0__.fetchService)('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  });
}
function logoutUser() {
  return (0,_fetchService__WEBPACK_IMPORTED_MODULE_0__.fetchService)('/api/session', {
    method: 'DELETE'
  });
}
function fetchStoredWord() {
  return (0,_fetchService__WEBPACK_IMPORTED_MODULE_0__.fetchService)('/api/word');
}
function updateWord(word) {
  return (0,_fetchService__WEBPACK_IMPORTED_MODULE_0__.fetchService)('/api/word', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changePage: () => (/* binding */ changePage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   resetState: () => (/* binding */ resetState),
/* harmony export */   updateError: () => (/* binding */ updateError),
/* harmony export */   updateStoredWord: () => (/* binding */ updateStoredWord),
/* harmony export */   updateUsername: () => (/* binding */ updateUsername)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  username: '',
  storedWord: '',
  error: '',
  page: _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.LOGIN
};
var updateUsername = function updateUsername(username) {
  state.username = username;
};
var updateStoredWord = function updateStoredWord(word) {
  state.storedWord = word;
};
var updateError = function updateError(error) {
  state.error = error;
};
var changePage = function changePage(page) {
  state.page = page;
};
var resetState = function resetState() {
  state.username = '';
  state.storedWord = '';
  state.error = '';
  state.page = _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.LOGIN;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./messages */ "./src/messages.js");





var rootEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
rootEl.addEventListener('click', function (e) {
  if (e.target.id === 'logout-btn') {
    handleLogout();
    return;
  }
});
rootEl.addEventListener('submit', function (e) {
  e.preventDefault();
  if (e.target.id === 'login-form') {
    var username = e.target.elements['username'].value.trim();
    handleLogin(username);
    return;
  }
  if (e.target.id === 'word-form') {
    var word = e.target.elements['word'].value.trim();
    handleUpdateStoredWord(word);
    return;
  }
});
function handleLogin(username) {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.loginUser)(username).then(function (data) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateUsername)(data.username);
    return handleFetchStoredWord();
  })["catch"](function (err) {
    var errorMsg = _messages__WEBPACK_IMPORTED_MODULE_4__.MESSAGES[err.error] || _messages__WEBPACK_IMPORTED_MODULE_4__.MESSAGES["default"];
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateError)(errorMsg);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  });
}
function handleLogout() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.logoutUser)().then(function () {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.resetState)();
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.changePage)(_constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.LOGIN);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  })["catch"](function (err) {
    var errorMsg = _messages__WEBPACK_IMPORTED_MODULE_4__.MESSAGES[err.error] || _messages__WEBPACK_IMPORTED_MODULE_4__.MESSAGES["default"];
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateError)(errorMsg);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  });
}
function handleFetchStoredWord() {
  return (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchStoredWord)().then(function (data) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateStoredWord)(data.storedWord);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateError)('');
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.changePage)(_constants__WEBPACK_IMPORTED_MODULE_3__.PAGES.WORD_VIEW);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  })["catch"](function (err) {
    var errorMsg = _messages__WEBPACK_IMPORTED_MODULE_4__.MESSAGES[err.error] || _messages__WEBPACK_IMPORTED_MODULE_4__.MESSAGES["default"];
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateError)(errorMsg);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  });
}
function handleUpdateStoredWord(word) {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.updateWord)(word).then(function (data) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateStoredWord)(data.storedWord);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateError)('');
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  })["catch"](function (err) {
    var errorMsg = _messages__WEBPACK_IMPORTED_MODULE_4__.MESSAGES[err.error] || _messages__WEBPACK_IMPORTED_MODULE_4__.MESSAGES["default"];
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateError)(errorMsg);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  });
}
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(function (data) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateUsername)(data.username);
    return handleFetchStoredWord();
  })["catch"](function () {
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  });
}
checkForSession();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map