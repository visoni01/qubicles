import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { checkDisabledAddUnitButton } from './helper'

const SectionOptions = ({
  units, handleAddUnitButton,
}) => (
  <div className='content-options display-inline-flex justify-between'>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
      disabled={ checkDisabledAddUnitButton({ units }) }
      onClick={ handleAddUnitButton }
    >
      Add Unit
    </Button>
    <Button
      className='wide-button'
      classes={ {
        root: 'button-secondary-small',
        label: 'button-secondary-small-label',
      } }
    >
      Add Test
    </Button>
  </div>
)

SectionOptions.propTypes = {
  units: PropTypes.shape(PropTypes.any).isRequired,
  handleAddUnitButton: PropTypes.func.isRequired,
}

export default SectionOptions
