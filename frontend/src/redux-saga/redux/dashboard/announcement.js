import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  error: null,
  success: false,
  announcements: [],
}

const {
  actions: {
    announcementDataFechingStart,
    announcementDataFechingSuccessful,
    announcementDataFechingFailure,
  },
  reducer,
} = createSlice( {
  name: 'announcement',
  initialState,
  reducers: {
    announcementDataFechingStart: () => ( {
      ...initialState,
      isLoading: true,
    } ),
    announcementDataFechingSuccessful: ( state, action ) => ( {
      ...initialState,
      success: true,
      isLoading: false,
      announcements: action.payload.announcements,
    } ),
    announcementDataFechingFailure: ( state, action ) => ( {
      ...initialState,
      error: true,
      isLoading: false,
    } ),
  },
} )

export default reducer
export {
  announcementDataFechingStart,
  announcementDataFechingSuccessful,
  announcementDataFechingFailure,
}
