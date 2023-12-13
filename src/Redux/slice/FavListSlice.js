import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favList: [],
};

export const FavListSlice = createSlice({
  name: 'Favorites',
  initialState,
  reducers: {
    updateFavList: (state, action) => {
      return {...state, favList: action.payload};
    },
    addFavList: (state, action) => {
      return {...state, favList: [...state.favList, action.payload]};
    },
    removeFromFavList: (state, action) => {
      const newList = state.favList.filter(item => item !== action.payload);
      return {
        ...state,
        favList: newList,
      };
    },
    getFavList: (state, action) => {
      return state.favList;
    },
  },
  extraReducers(builder) {},
});

export const {addFavList, removeFromFavList, getFavList, updateFavList} =
  FavListSlice.actions;
export default FavListSlice.reducer;
