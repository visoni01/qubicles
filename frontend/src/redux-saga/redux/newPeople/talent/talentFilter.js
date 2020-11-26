import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const initialState = {
  talentFilter: {
    selectedSkill: [],
    selectedLanguage: [],
    selectedTalentType: { employmentType: null, name: 'Any' },
    selectedHourlyRate: { lessThanEq: null, greaterThanEq: null, name: 'Any' },
    selectedRating: { greaterThanEq: null, name: 'Any' },
    selectedVerifications: { backgroundCheck: false, phoneVerified: false, idVerified: false },
    selectedAvailability: { status: null, name: 'Any' },
    selectedLocation: '',
    searchKeyword: '',
  },
}

const {
  actions: {
    updateTalentFilter,
    resetTalentFilter,
  }, reducer,
} = createSlice({
  name: 'talentFilter',
  initialState,
  reducers: {
    updateTalentFilter: (state, action) => ({
      ...state,
      talentFilter: getDataForReducer(action, initialState.talentFilter, 'talentFilter'),
    }),
    resetTalentFilter: (state) => ({
      ...state,
      talentFilter: initialState.talentFilter,
    }),
  },
})

export default reducer
export {
  updateTalentFilter,
  resetTalentFilter,
  initialState,
}
