import { fetchService } from './fetchService';

export function fetchSession() {
  return fetchService('/api/session');
}

export function loginUser(username) {
  return fetchService('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
}

export function logoutUser() {
  return fetchService('/api/session', {
    method: 'DELETE',
  });
}

export function fetchStoredWord() {
  return fetchService('/api/word');
}

export function updateWord(word) {
  return fetchService('/api/word', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word }),
  });
}

