import { createAction } from 'redux-actions'
import {
  ADD_GROUP,
  ADD_GROUP_TOPIC,
  POST_TOPIC_COMMENT,
  LOAD_MORE_COMMENTS,
  TOPIC_ACTIVITY,
  UPDATE_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP_TOPIC,
  DELETE_GROUP_TOPIC,
} from '../constants'

export const addNewGroup = createAction(ADD_GROUP)
export const updateExistingGroup = createAction(UPDATE_GROUP)
export const deleteGroup = createAction(DELETE_GROUP)

export const addNewGroupTopic = createAction(ADD_GROUP_TOPIC)
export const deleteGroupTopic = createAction(DELETE_GROUP_TOPIC)
export const updateExistingTopic = createAction(UPDATE_GROUP_TOPIC)

export const postTopicComment = createAction(POST_TOPIC_COMMENT)
export const loadMoreComments = createAction(LOAD_MORE_COMMENTS)
export const topicActivity = createAction(TOPIC_ACTIVITY)
