import React from 'react'
import {
  Box, Button, Divider, IconButton, TextField,
} from '@material-ui/core'
import { ImageIcon } from '../../../assets/images/common'
import ChatView from './chatView'
import { chats } from '../testData'
import '../styles.scss'

const MiddleCard = () => (
  <Box className='custom-box no-padding chat-section'>

    {/* Chat Body */}
    <div className='chat-section-body padding-20'>
      <ChatView
        chats={ chats && chats.data }
      />
    </div>

    {/* Chat Controls */}
    <div>
      <Divider className='divider is-fullwidth no-margin-top' />
      <div className='is-flex is-between align-items-start chat-section-footer'>
        <IconButton className='no-padding image-icon'>
          <ImageIcon />
        </IconButton>

        <TextField
          className='is-fullwidth message-field'
          defaultValue=''
          onChange=''
          placeholder='Write a message...'
          multiline
          margin='dense'
          variant='outlined'
          rowsMax={ 5 }
        />

        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          Send
        </Button>
      </div>
    </div>
  </Box>
)

export default MiddleCard
