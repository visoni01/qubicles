import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import MessageButton from './messageButton'
import WithdrawApplication from './withdrawApplication'
import { VIEW_COURSE_ROUTE } from '../../../../../routes/routesPath'

const ScreeningActions = ({
  updateApplicationStatus, application,
}) => {
  const history = useHistory()
  return (
    <div>
      {application.status === 'screening' && (
      <Button
        className='wide-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
        onClick={ () => updateApplicationStatus('training') }
      >
        Training
      </Button>
      )}
      {application.status === 'training' && (
      <Button
        className='wide-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
        onClick={ () => history.push(`${ VIEW_COURSE_ROUTE }/1`) }
      >
        Go To Training
      </Button>
      )}
      <MessageButton />
      <WithdrawApplication
        updateApplicationStatus={ updateApplicationStatus }
        application={ application }
        applied={ false }
      />
    </div>
  )
}

ScreeningActions.propTypes = {
  updateApplicationStatus: PropTypes.func.isRequired,
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
}

export default ScreeningActions
