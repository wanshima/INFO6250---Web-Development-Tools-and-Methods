import { useState } from 'react';
import './App.css'; 

function AddItemForm({ onAddItem }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and Description cannot be empty.');
      return;
    }
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      setError('Price must be a positive number.');
      return;
    }
    if (!/^\d+$/.test(phoneNumber.trim())) {
      setError('Phone number must contain only digits.');
      return;
    }
    
    onAddItem({
      title: title.trim(),
      description: description.trim(),
      price: priceNumber,
      phoneNumber: phoneNumber.trim(),
    });

    setTitle('');
    setDescription('');
    setPrice('');
    setPhoneNumber('');
  }


  return (
    <div className="add-item">
      <h3 className="add-item-title">Add New Item</h3>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="add-item-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="add-item-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        ></textarea>
        <input
          type="number"
          className="add-item-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          min="0"
          step="0.01"
        />
        <input
          type="text"
          className="add-item-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" className="add-item-button">Add Item</button>
      </form>
    </div>
  );
}

export default AddItemForm;
