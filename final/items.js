import { randomUUID as uuid } from 'crypto';

function makeItemsManager() {
  const items = {};

  const itemsManager = {};

  itemsManager.addItem = function addItem({ title, description, price, phoneNumber, seller }) {
    const id = uuid();
    items[id] = {
      id,
      title,
      description,
      price,
      phoneNumber,
      seller,
      sold: false,
    };
    return items[id];
  };

  itemsManager.getItems = function getItems() {
    return Object.values(items);
  };

  itemsManager.getItem = function getItem(id) {
    return items[id] || null;
  };

  itemsManager.updateItem = function updateItem(id, { title, description, price, sold, phoneNumber }) {
    const item = items[id];
    if (!item) return null;

    if (title !== undefined) item.title = title;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;
    if (sold !== undefined) item.sold = sold;
    if (phoneNumber !== undefined) item.phoneNumber = phoneNumber;

    return item;
  };

  itemsManager.deleteItem = function deleteItem(id) {
    if (items[id]) {
      delete items[id];
      return true;
    }
    return false;
  };

  return itemsManager;
}

export default {
  makeItemsManager,
};
