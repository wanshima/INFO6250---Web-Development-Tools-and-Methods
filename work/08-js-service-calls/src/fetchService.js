export function fetchService(url, options = {}) {
  return fetch(url, options)
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}