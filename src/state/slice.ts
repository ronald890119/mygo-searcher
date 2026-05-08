import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ContentState {
  mygoTabClicked: boolean
  linkCopied: boolean
  imgCopied: boolean
  mygoKeys: string[]
  ave_mujicaKeys: string[]
  filtered_mygoKeys: string[]
  filtered_ave_mujicaKeys: string[]
}

const initialState: ContentState = {
  mygoTabClicked: false,
  linkCopied: false,
  imgCopied: false,
  mygoKeys: [],
  ave_mujicaKeys: [],
  filtered_mygoKeys: [],
  filtered_ave_mujicaKeys: [],
}

const slice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {
    toggleMygoTabClicked: (state) => {
      state.mygoTabClicked = !state.mygoTabClicked
    },
    setMyGOKeys: (state, action: PayloadAction<string[]>) => {
      state.mygoKeys = action.payload
    },
    setAveMujicaKeys: (state, action: PayloadAction<string[]>) => {
      state.ave_mujicaKeys = action.payload
    },
    setFilteredMygoKeys: (state, action: PayloadAction<string[]>) => {
      state.filtered_mygoKeys = action.payload
    },
    setFilteredAveMujicaKeys: (state, action: PayloadAction<string[]>) => {
      state.filtered_ave_mujicaKeys = action.payload
    },
    setLinkCopied: (state, action: PayloadAction<boolean>) => {
      state.linkCopied = action.payload
    },
    setImgCopied: (state, action: PayloadAction<boolean>) => {
      state.imgCopied = action.payload
    },
  },
})

export const {
  toggleMygoTabClicked,
  setMyGOKeys,
  setAveMujicaKeys,
  setFilteredMygoKeys,
  setFilteredAveMujicaKeys,
  setLinkCopied,
  setImgCopied,
} = slice.actions

export default slice.reducer
