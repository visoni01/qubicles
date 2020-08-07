import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import Contributors from '../Contributors'
import TopicListItem from './TopicListItem'
import { TopicItemShape, ownerDetails } from '../forumValidators'
import { channelTopicsListFetchingStart } from '../../../redux-saga/redux/actions'
import Loader from '../../loaders/circularLoader'

const TopicWrap = ({ channelDetails }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(channelTopicsListFetchingStart({ channelId: channelDetails.channelId, searchKeyword: '' }))
  }, [ dispatch, channelDetails.channelId ])
  const { isLoading, channelTopicsList } = useSelector((state) => state.channelTopicsList)
  const totalTopics = channelTopicsList.length
  const isTopics = !_.isEmpty(channelTopicsList)
  return (
    <div className='forum-wrap'>
      <div className='forum-container'>
        <div className='channel-heading'>
          <h3>
            {`${ totalTopics } topics`}
          </h3>
          {!_.isEmpty(channelDetails.moderators)
        && <Contributors users={ channelDetails.moderators } message='are moderating this channel' />}
        </div>
        {isLoading && (
        <Loader
          className='loader-custom'
          enableOverlay={ false }
          displayLoaderManually
        />
        )}
        { isTopics
          ? (
            <div className='topic-list'>
              {channelTopicsList.map((topic) => <TopicListItem { ...topic } key={ `${ topic.topicId }` } />)}
            </div>
          )
          : (
            <div className='no-category-message'>
              Channel Topic not available...
            </div>
          )}
      </div>
    </div>
  )
}

TopicWrap.defaultProps = {
  channelTopics: [],
}

TopicWrap.propTypes = {
  channelDetails: PropTypes.shape({
    channelId: PropTypes.number.isRequired,
    channelDescription: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
    topicsCount: PropTypes.number.isRequired,
    moderators: PropTypes.arrayOf(ownerDetails).isRequired,
  }).isRequired,
  channelTopics: PropTypes.arrayOf(TopicItemShape),
}

export default TopicWrap
