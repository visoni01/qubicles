/* eslint-disable import/prefer-default-export */

import { actionChannel } from 'redux-saga/effects'
import {
  ADD_CATEGORY,
  ADD_CHANNEL,
  DELETE_CATEGORY,
  ADD_TOPIC_COMMENT,
  DELETE_TOPIC_COMMENT,
  ADD_TOPIC,
  DELETE_TOPIC,
  DELETE_CHANNEL,
  DELETE_JOB,
  UPDATE_TOPIC,
  UPDATE_CATEGORY,
  UPDATE_CHANNEL,
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
    case DELETE_CHANNEL: {
      categories = state.categories.map((category) => {
        if (category.id === payload.data.categoryId) {
          return {
            ...category,
            channels: category.channels.filter((channel) => (channel.id !== payload.data.channelId)),
          }
        }
        return category
      })
      break
    }
    case UPDATE_CATEGORY: {
      categories = state.categories.map((category) => {
        if (category.id === payload.data.category_id) {
          return {
            ...category,
            title: payload.data.title,
            isPublic: payload.data.is_public,
          }
        }
        return category
      })
      break
    }
    case UPDATE_CHANNEL: {
      categories = state.categories.map((category) => {
        if (category.id === payload.data.category_id) {
          return {
            ...category,
            channels: category.channels.map((channel) => ({
              ...channel,
              title: payload.data.channel_title,
              description: payload.data.channel_description,
              isPublic: payload.data.is_public,
              isCompanyAnn: payload.data.is_company_ann,
            })),
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
  let { channelDetails } = state
  switch (payload.type) {
    case ADD_TOPIC: {
      channelDetails = { ...state.channelDetails, topicsCount: state.channelDetails.topicsCount + 1 }
      break
    }
    case DELETE_TOPIC: {
      channelDetails = { ...state.channelDetails, topicsCount: state.channelDetails.topicsCount - 1 }
      break
    }
    default:
      break
  }
  return channelDetails
}

export const getUpdatedTopicsList = ({ state, payload }) => {
  let { channelTopicsList } = state
  switch (payload.type) {
    case ADD_TOPIC: {
      channelTopicsList = [ ...state.channelTopicsList, payload.newTopic ]
      break
    }
    case DELETE_TOPIC: {
      channelTopicsList = state.channelTopicsList.filter((topic) => topic.topicId !== payload.topicId)
      break
    }
    case UPDATE_TOPIC: {
      const {
        topicId, topicTitle, topicDescription, isPublic,
      } = payload.topicData
      const topics = state.channelTopicsList.map((topic) => {
        if (topic.topicId === topicId) {
          return {
            ...topic,
            topicTitle,
            topicDescription,
            isPublic,
          }
        }
        return topic
      })
      channelTopicsList = topics
      break
    }
    default:
      break
  }
  return channelTopicsList
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
