import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import ChannelHeader from '../../components/CommunicationForums/channel/ChannelHeader'
import TopicWrap from '../../components/CommunicationForums/channel/TopicWrap'
import { channelDetailsFetchingStart } from '../../redux-saga/redux/actions'
import './style.scss'
import withNavBar from '../../hoc/navbar'

const ForumChannel = () => {
  const { channelId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(channelDetailsFetchingStart({ channelId }))
  }, [ dispatch, channelId ])
  const { isLoading, channelDetails } = useSelector((state) => state.channel)
  const isChannelDetails = !_.isEmpty(channelDetails)
  return (
    <div>
      {/* Main dashboard container */}
      <div className='dashboard-inner'>
        {/* Dashboard Wrapper */}
        <div className='dashboard-wrapper'>
          <div id='main-dashboard' className='section-wrapper'>
            {/* Channel Header */}
            {!isLoading && isChannelDetails && <ChannelHeader { ...channelDetails } />}
          </div>
          {/* Topics List */}
          {!isLoading && isChannelDetails && <TopicWrap channelDetails={ channelDetails } />}
        </div>
      </div>
    </div>
  )
}

export default withNavBar(ForumChannel)
