import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  talentCards: [],
}

const {
  actions: {
    fetchTalentCardsStart,
    fetchTalentCardsSuccess,
    fetchTalentCardsFailed,
  }, reducer,
} = createSlice({
  name: 'talentCards',
  initialState,
  reducers: {
    fetchTalentCardsStart: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchTalentCardsSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      success: true,
      talentCards: getDataForReducer(action, initialState.talentCards, 'talentCards'),
    }),
    fetchTalentCardsFailed: (state) => ({
      ...state,
      isLoading: false,
      error: true,
      success: false,
    }),
  },
})

export default reducer
export {
  fetchTalentCardsStart,
  fetchTalentCardsSuccess,
  fetchTalentCardsFailed,
}
