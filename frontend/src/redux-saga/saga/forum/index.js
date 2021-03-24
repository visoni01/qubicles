import getAllGroups from './groups/getAll'
import crudGroups from './groups/crud'
import groupTopics from './groupTopics/getAll'
import topicComments from './topicComments/getAll'
import crudTopicComments from './topicComments/crud'
import crudGroupTopics from './groupTopics/crud'
import GroupTopicActivity from './groupTopics/activity'

const forumWatcherFunctions = [
  () => getAllGroups(),
  () => crudGroups(),
  () => groupTopics(),
  () => topicComments(),
  () => crudTopicComments(),
  () => crudGroupTopics(),
  () => GroupTopicActivity(),
]

export default forumWatcherFunctions
