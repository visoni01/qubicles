import React, { Component, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isEmptyObject } from '../../utils/common'
import { topicDataFetchingStart } from '../../redux-saga/redux/actions'
import TopicHeader from '../../components/CommunicationForums/topic/TopicHeader'
import PostWrap from '../../components/CommunicationForums/topic/PostWrap'
import withNavBar from '../../Hoc/navbar'
import './style.scss'

const ForumTopic = () => {
  const { topicId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(topicDataFetchingStart({ topicId }))
  }, [])
  const { isLoading, topicDetails } = useSelector((state) => state.topic)
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
