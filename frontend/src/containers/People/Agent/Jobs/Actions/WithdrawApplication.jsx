import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { formatDate } from '../../../../../utils/common'
import ConfirmationModal from '../../../../../components/CommonModal/confirmationModal'

const WithdrawApplication = ({
  updateApplicationStatus, application, applied,
}) => {
  const [ openConfirmModal, setOpenConfirmModal ] = useState(false)

  return (
    <div>
      <Button
        className='wide-button'
        classes={ {
          root: 'button-secondary-small-red',
          label: 'button-secondary-small-label',
        } }
        onClick={ () => setOpenConfirmModal(true) }
      >
        Withdraw
      </Button>
      {applied && (
      <p className='para light text-center'>
        {`Applied at ${ formatDate(application.createdOn, 'hh:mm a, DD/MM/YYYY') }`}
      </p>
      )}
      <ConfirmationModal
        open={ openConfirmModal }
        handleClose={ () => setOpenConfirmModal(false) }
        message='Are you sure you want to withdraw this application?'
        confirmButtonText='Withdraw'
        handleConfirm={ () => updateApplicationStatus('declined') }
      />
    </div>
  )
}
WithdrawApplication.defaultProps = {
  applied: true,
}
WithdrawApplication.propTypes = {
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
  updateApplicationStatus: PropTypes.func.isRequired,
  applied: PropTypes.bool,
}

export default WithdrawApplication
