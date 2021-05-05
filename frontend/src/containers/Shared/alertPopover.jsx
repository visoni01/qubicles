import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popover } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import './styles.scss'

const AlertPopover = ({
  open, buttonOnClick, alertTitle, alertBody,
}) => (
  <Popover
    open={ open }
    disableScrollLock
    classes={ {
      root: 'alert-popover-root',
      paper: 'alert-popover-paper',
    } }
  >
    <Alert
      className='alert-error'
      severity='error'
      action={ (
        <Button
          color='inherit'
          size='small'
          classes={ {
            label: 'para bold sz-xl',
          } }
          onClick={ buttonOnClick }
        >
          OK
        </Button>
        ) }
    >
      <AlertTitle>
        <div>
          <h3 className='h3'>{alertTitle}</h3>
        </div>
      </AlertTitle>
      <p className='para bold'>{alertBody}</p>
    </Alert>
  </Popover>
)

AlertPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
  alertTitle: PropTypes.string.isRequired,
  alertBody: PropTypes.string.isRequired,
}

export default AlertPopover
