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
  PRODUCT: 'product',
  CART: 'cart'
};

/***/ }),

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



function setupEventListeners(appEl) {
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
      var productId = e.target.dataset.id;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.addToCart)(productId);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"], appEl);
    }
    if (e.target.classList.contains('view-cart')) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.changePage)(_constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.CART);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"], appEl);
    }
    if (e.target.classList.contains('hide-cart')) {
      var page = e.target.dataset.target;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.changePage)(page);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"], appEl);
    }
    if (e.target.classList.contains('checkout')) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.clearCart)();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.changePage)(_constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCT);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"], appEl);
    }
    if (e.target.classList.contains('delete-item')) {
      var _productId = e.target.dataset.id;
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateCartQuantity)(_productId, 0);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"], appEl);
    }
  });
  appEl.addEventListener('input', function (e) {
    if (e.target.classList.contains('quantity-input')) {
      var productId = e.target.dataset.id;
      var quantity = parseInt(e.target.value, 10);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateCartQuantity)(productId, quantity);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_1__["default"], appEl);
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupEventListeners);

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

function render(state, appEl) {
  renderProductPage(state, appEl);
  if (state.page === _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.CART) {
    renderCart(state, appEl);
  } else {
    renderViewCartButton(state, appEl);
  }
}
function renderProductPage(state, appEl) {
  var productsHtml = state.products.map(function (product) {
    return "\n    <div class=\"product\">\n      <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n      <h3>").concat(product.name, " - $").concat(product.price.toFixed(2), "</h3>\n      <button data-id=\"").concat(product.id, "\" class=\"add-to-cart\">Add to Cart</button>\n    </div>\n  ");
  }).join('');
  appEl.innerHTML = "\n    <div class=\"products\">\n      ".concat(productsHtml, "\n    </div>\n  ");
}
function renderViewCartButton(state, appEl) {
  var totalItems = Object.values(state.cart).reduce(function (sum, qty) {
    return sum + qty;
  }, 0);
  var buttonText = totalItems > 0 ? "View Cart (".concat(totalItems, ")") : 'View Cart';
  var buttonHtml = "<button class=\"view-cart\">".concat(buttonText, "</button>");
  appEl.innerHTML += buttonHtml;
}
function renderCart(state, appEl) {
  var cartItems = Object.entries(state.cart).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      productId = _ref2[0],
      quantity = _ref2[1];
    var product = state.products.find(function (p) {
      return p.id == productId;
    });
    return {
      product: product,
      quantity: quantity
    };
  });
  var cartContent = '';
  if (cartItems.length === 0) {
    cartContent = '<p>Nothing in the cart</p>';
  } else {
    cartContent = cartItems.map(function (_ref3) {
      var product = _ref3.product,
        quantity = _ref3.quantity;
      return "\n      <div class=\"cart-item\">\n        <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\" width=\"50\">\n        <span>").concat(product.name, "</span>\n        <input type=\"number\" min=\"0\" value=\"").concat(quantity, "\" data-id=\"").concat(product.id, "\" class=\"quantity-input\">\n        <span>Total: $").concat((product.price * quantity).toFixed(2), "</span>\n        <button data-id=\"").concat(product.id, "\" class=\"delete-item\">Delete</button>\n      </div>\n    ");
    }).join('');
  }
  var totalPrice = cartItems.reduce(function (sum, _ref4) {
    var product = _ref4.product,
      quantity = _ref4.quantity;
    return sum + product.price * quantity;
  }, 0).toFixed(2);
  var cartHtml = "\n    <div class=\"cart\" style=\"background-color: #f9f9f9; padding: 10px; margin-top: 20px;\">\n      <h2>Cart</h2>\n      ".concat(cartContent, "\n      <p>Total Price: $").concat(totalPrice, "</p>\n      <button class=\"checkout\">Checkout</button>\n      <button class=\"hide-cart\" data-target=\"").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCT, "\">Hide Cart</button>\n    </div>\n  ");
  appEl.innerHTML += cartHtml;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   changePage: () => (/* binding */ changePage),
/* harmony export */   clearCart: () => (/* binding */ clearCart),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   updateCartQuantity: () => (/* binding */ updateCartQuantity)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  products: [{
    id: 1,
    name: 'Jorts',
    price: 0.99,
    image: 'http://placehold.co/150x150?text=Jorts'
  }, {
    id: 2,
    name: 'Jean',
    price: 3.14,
    image: 'http://placehold.co/150x150?text=Jean'
  }, {
    id: 3,
    name: 'Nyancat',
    price: 2.73,
    image: 'http://placehold.co/150x150?text=Nyancat'
  }],
  cart: {},
  page: _constants__WEBPACK_IMPORTED_MODULE_0__.PAGES.PRODUCT
};
var addToCart = function addToCart(productId) {
  if (state.cart[productId]) {
    state.cart[productId] += 1;
  } else {
    state.cart[productId] = 1;
  }
};
var updateCartQuantity = function updateCartQuantity(productId, quantity) {
  if (quantity > 0) {
    state.cart[productId] = quantity;
  } else {
    delete state.cart[productId];
  }
};
var clearCart = function clearCart() {
  state.cart = {};
};
var changePage = function changePage(page) {
  state.page = page;
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
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller */ "./src/controller.js");



var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
(0,_controller__WEBPACK_IMPORTED_MODULE_2__["default"])(appEl);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map