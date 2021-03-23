import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import ApplyJobModal from './ApplyJobModal'

const ApplyJobAction = ({
  clientId, jobId, agentUserId,
}) => {
  const [ openApplyJobModal, setOpenApplyJobModal ] = useState(false)
  return (
    <div>
      <Button
        className='wide-button'
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
        onClick={ () => setOpenApplyJobModal(true) }
      >
        Apply
      </Button>
      <ApplyJobModal
        open={ openApplyJobModal }
        handleClose={ () => setOpenApplyJobModal(false) }
        clientId={ clientId }
        jobId={ jobId }
        agentUserId={ agentUserId }
      />
    </div>
  )
}

ApplyJobAction.propTypes = {
  clientId: PropTypes.number.isRequired,
  jobId: PropTypes.number.isRequired,
  agentUserId: PropTypes.number.isRequired,
}

export default ApplyJobAction
