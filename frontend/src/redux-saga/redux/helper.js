/* eslint-disable import/prefer-default-export */

import {
  ADD_CATEGORY, ADD_CHANNEL, DELETE_CATEGORY, ADD_TOPIC_COMMENT, DELETE_TOPIC_COMMENT,
} from './constants'

export const getUpdatedCategories = ({ state, payload }) => {
  let categories = []
  switch (payload.type) {
    case ADD_CATEGORY: {
      categories = [ ...state.categories, payload.newCategory ]
      break
    }
    case DELETE_CATEGORY: {
      categories = state.categories.filter((category) => (category.id !== payload.categoryId))
      break
    }
    case ADD_CHANNEL: {
      categories = state.categories.map((category) => {
        if (category.id === payload.data.categoryId) {
          return {
            ...category,
            channels: [ ...category.channels, payload.data.newChannel ],
          }
        }
        return category
      })
      break
    }
    default:
      break
  }
  return categories
}

export const getUpdatedTopicDetails = ({ state, payload }) => {
  let topicDetails = {}
  switch (payload.type) {
    case ADD_TOPIC_COMMENT: {
      topicDetails = { ...state.topicDetails, posts: [ payload.data, ...state.topicDetails.posts ] }
      break
    }
    case DELETE_TOPIC_COMMENT: {
      topicDetails = { ...state.topicDetails, posts: payload.posts }
      break
    }
    default:
      break
  }
  return topicDetails
}
