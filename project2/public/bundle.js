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
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  INVALID_USERNAME: 'invalid-username',
  FORBIDDEN_USERNAME: 'forbidden-username',
  EMPTY_MESSAGE: 'empty-message'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network. Please try again.'), SERVER.AUTH_MISSING, 'You must be logged in to perform this action.'), SERVER.AUTH_INSUFFICIENT, 'Your username is not permitted.'), SERVER.INVALID_USERNAME, 'Please enter a valid username (letters and/or numbers).'), SERVER.FORBIDDEN_USERNAME, 'This username is not allowed.'), SERVER.EMPTY_MESSAGE, 'Cannot send an empty message.'), "default", 'Something went wrong. Please try again.');

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addEventListeners: () => (/* binding */ addEventListeners),
/* harmony export */   startPolling: () => (/* binding */ startPolling)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



function addEventListeners(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('login__form')) {
      var username = e.target.elements['username'].value.trim();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderApp)({
        state: state,
        appEl: appEl
      });
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function () {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderApp)({
          state: state,
          appEl: appEl
        });
        startPolling({
          state: state,
          appEl: appEl
        });
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderApp)({
          state: state,
          appEl: appEl
        });
      });
    }
    if (e.target.classList.contains('message-form')) {
      var text = e.target.elements['message'].value.trim();
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.sendMessage)(text).then(function () {
        e.target.reset();
        return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)(state.lastMessageId);
      }).then(function (newMessages) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(newMessages);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderMessagesAndUsers)(state);
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderApp)({
          state: state,
          appEl: appEl
        });
      });
    }
  });
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('controls__logout-button')) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderApp)({
        state: state,
        appEl: appEl
      });
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderApp)({
          state: state,
          appEl: appEl
        });
      });
    }
  });
  appEl.addEventListener('input', function (e) {
    if (e.target.classList.contains('login__username')) {
      state.username = e.target.value;
    }
  });
}
function startPolling(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  function poll() {
    if (!state.isLoggedIn) {
      return;
    }
    Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)(state.lastMessageId), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)()]).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        newMessages = _ref4[0],
        users = _ref4[1];
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(newMessages);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(users);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderMessagesAndUsers)(state);
      setTimeout(poll, 5000);
    })["catch"](function (err) {
      if (err.error === 'auth-missing') {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderApp)({
          state: state,
          appEl: appEl
        });
      } else {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
        setTimeout(poll, 5000);
      }
    });
  }
  poll();
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderApp: () => (/* binding */ renderApp),
/* harmony export */   renderMessagesAndUsers: () => (/* binding */ renderMessagesAndUsers)
/* harmony export */ });
function renderApp(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    <main>\n      ".concat(generateStatusHtml(state), "\n      ").concat(generateLoginHtml(state), "\n      ").concat(generateChatContainer(state), "\n    </main>\n  ");
  appEl.innerHTML = html;
  if (state.isLoggedIn) {
    renderMessagesAndUsers(state);
  }
}
function generateLoginHtml(state) {
  if (state.isCheckingSession) {
    return "\n      <div class=\"login__waiting\">Checking session...</div>\n    ";
  }
  if (state.isLoginPending) {
    return "\n      <div class=\"login__waiting\">Loading user...</div>\n    ";
  }
  if (state.isLoggedIn) {
    return "";
  }
  var usernameValue = state.username || '';
  return "\n    <div class=\"login\">\n      <form class=\"login__form\">\n        <label>\n          <span>Username:</span>\n          <input class=\"login__username\" name=\"username\" required value=\"".concat(usernameValue, "\">\n        </label>\n        <button type=\"submit\" class=\"login__button\">Login</button>\n      </form>\n    </div>\n  ");
}
function renderMessagesAndUsers(state) {
  var usersContainer = document.querySelector('.users-list-container');
  var messagesContainer = document.querySelector('.messages-container');
  if (usersContainer) {
    usersContainer.innerHTML = generateUsersHtml(state);
  }
  if (messagesContainer) {
    messagesContainer.innerHTML = generateMessagesHtml(state);
    scrollMessagesToBottom();
  }
}
function generateStatusHtml(state) {
  return "\n    <div class=\"status\">".concat(state.error, "</div>\n  ");
}
function generateChatContainer(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n    <div class=\"chat\">\n      ".concat(generateControlsHtml(), "\n      <div class=\"chat-content\">\n        <div class=\"users-list-container\">\n          <!-- Users will be rendered here -->\n        </div>\n        <div class=\"messages-container\">\n          <!-- Messages will be rendered here -->\n        </div>\n      </div>\n      ").concat(generateMessageInputHtml(), "\n    </div>\n  ");
}
function generateControlsHtml() {
  return "\n    <div class=\"controls\">\n      <button class=\"controls__logout-button\">Logout</button>\n    </div>\n  ";
}
function generateUsersHtml(state) {
  var usersHtml = state.users.map(function (user) {
    return "<li>".concat(user, "</li>");
  }).join('');
  return "\n    <div class=\"users-list\">\n      <h3>Active Users</h3>\n      <ul>\n        ".concat(usersHtml, "\n      </ul>\n    </div>\n  ");
}
function generateMessagesHtml(state) {
  if (state.isLoadingMessages) {
    return "<div class=\"messages__waiting\">Loading messages...</div>";
  }
  var messagesHtml = state.messages.map(function (message) {
    return "\n    <div class=\"message\">\n      <span class=\"username\">".concat(message.username, ":</span> ").concat(message.text, "\n    </div>\n  ");
  }).join('');
  return "\n    <div class=\"messages-list\">\n      ".concat(messagesHtml, "\n    </div>\n  ");
}
function generateMessageInputHtml() {
  return "\n    <form class=\"message-form\">\n      <input class=\"message-input\" name=\"message\" placeholder=\"Type a message\" required>\n      <button type=\"submit\" class=\"message-form__button\">Send</button>\n    </form>\n  ";
}
function scrollMessagesToBottom() {
  var messagesContainer = document.querySelector('.messages-container');
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}


/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers),
/* harmony export */   sendMessage: () => (/* binding */ sendMessage)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  var lastMessageId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var params = new URLSearchParams({
    lastMessageId: lastMessageId
  });
  return fetch("/api/v1/messages?".concat(params.toString()), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function sendMessage(text) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      text: text
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUsers() {
  return fetch('/api/v1/users', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
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
/* harmony export */   addMessage: () => (/* binding */ addMessage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   setUsers: () => (/* binding */ setUsers),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin),
/* harmony export */   waitOnMessages: () => (/* binding */ waitOnMessages)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var state = {
  messages: [],
  users: [],
  isLoggedIn: false,
  isLoginPending: false,
  isCheckingSession: true,
  username: '',
  error: '',
  isLoadingMessages: false,
  lastMessageId: 0
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = [];
  state.users = [];
  state.error = '';
  state.lastMessageId = 0;
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.users = [];
  state.error = '';
  state.lastMessageId = 0;
}
function waitOnMessages() {
  state.isLoadingMessages = true;
  state.error = '';
}
function setMessages(newMessages) {
  if (Array.isArray(newMessages) && newMessages.length > 0) {
    state.messages = [].concat(_toConsumableArray(state.messages), _toConsumableArray(newMessages));
    var latestMessage = newMessages[newMessages.length - 1];
    state.lastMessageId = latestMessage.id;
  }
  state.isLoadingMessages = false;
  state.error = '';
}
function setUsers(users) {
  state.users = users;
  state.error = '';
}
function addMessage(message) {
  state.messages.push(message);
  state.error = '';
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.isLoginPending = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services */ "./src/services.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var appEl = document.getElementById('app');
(0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addEventListeners)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchSession)().then(function (session) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].isCheckingSession = false;
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].lastMessageId = session.latestMessageId;
    return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchMessages)(_state__WEBPACK_IMPORTED_MODULE_0__["default"].lastMessageId), (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchUsers)()]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      newMessages = _ref2[0],
      users = _ref2[1];
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setMessages)(newMessages);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setUsers)(users);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMessagesAndUsers)(_state__WEBPACK_IMPORTED_MODULE_0__["default"]);
    (0,_listeners__WEBPACK_IMPORTED_MODULE_2__.startPolling)({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].isCheckingSession = false;
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
    if (err.error !== 'auth-missing') {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)(err.error || 'networkError');
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderApp)({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  });
}
checkForSession();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map