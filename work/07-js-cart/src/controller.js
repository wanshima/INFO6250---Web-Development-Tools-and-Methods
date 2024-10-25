import { PAGES } from './constants';
import state, {
  addToCart,
  updateCartQuantity,
  clearCart,
  changePage,
} from './state';
import render from './render';

function setupEventListeners(appEl) {
  appEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = e.target.dataset.id;
      addToCart(productId);
      render(state, appEl);
    }

    if (e.target.classList.contains('view-cart')) {
      changePage(PAGES.CART);
      render(state, appEl);
    }

    if (e.target.classList.contains('hide-cart')) {
      const page = e.target.dataset.target;
      changePage(page);
      render(state, appEl);
    }

    if (e.target.classList.contains('checkout')) {
      clearCart();
      changePage(PAGES.PRODUCT);
      render(state, appEl);
    }

    if (e.target.classList.contains('delete-item')) {
      const productId = e.target.dataset.id;
      updateCartQuantity(productId, 0);
      render(state, appEl);
    }
  });

  appEl.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      const productId = e.target.dataset.id;
      const quantity = parseInt(e.target.value, 10);
      updateCartQuantity(productId, quantity);
      render(state, appEl);
    }
  });
}

export default setupEventListeners;
