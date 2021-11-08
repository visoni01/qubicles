import React from 'react'
import { Grid, Button, Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InactiveCallPanel from './inactiveCallPanel'
import ActiveCallPanel from './activeCallPanel'

const CallButtons = ({
  setOpenContactsModal, setOpenCallbackModal, setOpenCallLogsModal, activeCall, setActiveCall,
}) => (
  <Box className='custom-box is-fullwidth mt-10 mb-20'>
    <Grid item container spacing={ 3 } direction='row' className='calls-buttons' alignItems='center'>
      <Grid item lg={ 3 } classes={ { item: 'mt-20 mb-20' } }>
        <Button
          classes={ {
            root: `button-primary-large is-fullwidth ${ activeCall ? 'wait-btn-active' : '' }`,
            label: 'button-primary-large-label wait-btn-label pl-10 pr-20',
          } }
          onClick={ () => setActiveCall((current) => !current) }
        >
          <div className='display-inline-flex is-fullwidth justify-between align-items-center'>
            <span className='para wait-btn-label'>
              {activeCall ? 'Active Call' : 'Waiting For A Call'}
            </span>
            <div>
              <span className='para wait-btn-label'> 2:43 </span>
              <FontAwesomeIcon icon={ faChevronDown } className='ml-20 custom-fa-icon white' />
            </div>
          </div>
        </Button>
      </Grid>
      {activeCall ? (
        <ActiveCallPanel
          setOpenContactsModal={ setOpenContactsModal }
        />
      ) : (
        <InactiveCallPanel
          setOpenContactsModal={ setOpenContactsModal }
          setOpenCallbackModal={ setOpenCallbackModal }
          setOpenCallLogsModal={ setOpenCallLogsModal }
        />
      )}
    </Grid>
  </Box>
)

CallButtons.defaultProps = {
  setOpenContactsModal: () => {},
  setOpenCallbackModal: () => {},
  setOpenCallLogsModal: () => {},
}

CallButtons.propTypes = {
  setOpenContactsModal: PropTypes.func,
  setOpenCallbackModal: PropTypes.func,
  setOpenCallLogsModal: PropTypes.func,
  setActiveCall: PropTypes.func.isRequired,
  activeCall: PropTypes.bool.isRequired,
}

export default CallButtons
