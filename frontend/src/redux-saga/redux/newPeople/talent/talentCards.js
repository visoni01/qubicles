import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'
import { getUpdatedTalentCards } from '../helper'

const initialState = {
  isLoading: null,
  error: null,
  success: null,
  talentCards: null,
}

const {
  actions: {
    fetchTalentCardsStart,
    fetchTalentCardsSuccess,
    fetchTalentCardsFailed,
    updateTalentCards,
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
    updateTalentCards: (state, action) => ({
      ...state,
      talentCards: getUpdatedTalentCards({ state, payload: action.payload }),
      isLoading: false,
    }),
  },
})

export default reducer
export {
  fetchTalentCardsStart,
  fetchTalentCardsSuccess,
  fetchTalentCardsFailed,
  updateTalentCards,
}
