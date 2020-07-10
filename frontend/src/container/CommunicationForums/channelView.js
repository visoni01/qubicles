import React, { Component, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ChannelHeader from '../../components/CommunicationForums/ChannelHeader'
import TopicList from '../../components/CommunicationForums/TopicList'
import { channelDataFetchingStart } from '../../redux-saga/redux/actions'
import { isEmptyObject } from '../../utils/common'
import './style.scss'

const ForumChannel = () => {
  const { channelId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(channelDataFetchingStart({ channelId }))
  }, [])
  const {isLoading, channelDetails} = useSelector(state => state.channel)
  return (
    <div>
      {/* Main dashboard container */}
      <div id='dashboard-wrapper' className='dashboard-outer'>
        <div className='dashboard-inner'>
          {/* Dashboard Wrapper */}
          <div className='dashboard-wrapper'>
            <div id='main-dashboard' className='section-wrapper'>
              {/* Channel Header */}
              {!isLoading && !isEmptyObject(channelDetails) && <ChannelHeader { ...channelDetails.channelInfo } />}
            </div>
            {!isLoading && !isEmptyObject(channelDetails) && <TopicList {...channelDetails} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumChannel
