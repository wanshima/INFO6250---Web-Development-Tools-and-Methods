import Item from './Item.jsx';
import Loading from './Loading.jsx';
import './App.css';

function Items({ isItemPending, items, lastAddedItemId, onDeleteItem, onUpdateItem, isLoggedIn }) {
  if (isItemPending) {
    return <Loading className="items__loading">Loading items...</Loading>;
  }

  if (items.length === 0) {
    return <p>No items available. Add one!</p>;
  }

  return (
    <div className="items-section">
      <h2 className="items-header">Items on Sale</h2>
      <ul className="items">
        {items.map(item => (
          <li key={item.id} className="item">
            <Item
              item={item}
              isLastAdded={lastAddedItemId === item.id}
              onDeleteItem={onDeleteItem}
              onUpdateItem={onUpdateItem}
              isLoggedIn={isLoggedIn}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
