import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import FilterSlice from './slice/FilterSlice';
import FavListSlice from './slice/FavListSlice';

const preloadedState = {};

const reducer = combineReducers({
  Filters: FilterSlice,
  Favorites: FavListSlice,
});

export const store = configureStore({
  preloadedState,
  reducer,
});
