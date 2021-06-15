import React from 'react'
import {
  Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import TextDivider from '../../../../../components/CommonModal/textDivider'

const ScreeningActions = ({ handleUpdateStatus }) => (
  <>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-primary-small',
        label: 'button-primary-small-label',
      } }
      onClick={ () => handleUpdateStatus('training') }
    >
      Move to training
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
        onClick={ () => handleUpdateStatus('offered') }
      >
        Offer Job
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

ScreeningActions.propTypes = {
  handleUpdateStatus: PropTypes.func.isRequired,
}

export default ScreeningActions
