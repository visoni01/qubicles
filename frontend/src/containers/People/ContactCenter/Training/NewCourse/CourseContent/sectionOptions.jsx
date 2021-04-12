import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { checkDisabledAddUnitButton, checkDisabledAddTestButton } from './helper'

const SectionOptions = ({
  units, handleAddUnitButton, handleAddTestButton,
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
      disabled={ checkDisabledAddTestButton({ units }) }
      onClick={ handleAddTestButton }
    >
      Add Test
    </Button>
  </div>
)

SectionOptions.propTypes = {
  units: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleAddUnitButton: PropTypes.func.isRequired,
  handleAddTestButton: PropTypes.func.isRequired,

}

export default SectionOptions
