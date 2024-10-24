import state from './state';
import render from './render';
import setupEventListeners from './controller';

const appEl = document.querySelector('#app');
render(state, appEl);
setupEventListeners(appEl);
