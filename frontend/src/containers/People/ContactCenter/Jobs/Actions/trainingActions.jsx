import React from 'react'
import {
  Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import TextDivider from '../../../TextDivider'

const TrainingActions = ({ handleUpdateStatus }) => (
  <>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-primary-small',
        label: 'button-primary-small-label',
      } }
      onClick={ () => handleUpdateStatus('offered') }
    >
      Offer Job
    </Button>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
    >
      Message
    </Button>
    <div className='mt-30 mb-10'>
      <TextDivider message='Evaluating' />
    </div>
    <div className='mb-30'>
      <Button
        className='wide-button'
        classes={ {
          root: 'button-secondary-small',
          label: 'button-secondary-small-label',
        } }
        onClick={ () => handleUpdateStatus('screening') }
      >
        Move to screening
      </Button>
    </div>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small-red',
        label: 'button-secondary-small-label',
      } }
      onClick={ () => handleUpdateStatus('declined') }
    >
      Cancel
    </Button>
  </>
)

TrainingActions.propTypes = {
  handleUpdateStatus: PropTypes.func.isRequired,
}

export default TrainingActions
