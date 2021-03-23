import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import ConfirmationModal from '../../../../../components/CommonModal/ConfirmationModal'

const HiredActions = ({
  updateApplicationStatus,
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
        Resign
      </Button>
      <ConfirmationModal
        open={ openConfirmModal }
        handleClose={ () => setOpenConfirmModal(false) }
        message='Are you sure you want resign from this job?'
        confirmButtonText='Resign'
        handleConfirm={ () => updateApplicationStatus('resigned') }
      />
    </div>
  )
}

HiredActions.propTypes = {
  updateApplicationStatus: PropTypes.func.isRequired,

}

export default HiredActions
