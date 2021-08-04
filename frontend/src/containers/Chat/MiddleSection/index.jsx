import React from 'react'
import { Box, Divider } from '@material-ui/core'
import ChatView from './chatView'
import { chats } from '../testData'
import '../styles.scss'
import ChatControls from './chatControls'

const MiddleCard = () => (
  <Box className='custom-box no-padding chat-section'>

    {/* Chat Body */}
    <div className='chat-section-body padding-20'>
      <ChatView
        chats={ chats && chats.data }
      />
    </div>

    {/* Chat Controls */}
    <div className='mb-5'>
      <Divider className='divider is-fullwidth no-margin-top' />
      <ChatControls />
    </div>
  </Box>
)

export default MiddleCard
