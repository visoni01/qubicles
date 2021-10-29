import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const HiredActions = ({ handleUpdateStatus }) => (
  <Button
    className='wide-button'
    classes={ {
      root: 'button-secondary-small-red',
      label: 'button-secondary-small-label',
    } }
    onClick={ () => handleUpdateStatus('terminated') }
  >
    Terminate
  </Button>
)

HiredActions.propTypes = {
  handleUpdateStatus: PropTypes.func.isRequired,
}

export default HiredActions
