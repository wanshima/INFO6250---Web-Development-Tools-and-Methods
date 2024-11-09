export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  INVALID_USERNAME: 'invalid-username',
  FORBIDDEN_USERNAME: 'forbidden-username',
  EMPTY_MESSAGE: 'empty-message',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again.',
  [SERVER.AUTH_MISSING]: 'You must be logged in to perform this action.',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username is not permitted.',
  [SERVER.INVALID_USERNAME]: 'Please enter a valid username (letters and/or numbers).',
  [SERVER.FORBIDDEN_USERNAME]: 'This username is not allowed.',
  [SERVER.EMPTY_MESSAGE]: 'Cannot send an empty message.',
  default: 'Something went wrong. Please try again.',
};
