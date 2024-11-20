export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_WORD: 'required-word',
  INVALID_USERNAME: 'invalid-username',
  INVALID_WORD: 'invalid-word',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    'Trouble connecting to the network. Please try again.',
  [SERVER.AUTH_INSUFFICIENT]:
    'Your username is disallowed. Please try a different username.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username.',
  [SERVER.REQUIRED_WORD]: 'Please enter a valid word.',
  [SERVER.INVALID_USERNAME]: 'Username must be alphanumeric.',
  [SERVER.INVALID_WORD]: 'Word must be alphanumeric.',
  default: 'Something went wrong. Please try again.',
};
