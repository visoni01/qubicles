import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import '../styles.scss'

const MessageButton = ({ handleSendMessage, isLoading }) => (
  <div>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
      onClick={ handleSendMessage }
      disabled={ isLoading }
    >
      Message
      {isLoading && <CircularProgress size={ 20 } className='message-button-loader' />}
    </Button>
  </div>
)

MessageButton.defaultProps = {
  isLoading: false,
}

MessageButton.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

export default MessageButton
