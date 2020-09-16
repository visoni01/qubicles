import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  stepsData: {},
  currentStep: 1,
}

const {
  actions: {
    postSignUpStepStart,
    postSignUpStepSuccessful,
    postSignUpStepFailure,
    handleBackStep,
    handleNextStep,
    postSignUpPreviousDataFetch,
    postSignUpPreviousDataSuccess,
    postSignUpPreviousDataFailure,
  },
  reducer,
} = createSlice({
  name: 'postSignUp',
  initialState,
  reducers: {
    postSignUpStepStart: (state, action) => ({
      ...state,
      isLoading: true,
      success: false,
      error: false,
    }),
    postSignUpPreviousDataFetch: (state) => ({
      ...state,
      isLoading: true,
      success: false,
      error: false,
    }),
    postSignUpPreviousDataFailure: (state) => ({
      ...state,
      error: false,
      isLoading: false,
      success: false,
    }),
    postSignUpPreviousDataSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      error: false,
      stepsData: action.payload.stepsData,
    }),
    postSignUpStepSuccessful: (state, action) => {
      const { step, data } = action.payload
      return {
        ...state,
        success: true,
        isLoading: false,
        stepsData: {
          ...state.stepsData,
          [ step ]: data,
        },
        currentStep: state.currentStep + 1,
      }
    },
    postSignUpStepFailure: (state, action) => ({
      ...state,
      error: true,
      isLoading: false,
    }),
    handleBackStep: (state) => ({
      ...state,
      currentStep: state.currentStep - 1,
    }),
    handleNextStep: (state) => ({
      ...state,
      currentStep: state.currentStep + 1,
    }),
  },
})

export default reducer
export {
  postSignUpStepStart,
  postSignUpStepSuccessful,
  postSignUpStepFailure,
  postSignUpPreviousDataFetch,
  postSignUpPreviousDataSuccess,
  postSignUpPreviousDataFailure,
  handleBackStep,
  handleNextStep,
}
