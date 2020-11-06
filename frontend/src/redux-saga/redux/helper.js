/* eslint-disable import/prefer-default-export */

import {
  DELETE_JOB,
  ADD_GROUP_TOPIC,
  UPDATE_TOPIC_STATS,
  LIKE_POST,
  UNLIKE_POST,
  CREATE_POST_COMMENT_START,
  DELETE_POST_STATUS,
  UPDATE_POST,
  DELETE_POST_COMMENT,
  ADD_JOB,
  UPDATE_JOB,
  ADD_GROUP,
  ADD_COMMENT_TO_POST,
  FETCH_COMMENT_FOR_POST,
  SET_IS_COMMENT_LOADING,
  POST_TOPIC_COMMENT,
  LOAD_MORE_COMMENTS,
  TOPIC_ACTIVITY,
} from './constants'

import {
  postDataFetchingStart, createStatusPostStart, updatePostComments, fetchCommentsSuccess,
} from './actions'

export const getUpdatedGroups = ({ state, payload }) => {
  const { newGroup } = payload.data
  let updatedState
  switch (payload.type) {
    case ADD_GROUP: {
      updatedState = {
        ...state,
        groups: [ ...state.groups, newGroup ],
      }
      break
    }
    default:
      break
  }
  return updatedState
}

export const getUpdatedTopicComments = ({ state, payload }) => {
  let updatedState
  switch (payload.type) {
    case POST_TOPIC_COMMENT: {
      updatedState = {
        ...state,
        comments: [ payload.newComment, ...state.comments ],
      }
      break
    }
    case LOAD_MORE_COMMENTS: {
      updatedState = {
        ...state,
        comments: [ ...state.comments, ...payload.comments ],
      }
      break
    }
    default:
      break
  }
  return updatedState
}

export const updateGroupTopics = (state, payload) => {
  let updatedState
  switch (payload.type) {
    case ADD_GROUP_TOPIC: {
      updatedState = {
        ...state,
        topics: [ ...state.topics, payload.newTopic ],
        topicsCount: state.topicsCount + 1,
      }
      break
    }
    case UPDATE_TOPIC_STATS: {
      updatedState = {
        ...state,
        topics: state.topics.map((topic) => {
          if (topic.id === payload.topicId) {
            return {
              ...topic,
              [ payload.statType ]: topic[ payload.statType ] + 1,
            }
          }
          return topic
        }),
      }
      break
    }
    case TOPIC_ACTIVITY: {
      const { topicId, activity } = payload
      updatedState = {
        ...state,
        topics: state.topics.map((topic) => {
          if (topic.id === topicId) {
            return {
              ...topic,
              isTopicLiked: activity === 'like',
              likesCount: activity === 'like' ? topic.likesCount + 1 : topic.likesCount - 1,
            }
          }
          return topic
        }),
      }
      break
    }
    default:
      break
  }
  return updatedState
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
    case ADD_JOB: {
      const { newJob } = payload
      updatedJobCategories = state.jobCategories.map((category) => {
        let updatedJobs = category.jobs
        if (category.categoryId === newJob.categoryId) {
          updatedJobs = [ ...updatedJobs, newJob ]
        }
        return { ...category, jobs: updatedJobs }
      })
      break
    }
    case UPDATE_JOB: {
      const { updatedJob } = payload
      updatedJobCategories = state.jobCategories.map((category) => {
        let updatedJobs = category.jobs
        if (category.categoryId === updatedJob.categoryId) {
          updatedJobs = updatedJobs.map((job) => {
            if (job.jobId === updatedJob.jobId) {
              return {
                ownerId: job.ownerId,
                ...updatedJob,
              }
            }
            return job
          })
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
    case SET_IS_COMMENT_LOADING: {
      posts = state.posts.map((post) => {
        if (post.user_activity_id === payload.data.userActivityId) {
          return ({
            ...post,
            commentLoading: payload.data.isLoading,
          })
        }
        return (post)
      })
      break
    }

    case ADD_COMMENT_TO_POST: {
      const { data } = payload

      posts = state.posts.map((post) => {
        if (post.user_activity_id === data.post_id) {
          const newComment = {
            activity_value: data.activity_value,
            createdAt: data.createdAt,
            owner: data.owner,
            owner_id: data.owner_id,
            user_activity_id: data.comment_id,
          }
          return ({
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [ ...post.comments, newComment ],
            commentLoading: false,
          })
        }
        return ({
          ...post,
        })
      })
      break
    }

    case FETCH_COMMENT_FOR_POST: {
      const { data } = payload
      const fetchedComments = data.comments
      posts = state.posts.map((post) => {
        if (post.user_activity_id === data.userActivityId) {
          // Find values that are in fetchedComments but not in post.comments
          const uniqueComments = fetchedComments.filter(
            (obj) => !post.comments.some((obj2) => obj.user_activity_id === obj2.user_activity_id),
          )

          return ({
            ...post,
            comments: [ ...uniqueComments.reverse(), ...post.comments ],
            commentLoading: false,
          })
        }
        return ({
          ...post,
        })
      })
      break
    }

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

    // WIP ACTIONS

    // case UPDATE_POST: {
    //   const { editedPost } = payload
    //   posts = state.posts.map((post) => {
    //     const isPost = (post.user_activity_id === editedPost.user_activity_id)
    //     return {
    //       ...post,
    //       activity_custom: isPost ? editedPost.activity_custom : post.activity_custom,
    //       activity_value: isPost ? editedPost.activity_value : post.activity_value,
    //     }
    //   })
    //   break
    // }

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
