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
  LIKE_POST,
  UNLIKE_POST,
  CREATE_POST_COMMENT_START,
  DELETE_POST_STATUS,
  UPDATE_COMMENT,
  UPDATE_POST,
  DELETE_POST_COMMENT,
} from './constants'

import {
  postDataFetchingStart, createStatusPostStart, updatePostComments, fetchCommentsSuccess,
} from './actions'

export const getUpdatedCategories = ({ state, payload }) => {
  const updatedState = { ...state }
  switch (payload.type) {
    case ADD_CATEGORY: {
      updatedState.categories = [ ...state.categories, payload.newCategory ]
      updatedState.totalCategories = state.totalCategories + 1
      break
    }
    case DELETE_CATEGORY: {
      updatedState.categories = state.categories.filter((category) => (category.id !== payload.categoryId))
      updatedState.totalCategories = state.totalCategories - 1
      break
    }
    case ADD_CHANNEL: {
      updatedState.categories = state.categories.map((category) => {
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
      updatedState.categories = state.categories.map((category) => {
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
      updatedState.categories = state.categories.map((category) => {
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
      updatedState.categories = state.categories.map((category) => {
        if (category.id === payload.data.category_id) {
          return {
            ...category,
            channels: category.channels.map((channel) => {
              if (channel.id === payload.data.channel_id) {
                return {
                  ...channel,
                  title: payload.data.channel_title,
                  description: payload.data.channel_description,
                  isPublic: payload.data.is_public,
                  isCompanyAnn: payload.data.is_company_ann,
                }
              }
              return channel
            }),
          }
        }
        return category
      })
      break
    }
    default:
      break
  }
  return updatedState
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
    case UPDATE_COMMENT: {
      const { postId, postData } = payload.data
      const updatedPosts = state.topicDetails.posts.map((post) => {
        if (post.postId === postId) {
          return {
            ...post,
            postBody: { content: postData },
          }
        }
        return post
      })
      topicDetails = { ...state.topicDetails, posts: updatedPosts }
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
        topicId, topicTitle, topicDescription, isPublic, tags,
      } = payload.topicData
      const topics = state.channelTopicsList.map((topic) => {
        if (topic.topicId === topicId) {
          return {
            ...topic,
            topicTitle,
            topicDescription,
            isPublic,
            tags,
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

export const getPostData = ({ state, payload }) => {
  let posts
  switch (payload.type) {
    case createStatusPostStart.type: {
      posts = [ payload.newPost, ...state.posts ]
      break
    }
    case postDataFetchingStart.type: {
      posts = payload.posts
      break
    }
    case DELETE_POST_STATUS: {
      const { userActivityId } = payload
      posts = state.posts.filter((post) => post.user_activity_id !== userActivityId)
      break
    }
    case LIKE_POST: {
      const { data } = payload
      posts = state.posts.map((post) => {
        let updatedStatusLike = post.isPostLiked
        let updatedLikeCount = post.likesCount
        if (post.user_activity_id === data.userActivityId) {
          updatedStatusLike = true
          updatedLikeCount += 1
        }
        return {
          ...post, isPostLiked: updatedStatusLike, likesCount: updatedLikeCount,
        }
      })
      break
    }
    case UNLIKE_POST: {
      const { data } = payload
      posts = state.posts.map((post) => {
        let updatedStatusLike = post.isPostLiked
        let updatedLikeCount = post.likesCount
        if (post.user_activity_id === data.userActivityId) {
          updatedStatusLike = false
          updatedLikeCount -= 1
        }
        return {
          ...post, isPostLiked: updatedStatusLike, likesCount: updatedLikeCount,
        }
      })
      break
    }
    case CREATE_POST_COMMENT_START: {
      const { data } = payload
      posts = state.posts.map((post) => ({
        ...post,
        commentsCount: post.user_activity_id === data.userActivityId ? post.commentsCount + 1 : post.commentsCount,
      }))
      break
    }
    case UPDATE_POST: {
      const { editedPost } = payload
      posts = state.posts.map((post) => {
        const isPost = (post.user_activity_id === editedPost.user_activity_id)
        return {
          ...post,
          activity_custom: isPost ? editedPost.activity_custom : post.activity_custom,
          activity_value: isPost ? editedPost.activity_value : post.activity_value,
        }
      })
      break
    }
    case DELETE_POST_COMMENT: {
      const { postUserActivityId } = payload
      posts = state.posts.map((post) => ({
        ...post,
        commentsCount: post.user_activity_id === postUserActivityId ? post.commentsCount - 1 : post.commentsCount,
      }))
      break
    }
    default:
      break
  }
  return posts
}

export const updatePostCommentsData = ({ state, payload }) => {
  let commentsData
  switch (payload.type) {
    case updatePostComments.type: {
      const { data } = payload
      commentsData = {
        count: state.data.count + 1,
        comments: [ ...state.data.comments, data ],
      }
      break
    }
    case fetchCommentsSuccess.type: {
      const { data } = payload
      commentsData = {
        count: data.count,
        comments: [ ...state.data.comments, ...data.comments ],
      }
      break
    }
    case DELETE_POST_COMMENT: {
      const { userActivityId } = payload
      commentsData = {
        count: state.data.count - 1,
        comments: state.data.comments.filter((comment) => comment.user_activity_id !== userActivityId),
      }
      break
    }
    default:
      break
  }
  return commentsData
}
