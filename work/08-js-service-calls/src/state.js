import { PAGES } from './constants';

const state = {
  username: '',
  storedWord: '',
  error: '',
  page: PAGES.LOGIN,
};

export const updateUsername = (username) => {
  state.username = username;
};

export const updateStoredWord = (word) => {
  state.storedWord = word;
};

export const updateError = (error) => {
  state.error = error;
};

export const changePage = (page) => {
  state.page = page;
};

export const resetState = () => {
  state.username = '';
  state.storedWord = '';
  state.error = '';
  state.page = PAGES.LOGIN;
};

export default state;