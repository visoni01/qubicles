import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import MessageButton from './MessageButton'

const InvitedActions = ({
  updateApplicationStatus,
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
    <MessageButton />
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

InvitedActions.propTypes = {
  updateApplicationStatus: PropTypes.func.isRequired,

}

export default InvitedActions
