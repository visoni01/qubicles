import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Contributors from './Contributors'
import Topic from './Topic'

const TopicList = ({ channelInfo, channelTopics }) => (
  <div className='forum-wrap'>
    <div className='forum-container'>
      {/* Heading */}
      <div className='channel-heading'>
        <h3>
          {`${ channelInfo.topicsCount } topics`}
        </h3>
        <Contributors users={ channelInfo.moderators } message='are moderating this channel'/>
      </div>
      <div className='topic-list'>
        {channelTopics.map((topic) => <Topic { ...topic } key={ `${ topic.topicId }` } />)}
      </div>
    </div>
  </div>
)

TopicList.propTypes = {
  topicsCount: PropTypes.number.isRequired,
}
export default TopicList
