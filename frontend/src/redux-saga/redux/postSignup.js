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
    postSignUpStepSuccessful: (state, action) => {
      const { step, data, inviteLink } = action.payload
      return {
        ...state,
        success: true,
        isLoading: false,
        stepsData: {
          ...state.stepsData,
          [ step ]: data,
        },
        currentStep: state.currentStep + 1,
        inviteLink, // Temporary setup.
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
  handleBackStep,
  handleNextStep,
}
