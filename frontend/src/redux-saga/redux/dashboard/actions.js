import { createAction } from 'redux-actions'
import {
  DELETE_POST_STATUS, LIKE_POST, UNLIKE_POST, ADD_POST_COMMENT,
} from '../constants'

export const deletePostStatus = createAction(DELETE_POST_STATUS)
export const likePostStatus = createAction(LIKE_POST)
export const unlikePostStatus = createAction(UNLIKE_POST)
export const commentPostStatus = createAction(ADD_POST_COMMENT)
