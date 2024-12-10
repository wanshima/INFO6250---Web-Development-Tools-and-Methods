export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  INVALID_ITEM_DATA: 'invalid-item-data',
  NO_SUCH_ID: 'noSuchId',
  UNAUTHORIZED: 'unauthorized',
  UPDATE_FAILED: 'update-failed',
  DELETE_FAILED: 'delete-failed',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again.',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username is insufficient for authentication.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username (letters, numbers, and underscores only).',
  [SERVER.INVALID_ITEM_DATA]: 'Invalid item data. Please ensure all fields are correctly filled.',
  [SERVER.NO_SUCH_ID]: 'The requested item does not exist.',
  [SERVER.UNAUTHORIZED]: 'You are not authorized to perform this action.',
  [SERVER.UPDATE_FAILED]: 'Failed to update the item. Please try again.',
  [SERVER.DELETE_FAILED]: 'Failed to delete the item. Please try again.',
  default: 'Something went wrong. Please try again.',
};

export const ACTIONS = {
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
  START_LOADING_ITEMS: 'startLoadingItems',
  START_LOGIN: 'startLogin', 
  REPLACE_ITEMS: 'replaceItems',
  REPORT_ERROR: 'reportError',
  ADD_ITEM: 'addItem',
  UPDATE_ITEM: 'updateItem',
  DELETE_ITEM: 'deleteItem',
};