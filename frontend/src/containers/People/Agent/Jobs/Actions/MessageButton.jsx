import React from 'react'
import { Button } from '@material-ui/core'

const MessageButton = () => (
  <div>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
    >
      Message
    </Button>
  </div>
)

export default MessageButton
