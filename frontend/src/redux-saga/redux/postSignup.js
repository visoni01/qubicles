import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  stepsData: {},
}

const {
  actions: {
    postSignUpStepStart,
    postSignUpStepSuccessful,
    postSignUpStepFailure,
  },
  reducer,
} = createSlice( {
  name: 'postSignUp',
  initialState,
  reducers: {
    postSignUpStepStart: ( state, action ) => ( {
      ...state,
      isLoading: true,
      success: false,
      error: false,
    } ),
    postSignUpStepSuccessful( state, action ) {
      const { step, data } = action.payload
      return {
        ...initialState,
        success: true,
        isLoading: false,
        stepsData: {
          ...state.stepsData,
          [ step ]: data,
        },
      }
    },
    postSignUpStepFailure: ( state, action ) => ( {
      ...initialState,
      error: true,
      isLoading: false,
    } ),
  },
} )

export default reducer
export {
  postSignUpStepStart,
  postSignUpStepSuccessful,
  postSignUpStepFailure,
}
