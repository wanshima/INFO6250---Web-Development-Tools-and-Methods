import { useEffect, useReducer } from 'react';
import reducer, { initialState } from './reducer.js';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
} from './constants.js';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchItems,
  fetchAddItem,
  fetchDeleteItem,
  fetchUpdateItem,
} from './services.js';
import LoginForm from './LoginForm.jsx';
import Items from './Items.jsx';
import Loading from './Loading.jsx';
import Controls from './Controls.jsx';
import Status from './Status.jsx';
import AddItemForm from './AddItemForm.jsx';
import './App.css';

function assignOwnership(items, username) {
  return items.map(item => ({
    ...item,
    isOwner: item.seller === username,
  }));
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin(username) {
    dispatch({ type: ACTIONS.START_LOGIN });
    fetchLogin(username)
      .then(response => {
        if (response.username) {
          dispatch({ type: ACTIONS.LOG_IN, username: response.username });
          return fetchItems();
        } else {
          throw new Error('unexpected-response');
        }
      })
      .then(allItems => {
        const itemsWithOwner = assignOwnership(allItems, username);
        dispatch({ type: ACTIONS.REPLACE_ITEMS, items: itemsWithOwner });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error || 'login-failed' });
      });
  }

  function onLogout() {
    fetchLogout()
      .then(() => {
        dispatch({ type: ACTIONS.LOG_OUT });
        onRefresh(); 
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error || 'logout-failed' });
      });
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_ITEMS });
    fetchItems()
      .then(allItems => {
        const itemsWithOwner = assignOwnership(allItems, state.username);
        dispatch({ type: ACTIONS.REPLACE_ITEMS, items: itemsWithOwner });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error || 'fetch-items-failed' });
      });
  }

  function onDeleteItem(id) {
    dispatch({ type: ACTIONS.DELETE_ITEM, id });
    fetchDeleteItem(id)
      .then(() => {
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error || 'delete-failed' });
        onRefresh();
      });
  }

  function onUpdateItem(id, updatedData) {
    return fetchUpdateItem(id, updatedData) 
      .then(updatedItem => {
        const itemWithOwner = { 
          ...updatedItem, 
          isOwner: updatedItem.seller === state.username,
        };
        dispatch({ type: ACTIONS.UPDATE_ITEM, item: itemWithOwner });
        return updatedItem; 
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error || 'update-failed' });
      });
  }
  
  function onAddItem(itemData) {
    return fetchAddItem(itemData)
      .then(newItem => {
        const itemWithOwner = { 
          ...newItem, 
          isOwner: newItem.seller === state.username,
        };
        dispatch({ type: ACTIONS.ADD_ITEM, item: itemWithOwner });
        return newItem; 
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error || 'add-failed' });
      });
  }

  function checkForSession() {
    fetchSession()
      .then(session => {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return fetchItems();
      })
      .then(allItems => {
        const itemsWithOwner = assignOwnership(allItems, state.username);
        dispatch({ type: ACTIONS.REPLACE_ITEMS, items: itemsWithOwner });
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
        } else {
          dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error || CLIENT.NO_SESSION });
        }
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      <main className="main">
        {state.error && <Status error={state.error} />}
        {(state.loginStatus === LOGIN_STATUS.PENDING || state.isLoginPending) && (<Loading message="Logging you in..." />)}
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <p>Hello, {state.username}</p>
            <Controls onLogout={onLogout} onRefresh={onRefresh} />
            <AddItemForm onAddItem={onAddItem} />
          </div>
        )}
        
        <Items
          isItemPending={state.isItemPending}
          items={state.items}
          lastAddedItemId={state.lastAddedItemId}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
          isLoggedIn={state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN}
        />
      </main>
    </div>
  );
}

export default App;
