import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from './sessions.js';
import users from './users.js';
import itemsFactory from './items.js'; 

const itemsModule = itemsFactory.makeItemsManager(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username.toLowerCase() === 'dog') { 
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  res.cookie('sid', sid);
  res.json({ 
    username,
  });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    sessions.deleteSession(sid);
    res.clearCookie('sid');
  }

  res.json({ message: 'Logged out successfully.' });
});

app.get('/api/v1/items', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  const allItems = itemsModule.getItems();

  if (!sid || !users.isValid(username)) {
    const publicItems = allItems.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price, 
    }));
    res.json(publicItems);
    return;
  }

  res.json(allItems);
});

app.post('/api/v1/items', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { title, description, price, phoneNumber } = req.body;
  if (!title || !description || typeof price !== 'number' || price < 0 || !/^\d+$/.test(phoneNumber.trim())) {
    res.status(400).json({ error: 'invalid-item-data' });
    return;
  }

  const newItem = itemsModule.addItem({
    title: title.trim(),
    description: description.trim(),
    price,
    phoneNumber: phoneNumber.trim(),
    seller: username,
  });
  res.status(201).json(newItem);
});

app.put('/api/v1/items/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const { title, description, price, sold, phoneNumber } = req.body;

  if (
    (title !== undefined && typeof title !== 'string') ||
    (description !== undefined && typeof description !== 'string') ||
    (price !== undefined && (typeof price !== 'number' || price < 0)) ||
    (sold !== undefined && typeof sold !== 'boolean') ||
    (phoneNumber !== undefined && !/^\d+$/.test(phoneNumber.trim()))
  ) {
    res.status(400).json({ error: 'invalid-item-data' });
    return;
  }

  const item = itemsModule.getItem(id);
  if (!item) {
    res.status(404).json({ error: 'noSuchId' });
    return;
  }

  if (item.seller !== username) {
    res.status(403).json({ error: 'unauthorized' });
    return;
  }

  const updatedItem = itemsModule.updateItem(id, {
    title: title ? title.trim() : undefined,
    description: description ? description.trim() : undefined,
    price: price !== undefined ? price : undefined,
    sold: sold !== undefined ? sold : undefined,
    phoneNumber: phoneNumber ? phoneNumber.trim() : undefined, 
  });

  if (!updatedItem) {
    res.status(500).json({ error: 'update-failed' });
    return;
  }

  res.json(updatedItem);
});

app.delete('/api/v1/items/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const item = itemsModule.getItem(id);
  if (!item) {
    res.status(404).json({ error: 'noSuchId' });
    return;
  }

  if (item.seller !== username) {
    res.status(403).json({ error: 'unauthorized' });
    return;
  }

  const deleted = itemsModule.deleteItem(id);

  if (!deleted) {
    res.status(500).json({ error: 'delete-failed' });
    return;
  }

  res.json({ message: 'Item deleted successfully.' });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
