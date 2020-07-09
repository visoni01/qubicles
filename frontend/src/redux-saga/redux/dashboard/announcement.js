import { createSlice } from '@reduxjs/toolkit'
import { getDataForReducer } from '../../../utils/common'


const initialState = {
  loading: null,
  error: null,
  success: false,
  announcements: [],
}

const {
  actions: {
    announcementDataFetchingStart,
    announcementDataFetchingSuccessful,
    announcementDataFetchingFailure,
  },
  reducer,
} = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    announcementDataFetchingStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    announcementDataFetchingSuccessful: (state, action) => ({
      ...initialState,
      success: true,
      isLoading: false,
      announcements: getDataForReducer(action, initialState.announcements, 'announcements')
    }),
    announcementDataFetchingFailure: (state, action) => ({
      ...initialState,
      error: true,
      isLoading: false,
    }),
  },
})

export default reducer
export {
  announcementDataFetchingStart,
  announcementDataFetchingSuccessful,
  announcementDataFetchingFailure,
}
