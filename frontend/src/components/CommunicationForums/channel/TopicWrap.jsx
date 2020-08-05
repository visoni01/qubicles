import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Contributors from '../Contributors'
import TopicListItem from './TopicListItem'
import { TopicItemShape, ownerDetails } from '../forumValidators'

const TopicWrap = ({ channelInfo, channelTopics }) => (
  <div className='forum-wrap'>
    <div className='forum-container'>
      {/* Heading */}
      <div className='channel-heading'>
        <h3>
          {`${ channelInfo.topicsCount } topics`}
        </h3>
        {!_.isEmpty(channelInfo.moderators)
        && <Contributors users={ channelInfo.moderators } message='are moderating this channel' />}
      </div>
      <div className='topic-list'>
        {channelTopics.map((topic) => <TopicListItem { ...topic } key={ `${ topic.topicId }` } />)}
      </div>
    </div>
  </div>
)

TopicWrap.defaultProps = {
  channelTopics: [],
}

TopicWrap.propTypes = {
  channelInfo: PropTypes.shape({
    channelId: PropTypes.number.isRequired,
    channelDescription: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
    topicsCount: PropTypes.number.isRequired,
    moderators: PropTypes.arrayOf(ownerDetails).isRequired,
  }).isRequired,
  channelTopics: PropTypes.arrayOf(TopicItemShape),
}

export default TopicWrap
