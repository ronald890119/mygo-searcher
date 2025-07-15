import { createSlice } from "@reduxjs/toolkit";

// This is the initial state of the content slice
const initialState = {
  mygoTabClicked: false,
	linkCopied: false,
	imgCopied: false,
  mygoKeys: [],
  ave_mujicaKeys: [],
  filtered_mygoKeys: [],
  filtered_ave_mujicaKeys: [],
};

// This slice manages the state of the content
const slice = createSlice({
  name: "contentSlice",
  initialState,
  reducers: {
    toggleMygoTabClicked: (state) => {
      state.mygoTabClicked = !state.mygoTabClicked;
    },
    setMyGOKeys: (state, action) => {
      state.mygoKeys = action.payload;
    },
    setAveMujicaKeys: (state, action) => {
      state.ave_mujicaKeys = action.payload;
    },
    setFilteredMygoKeys: (state, action) => {
      state.filtered_mygoKeys = action.payload;
    },
    setFilteredAveMujicaKeys: (state, action) => {
      state.filtered_ave_mujicaKeys = action.payload;
    },
		setLinkCopied: (state, action) => {
			state.linkCopied = action.payload;
		},
		setImgCopied: (state, action) => {
			state.imgCopied = action.payload;
		},
  },
});

export const {
  toggleMygoTabClicked,
  setMyGOKeys,
  setAveMujicaKeys,
  setFilteredMygoKeys,
  setFilteredAveMujicaKeys,
	setLinkCopied,
	setImgCopied,
} = slice.actions;

export default slice.reducer;
