import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: null,
  error: null,
  success: false,
  createJobData: { },
}

const {
  actions: {
    createJobDataFetchStart,
    createJobDataFetchSuccessful,
    createJobDataFetchFailure,
    resetJobData,
  },
  reducer,
} = createSlice({
  name: 'createJobData',
  initialState,
  reducers: {
    createJobDataFetchStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    createJobDataFetchSuccessful: (state, action) => {
      const { createJobData } = action.payload
      return ({
        ...state,
        success: true,
        error: false,
        isLoading: false,
        createJobData,
      })
    },
    createJobDataFetchFailure: (state) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    resetJobData: (state, action) => ({
      ...state,
      createJobData: {},
      success: true,
      error: false,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  createJobDataFetchStart,
  createJobDataFetchSuccessful,
  createJobDataFetchFailure,
  resetJobData,
}
