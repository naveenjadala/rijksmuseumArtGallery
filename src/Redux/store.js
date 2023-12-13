import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import FilterSlice from './slice/FilterSlice';

const preloadedState = {};

const reducer = combineReducers({
  Filters: FilterSlice,
});

export const store = configureStore({
  preloadedState,
  reducer,
});
