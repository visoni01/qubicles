import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import MessageButton from './messageButton'

const InvitedActions = ({
  updateApplicationStatus, handleSendMessage, isNewChatLoading,
}) => (
  <div>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-primary-small',
        label: 'button-primary-small-label',
      } }
      onClick={ () => updateApplicationStatus('screening') }
    >
      Accept
    </Button>
    <MessageButton handleSendMessage={ handleSendMessage } isLoading={ isNewChatLoading } />
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small-red',
        label: 'button-secondary-small-label',
      } }
      onClick={ () => updateApplicationStatus('rejected') }
    >
      Reject
    </Button>
  </div>
)

InvitedActions.defaultProps = {
  isNewChatLoading: false,
}

InvitedActions.propTypes = {
  updateApplicationStatus: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  isNewChatLoading: PropTypes.bool,
}

export default InvitedActions
