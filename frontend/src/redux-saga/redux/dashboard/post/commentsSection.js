import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showCommentSection: false,
  data: { statusPostId: null },
}

const {
  actions: {
    showCommentsSection,
    hideCommentsSection,
  },
  reducer,
} = createSlice({
  name: 'commentSection',
  initialState,
  reducers: {
    showCommentsSection: (state, action) => ({
      ...state,
      showCommentSection: true,
      data: action.payload,
    }),
    hideCommentsSection: (state) => ({
      ...state,
      showCommentSection: false,
    }),
  },
})

export default reducer
export {
  showCommentsSection,
  hideCommentsSection,
}
