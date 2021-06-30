import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import ApplyJobModal from './applyJobModal'

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

ApplyJobAction.defaultProps = {
  clientId: null,
  jobId: null,
  agentUserId: null,
}

ApplyJobAction.propTypes = {
  clientId: PropTypes.number,
  jobId: PropTypes.number,
  agentUserId: PropTypes.number,
}

export default ApplyJobAction
