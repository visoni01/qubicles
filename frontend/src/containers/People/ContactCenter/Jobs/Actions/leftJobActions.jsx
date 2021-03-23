import React from 'react'
import {
  Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'

const LeftJobActions = ({ application, handleUpdateStatus }) => (
  <>
    {application.status === 'declined' && (
    <Button
      className='wide-button'
      classes={ {
        root: 'button-primary-small',
        label: 'button-primary-small-label',
      } }
      onClick={ () => handleUpdateStatus('invited') }
    >
      Invite
    </Button>
    )}
    {application.status === 'terminated' && (
    <Button
      className='wide-button'
      classes={ {
        root: 'button-primary-small',
        label: 'button-primary-small-label',
      } }
      onClick={ () => handleUpdateStatus('hired') }
    >
      Rehire
    </Button>
    )}
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
    >
      Message
    </Button>
  </>
)

LeftJobActions.propTypes = {
  application: PropTypes.shape({
    applicationId: PropTypes.number.isRequired,
    agentUserId: PropTypes.number.isRequired,
    clientId: PropTypes.number.isRequired,
    jobId: PropTypes.number.isRequired,
    coverLetter: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    updateOn: PropTypes.string.isRequired,
  }).isRequired,
  handleUpdateStatus: PropTypes.func.isRequired,
}

export default LeftJobActions
