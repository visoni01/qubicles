import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import TextDivider from '../../../../../components/CommonModal/textDivider'

const OfferedActions = ({ handleUpdateStatus, handleSendMessage, isNewChatLoading }) => (
  <>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-primary-small',
        label: 'button-primary-small-label',
      } }
      onClick={ () => handleUpdateStatus('hired') }
    >
      Hire
    </Button>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
      onClick={ handleSendMessage }
      disabled={ isNewChatLoading }
    >
      Message
      {isNewChatLoading && <CircularProgress size={ 20 } className='message-button-loader' />}
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
      <Button
        className='wide-button'
        classes={ {
          root: 'button-secondary-small',
          label: 'button-secondary-small-label',
        } }
        onClick={ () => handleUpdateStatus('training') }
      >
        Move to training
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

OfferedActions.propTypes = {
  handleUpdateStatus: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  isNewChatLoading: PropTypes.bool,
}

OfferedActions.defaultProps = {
  isNewChatLoading: false,
}

export default OfferedActions
