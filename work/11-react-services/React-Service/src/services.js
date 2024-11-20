export function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => Promise.reject(err));
    });
}

export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => Promise.reject(err));
    });
}

export function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => Promise.reject(err));
    });
}

export function fetchStoredWord() {
  return fetch('/api/v1/word', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => Promise.reject(err));
    });
}

export function fetchUpdateStoredWord(word) {
  return fetch('/api/v1/word', {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ word }),
  })
    .catch(() => Promise.reject({ error: 'networkError' }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => Promise.reject(err));
    });
}
