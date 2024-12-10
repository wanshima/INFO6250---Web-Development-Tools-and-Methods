export function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET',
  })
  .catch(() => Promise.reject({ error: 'networkError' }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch(error => Promise.reject({ error }))
      .then(err => Promise.reject(err));
  });
}  

export function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',     
    },
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchItems() {
  return fetch('/api/v1/items', {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchAddItem(itemData) {
  return fetch('/api/v1/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchUpdateItem(id, updatedData) {
  return fetch(`/api/v1/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
  .catch(() => Promise.reject({ error: 'networkError' }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
      .catch(() => Promise.reject({ error: 'update-failed' }))
      .then(err => Promise.reject(err));
  });
}

export function fetchDeleteItem(id) {
  return fetch(`/api/v1/items/${id}`, { 
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}
