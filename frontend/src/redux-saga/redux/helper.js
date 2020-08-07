/* eslint-disable import/prefer-default-export */

import {
  ADD_CATEGORY, ADD_CHANNEL, DELETE_CATEGORY, ADD_TOPIC_COMMENT, DELETE_TOPIC_COMMENT,
  ADD_TOPIC, DELETE_TOPIC, DELETE_JOB,
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

export const getUpdatedChannel = ({ state, payload }) => {
  let channelDetails
  switch (payload.type) {
    case ADD_TOPIC: {
      channelDetails = {
        ...state.channelDetails,
        channelTopics: [ ...state.channelDetails.channelTopics, payload.newTopic ],
      }
      break
    }
    case DELETE_TOPIC: {
      channelDetails = {
        ...state.channelDetails,
        channelTopics: state.channelDetails.channelTopics.filter((topic) => topic.topicId !== payload.topicId),
      }
      break
    }
    default:
      break
  }
  return channelDetails
}

export const getUpdatedJobsData = ({ state, payload }) => {
  let updatedJobCategories = []
  switch (payload.type) {
    case DELETE_JOB: {
      const { categoryId, jobId } = payload
      updatedJobCategories = state.jobCategories.map((category) => {
        let updatedJobs = category.jobs
        if (category.categoryId === categoryId) {
          updatedJobs = category.jobs.filter((job) => job.jobId !== jobId)
        }
        return { ...category, jobs: updatedJobs }
      })
      break
    }
    default:
      break
  }
  return updatedJobCategories
}
