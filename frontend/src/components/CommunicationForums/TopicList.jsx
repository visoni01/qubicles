import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Contributors from './Contributors'
import Topic from './Topic'
import channelData from '../../container/CommunicationForums/channelData'

const TopicList = ({ topicsCount, moderators }) => (
  <div className='forum-wrap'>
    <div className='forum-container'>
      {/* Heading */}
      <div className='channel-heading'>
        <h3>
          {`${ topicsCount } topics`}
        </h3>
        <Contributors users={ moderators } message='are moderating this channel'/>
      </div>
      <div className='topic-list'>
        {channelData.topics.map((topic) => <Topic { ...topic } key={ `${ topic.topicId }` } />)}
      </div>
    </div>
  </div>
)

TopicList.propTypes = {
  topicsCount: PropTypes.number.isRequired,
}
export default TopicList
