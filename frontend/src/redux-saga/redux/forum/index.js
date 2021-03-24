import groupsReducer from './groups'
import groupTopicsReducer from './groupTopics'
import topicCommentsReducer from './topicComments'

const forumReducers = {
  groups: groupsReducer,
  groupTopics: groupTopicsReducer,
  topicComments: topicCommentsReducer,
}

export default forumReducers
export * from './groups'
export * from './groupTopics'
export * from './topicComments'
export * from './actions'
