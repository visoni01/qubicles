import getPostsReducer from './getPosts'
import createPostReducer from './create'
import commentsReducer from './comments'
import commentsSectionReducer from './commentsSection'

const postsReducer = {
  statusPosts: getPostsReducer,
  createPost: createPostReducer,
  comments: commentsReducer,
  commentsSection: commentsSectionReducer,
}

export default postsReducer
export * from './getPosts'
export * from './create'
export * from './comments'
export * from './commentsSection'
export * from './actions'
