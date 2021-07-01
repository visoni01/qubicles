/* eslint-disable complexity */
import {
  ADD_GROUP_TOPIC,
  UPDATE_TOPIC_STATS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST_STATUS,
  DELETE_POST_COMMENT,
  ADD_JOB,
  ADD_GROUP,
  ADD_COMMENT_TO_POST,
  FETCH_COMMENT_FOR_POST,
  SET_IS_COMMENT_LOADING,
  POST_TOPIC_COMMENT,
  DELETE_TOPIC_COMMENT,
  LOAD_MORE_COMMENTS,
  TOPIC_ACTIVITY,
  CREATE_NEW_POST,
  POST_DATA_FETCH,
  UPDATE_POST_COMMENT,
  FETCH_COMMENTS_SUCCESS,
  UPDATE_JOB,
  DELETE_JOB,
  UPDATE_POST,
  UPDATE_GROUP,
  DELETE_GROUP,
  DELETE_GROUP_TOPIC,
  UPDATE_GROUP_TOPIC,
  UPDATE_TOPIC_COMMENT,
} from './constants'

export const getUpdatedGroups = ({ state, payload }) => {
  const {
    newGroup, groupId, updatedGroup,
  } = payload.data
  let updatedState
  switch (payload.type) {
    case ADD_GROUP: {
      updatedState = {
        ...state,
        groups: [ ...state.groups, newGroup ],
      }
      break
    }

    case UPDATE_GROUP: {
      updatedState = {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === updatedGroup.id) {
            return updatedGroup
          }
          return group
        }),
      }
      break
    }

    case DELETE_GROUP: {
      updatedState = {
        ...state,
        groups: state.groups.filter((group) => group.id !== groupId),
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
    case DELETE_TOPIC_COMMENT: {
      const {
        activityId,
      } = payload.data
      updatedState = {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== activityId),
      }
      break
    }
    case UPDATE_TOPIC_COMMENT: {
      const {
        updatedComment,
      } = payload.data
      updatedState = {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === updatedComment.id) {
            return updatedComment
          }
          return comment
        }),
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

    case UPDATE_GROUP_TOPIC: {
      const {
        topicId, updatedTopic,
      } = payload.data
      updatedState = {
        ...state,
        topics: state.topics.map((topic) => {
          if (topic.id === topicId) {
            return updatedTopic
          }
          return topic
        }),
      }
      break
    }

    case DELETE_GROUP_TOPIC: {
      updatedState = {
        ...state,
        topics: state.topics.filter((topic) => topic.id !== payload.data.topicId),
        topicsCount: state.topicsCount - 1,
      }
      break
    }

    case UPDATE_TOPIC_STATS: {
      const { statType, toIncrement = true } = payload
      updatedState = {
        ...state,
        topics: state.topics.map((topic) => {
          if (topic.id === payload.topicId) {
            return {
              ...topic,
              [ statType ]: toIncrement
                ? topic[ statType ] + 1 : topic[ statType ] - 1,
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
    case ADD_JOB: {
      const { newJob } = payload
      updatedJobCategories = state.jobsWithCategories.map((category) => {
        let updatedJobs = category.jobs
        if (category.categoryId === newJob.categoryId) {
          updatedJobs = [ ...updatedJobs, ...newJob ]
        }
        return { ...category, jobs: updatedJobs }
      })
      break
    }
    case UPDATE_JOB: {
      const { updatedJob } = payload
      updatedJobCategories = state.jobsWithCategories.map((category) => {
        let updatedJobs = category.jobs
        if (category.categoryId === updatedJob.categoryId) {
          updatedJobs = updatedJobs.map((job) => {
            if (job.job_id === updatedJob.jobId) {
              return {
                ...job,
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
    case DELETE_JOB: {
      const { deletedJobId } = payload
      updatedJobCategories = state.jobsWithCategories.map((category) => {
        let updatedJobs = category.jobs
        if (category.categoryId === deletedJobId.categoryId) {
          updatedJobs = updatedJobs.filter((job) => (job.job_id !== deletedJobId.jobId))
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
            profilePic: data.profilePic,
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

    case CREATE_NEW_POST: {
      posts = [ payload.newPost, ...state.posts ]
      break
    }
    case POST_DATA_FETCH: {
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

    case UPDATE_POST: {
      const { editedPost } = payload
      posts = state.posts.map((post) => {
        const isPost = (post.user_activity_id === editedPost.user_activity_id)
        return {
          ...post,
          activity_custom: isPost ? editedPost.activity_custom : post.activity_custom,
          activity_value: isPost ? editedPost.activity_value : post.activity_value,
          activity_permission: isPost ? editedPost.activity_permission : post.activity_permission,
          updatedAt: isPost ? Date.now() : post.updatedAt,
        }
      })
      break
    }

    case DELETE_POST_COMMENT: {
      const { postId, commentId } = payload.data
      posts = state.posts.map((post) => ({
        ...post,
        commentsCount: post.user_activity_id === postId ? post.commentsCount - 1 : post.commentsCount,
        comments: post.user_activity_id === postId
          ? post.comments.filter((comment) => comment.user_activity_id !== commentId) : post.comments,
      }))
      break
    }

    case UPDATE_POST_COMMENT: {
      const { postId, commentId, updatedComment } = payload.data
      posts = state.posts.map((post) => ({
        ...post,
        comments: post.user_activity_id === postId
          ? post.comments.map((comment) => {
            if (comment.user_activity_id === commentId) {
              return { ...comment, activity_value: updatedComment, updatedAt: Date.now() }
            }
            return comment
          })
          : post.comments,
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
    case FETCH_COMMENTS_SUCCESS: {
      const { data } = payload
      commentsData = {
        count: data.count,
        comments: [ ...state.data.comments, ...data.comments ],
      }
      break
    }
    default:
      break
  }
  return commentsData
}

export const getJobsByCategory = ({ state, payload }) => {
  const { jobsWithCategories } = state
  const index = jobsWithCategories.findIndex((category) => category.categoryId === payload.categoryId)
  jobsWithCategories[ index ] = {
    ...jobsWithCategories[ index ],
    jobs: payload.jobs,
  }
  return jobsWithCategories
}
