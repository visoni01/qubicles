import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { checkDisabledAddUnitButton, checkDisabledAddTestButton } from './helper'
import { unitPropType } from '../propTypes'

const SectionOptions = ({
  units, test, handleAddUnitButton, handleAddTestButton,
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
      disabled={ checkDisabledAddTestButton({ test }) }
      onClick={ handleAddTestButton }
    >
      Add Test
    </Button>
  </div>
)

SectionOptions.propTypes = {
  units: PropTypes.arrayOf(unitPropType).isRequired,
  test: PropTypes.shape({}).isRequired,
  handleAddUnitButton: PropTypes.func.isRequired,
  handleAddTestButton: PropTypes.func.isRequired,
}

export default SectionOptions
