import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  communityRep: [],
}

const {
  actions: {
    communityRepDataFechingStart,
    communityRepDataFechingSuccessful,
    communityRepDataFechingFailure,
  },
  reducer,
} = createSlice({
  name: 'communityRep',
  initialState,
  reducers: {
    communityRepDataFechingStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    communityRepDataFechingSuccessful: (state, action) => ({
      ...state,
      success: true,
      isLoading: false,
      communityRep: action.payload.communityRep,
    }),
    communityRepDataFechingFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  communityRepDataFechingStart,
  communityRepDataFechingSuccessful,
  communityRepDataFechingFailure,
}
