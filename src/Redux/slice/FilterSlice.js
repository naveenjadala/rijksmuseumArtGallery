import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filter: {},
};

export const FilterSlice = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const {setFilter} = FilterSlice.actions;
export default FilterSlice.reducer;
