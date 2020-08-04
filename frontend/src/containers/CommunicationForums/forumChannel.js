import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ChannelHeader from '../../components/CommunicationForums/channel/ChannelHeader'
import TopicList from '../../components/CommunicationForums/channel/TopicWrap'
import { channelDataFetchingStart } from '../../redux-saga/redux/actions'
import { isEmptyObject } from '../../utils/common'
import './style.scss'
import withNavBar from '../../hoc/navbar'

const ForumChannel = () => {
  const { channelId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(channelDataFetchingStart({ channelId }))
  }, [ dispatch, channelId ])
  const { isLoading, channelDetails } = useSelector((state) => state.channel)

  return (
    <div>
      {/* Main dashboard container */}
      <div className='dashboard-inner'>
        {/* Dashboard Wrapper */}
        <div className='dashboard-wrapper'>
          <div id='main-dashboard' className='section-wrapper'>
            {/* Channel Header */}
            {!isLoading && !isEmptyObject(channelDetails) && <ChannelHeader { ...channelDetails.channelInfo } />}
          </div>

          {!isLoading && !isEmptyObject(channelDetails) && <TopicList { ...channelDetails } />}
        </div>
      </div>
    </div>
  )
}

export default withNavBar(ForumChannel)
