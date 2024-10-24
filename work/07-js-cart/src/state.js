import { PAGES } from './constants';

const state = {
  products: [
    { id: 1, name: 'Jorts', price: 0.99, image: 'http://placehold.co/150x150?text=Jorts' },
    { id: 2, name: 'Jean', price: 3.14, image: 'http://placehold.co/150x150?text=Jean' },
    { id: 3, name: 'Nyancat', price: 2.73, image: 'http://placehold.co/150x150?text=Nyancat' },
  ],
  cart: {},
  page: PAGES.PRODUCT,
};

export const addToCart = function(productId) {
  if (state.cart[productId]) {
    state.cart[productId] += 1;
  } else {
    state.cart[productId] = 1;
  }
};

export const updateCartQuantity = function(productId, quantity) {
  if (quantity > 0) {
    state.cart[productId] = quantity;
  } else {
    delete state.cart[productId];
  }
};

export const clearCart = function() {
  state.cart = {};
};

export const changePage = function(page) {
  state.page = page;
};

export default state;
