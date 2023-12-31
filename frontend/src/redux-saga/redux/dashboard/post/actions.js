import { createAction } from 'redux-actions'
import {
  DELETE_POST_STATUS,
  LIKE_POST,
  UNLIKE_POST,
  ADD_POST_COMMENT,
  CREATE_POST_COMMENT_START,
  UPDATE_POST,
  DELETE_POST_COMMENT,
  ADD_COMMENT_TO_POST,
  FETCH_COMMENT_FOR_POST,
  UPDATE_POST_COMMENT,
} from '../../constants'

export const deletePostStatus = createAction(DELETE_POST_STATUS)
export const likePostStatus = createAction(LIKE_POST)
export const unlikePostStatus = createAction(UNLIKE_POST)
export const commentPostStatus = createAction(ADD_POST_COMMENT)
export const createPostCommentStart = createAction(CREATE_POST_COMMENT_START)
export const updatePostStatus = createAction(UPDATE_POST)
export const deletePostComment = createAction(DELETE_POST_COMMENT)
export const updatePostComment = createAction(UPDATE_POST_COMMENT)
export const addCommentToPost = createAction(ADD_COMMENT_TO_POST)
export const fetchCommentForPost = createAction(FETCH_COMMENT_FOR_POST)
