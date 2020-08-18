import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isEmptyObject } from '../../utils/common'
import { topicDataFetchingStart } from '../../redux-saga/redux/actions'
import TopicHeader from '../../components/CommunicationForums/topic/TopicHeader'
import PostWrap from '../../components/CommunicationForums/topic/PostWrap'
import withNavBar from '../../hoc/navbar'
import './style.scss'
import Loader from '../../components/loaders/circularLoader'

const ForumTopic = () => {
  const { topicId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(topicDataFetchingStart({ topicId }))
  }, [ dispatch, topicId ])
  const { isLoading, topicDetails } = useSelector((state) => state.topic)
  if (isLoading) {
    return (
      <Loader
        className='loader-custom'
        enableOverlay={ false }
        displayLoaderManually
      />
    )
  }
  return (
    <div>
      {/* Main dashboard container */}
      <div className='dashboard-wrapper'>
        {/* Topic Header */}
        {!isLoading && !isEmptyObject(topicDetails) && <TopicHeader { ...topicDetails } />}
        {/* Posts Wrap */}
        {!isLoading && !isEmptyObject(topicDetails) && <PostWrap { ...topicDetails } />}
      </div>
    </div>
  )
}

export default withNavBar(ForumTopic)
