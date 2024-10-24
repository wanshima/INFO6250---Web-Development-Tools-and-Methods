import { PAGES } from './constants';

function render(state, appEl) {
  renderProductPage(state, appEl);

  if (state.page === PAGES.CART) {
    renderCart(state, appEl);
  } else {
    renderViewCartButton(state, appEl);
  }
}

function renderProductPage(state, appEl) {
  const productsHtml = state.products.map((product) => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name} - $${product.price.toFixed(2)}</h3>
      <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
    </div>
  `).join('');

  appEl.innerHTML = `
    <div class="products">
      ${productsHtml}
    </div>
  `;
}

function renderViewCartButton(state, appEl) {
  const totalItems = Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
  const buttonText = totalItems > 0 ? `View Cart (${totalItems})` : 'View Cart';

  const buttonHtml = `<button class="view-cart">${buttonText}</button>`;
  appEl.innerHTML += buttonHtml;
}

function renderCart(state, appEl) {
  const cartItems = Object.entries(state.cart).map(([productId, quantity]) => {
    const product = state.products.find(p => p.id == productId);
    return { product, quantity };
  });

  let cartContent = '';
  if (cartItems.length === 0) {
    cartContent = '<p>Nothing in the cart</p>';
  } else {
    cartContent = cartItems.map(({ product, quantity }) => `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" width="50">
        <span>${product.name}</span>
        <input type="number" min="0" value="${quantity}" data-id="${product.id}" class="quantity-input">
        <span>Total: $${(product.price * quantity).toFixed(2)}</span>
        <button data-id="${product.id}" class="delete-item">Delete</button>
      </div>
    `).join('');
  }

  const totalPrice = cartItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0).toFixed(2);

  const cartHtml = `
    <div class="cart" style="background-color: #f9f9f9; padding: 10px; margin-top: 20px;">
      <h2>Cart</h2>
      ${cartContent}
      <p>Total Price: $${totalPrice}</p>
      <button class="checkout">Checkout</button>
      <button class="hide-cart" data-target="${PAGES.PRODUCT}">Hide Cart</button>
    </div>
  `;

  appEl.innerHTML += cartHtml;
}

export default render;
