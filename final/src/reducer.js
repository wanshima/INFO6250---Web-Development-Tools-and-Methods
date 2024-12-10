import { LOGIN_STATUS, ACTIONS, CLIENT } from './constants';

export const initialState = {
  error: '',
  username: '',
  loginStatus: LOGIN_STATUS.PENDING,
  isItemPending: false,
  isLoginPending: false,
  items: [],
  lastAddedItemId: '',
};

function reducer(state, action) {
  switch(action.type) {

    case ACTIONS.START_LOGIN:
      return {
        ...state,
        isLoginPending: true,
        error: '',
      };

    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: '',
        username: action.username,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        isLoginPending: false,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        username: '',
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        items: [],
        lastAddedItemId: '',
      };

    case ACTIONS.START_LOADING_ITEMS:
      return {
        ...state,
        isItemPending: true,
        error: '',
      };

    case ACTIONS.REPLACE_ITEMS:
      return {
        ...state,
        items: action.items,
        isItemPending: false,
        lastAddedItemId: '',
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error,
        isItemPending: false,
        isLoginPending: false,
      };

    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: [action.item, ...state.items],
        lastAddedItemId: action.item.id,
      };

    case ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.item.id ? action.item : item
        ),
      };

    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };

    default:
      throw new Error({
        error: CLIENT.UNKNOWN_ACTION,
        detail: action, 
      });
  }
}

export default reducer;
