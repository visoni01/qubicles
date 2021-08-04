import {
  Button, IconButton, TextField,
} from '@material-ui/core'
import React from 'react'
import { ImageIcon } from '../../../assets/images/common'

const ChatControls = () => (
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
      rowsMax={ 4 }
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
)

export default ChatControls
