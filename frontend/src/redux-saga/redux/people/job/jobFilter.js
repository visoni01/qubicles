import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../../utils/common'

const jobFilterInitialState = {
  jobFilter: {
    selectedCategory: [],
    selectedSkill: [],
    selectedLanguage: [],
    selectedEmploymentType: { employmentType: null, name: 'Any' },
    selectedHourlyRate: { lessThanEq: null, greaterThanEq: null, name: 'Any' },
    selectedRating: { greaterThanEq: null, name: 'Any' },
    selectedLocation: '',
    searchKeyword: '',
  },
}

const {
  actions: {
    updateJobFilter,
    resetJobFilter,
  }, reducer,
} = createSlice({
  name: 'jobFilter',
  initialState: jobFilterInitialState,
  reducers: {
    updateJobFilter: (state, action) => ({
      ...state,
      jobFilter: getDataForReducer(action, jobFilterInitialState.jobFilter, 'jobFilter'),
    }),
    resetJobFilter: (state) => ({
      ...state,
      jobFilter: jobFilterInitialState.jobFilter,
    }),
  },
})

export default reducer
export {
  updateJobFilter,
  resetJobFilter,
  jobFilterInitialState,
}
