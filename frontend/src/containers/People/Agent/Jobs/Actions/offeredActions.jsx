import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import MessageButton from './messageButton'

const OfferedActions = ({ updateApplicationStatus }) => (
  <div>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-primary-small',
        label: 'button-primary-small-label',
      } }
      onClick={ () => updateApplicationStatus('hired') }
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
      onClick={ () => updateApplicationStatus('declined') }
    >
      Reject
    </Button>
  </div>
)

OfferedActions.propTypes = {
  updateApplicationStatus: PropTypes.func.isRequired,

}

export default OfferedActions
