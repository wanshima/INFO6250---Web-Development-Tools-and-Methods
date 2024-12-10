import { useState, useEffect } from 'react';
import './App.css';

function Item({ item, isLastAdded, onDeleteItem, onUpdateItem, isLoggedIn }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title || '');
  const [editedDescription, setEditedDescription] = useState(item.description || '');
  const [editedPrice, setEditedPrice] = useState(item.price !== undefined ? item.price : '');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(item.phoneNumber || '');
  const [editError, setEditError] = useState('');

  useEffect(() => {
    setEditedTitle(item.title || '');
    setEditedDescription(item.description || '');
    setEditedPrice(item.price !== undefined ? item.price : '');
    setEditedPhoneNumber(item.phoneNumber || '');
  }, [item]);

  const handleDelete = () => {
    onDeleteItem(item.id);
  };

  const handleToggle = () => {
    onUpdateItem(item.id, { sold: !item.sold });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditError('');
    setEditedTitle(item.title || '');
    setEditedDescription(item.description || '');
    setEditedPrice(item.price !== undefined ? item.price : '');
    setEditedPhoneNumber(item.phoneNumber || '');
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!editedTitle.trim() || !editedDescription.trim()) {
      setEditError('Title and Description cannot be empty.');
      return;
    }
    const priceNumber = parseFloat(editedPrice);
    if (isNaN(priceNumber) || priceNumber < 0) {
      setEditError('Price must be a positive number.');
      return;
    }
    if (!/^\d+$/.test(editedPhoneNumber.trim())) {
      setEditError('Phone number must contain only digits.');
      return;
    }

    onUpdateItem(item.id, {
      title: editedTitle.trim(),
      description: editedDescription.trim(),
      price: priceNumber,
      phoneNumber: editedPhoneNumber.trim(),
    })
      .then(() => {
        setIsEditing(false);
        setEditError('');
      })
      .catch(() => {
        setEditError('Failed to update the item.');
      });
  };

  return (
    <div className={`item-container ${isLastAdded ? 'item-new' : ''}`}>
      {item.isOwner ? (
        <input
          type="checkbox"
          checked={item.sold}
          onChange={handleToggle}
          className="item-checkbox"
        />
      ) : (
        <input
          type="checkbox"
          checked={item.sold}
          disabled
          className="item-checkbox"
        />
      )}

      <div className={`item-title ${item.sold ? 'item-sold' : ''}`}>
        <strong>{item.title}</strong>
        {item.price !== undefined && (
          <>
            {' - $'}
            {item.price.toFixed(2)}
          </>
        )}
        {isLoggedIn && item.description && (
          <>
            {' - '}
            {item.description}
          </>
        )}
        {isLoggedIn && item.phoneNumber && (
          <>
            {' - Contact: '}
            {item.phoneNumber}
          </>
        )}
        {item.isOwner && isLoggedIn && item.seller && (
          <>
            {' - (Seller: '}
            {item.seller}
            {')'}
          </>
        )}
      </div>

      {item.isOwner && isLoggedIn && (
        <div className="item-buttons">
          <button onClick={handleDelete} className="item-delete-button">Delete</button>
          <button onClick={handleEdit} className="item-edit-button">Edit</button>
        </div>
      )}

      {isEditing && item.isOwner && isLoggedIn && (
        <form onSubmit={handleSubmitEdit} className="edit-item-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            placeholder="Price"
            min="0"
            step="0.01"
          />
          <input
            type="text"
            value={editedPhoneNumber}
            onChange={(e) => setEditedPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          {editError && <div className="error">{editError}</div>}
          <div className="edit-buttons">
            <button type="submit" className="save-button">Save</button>
            <button type="button" onClick={handleCancelEdit} className="cancel-button">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Item;
