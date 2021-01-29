import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  flowIcon, webFormIcon, notesIcon, callbackIcon, historyIcon,
} from '../../../assets/images/agentDashboard'

const ContactMainActiveTabs = ({
  activeTab, setActiveTab,
}) => (
  <Tabs
    value={ activeTab }
    classes={ {
      indicator: 'call-center-agent-tabs-indicator',
    } }
    className='mb-10'
    onChange={ (_, tab) => setActiveTab(tab) }
  >
    <Tab
      label={ (
        <div className='display-inline-flex align-items-center'>
          <img src={ flowIcon } alt='' />
          <h4 className='h4 font-size-16x light ml-10'>Flow</h4>
        </div>
    ) }
      classes={ { root: 'call-center-agent-tab-root' } }
    />
    <Tab
      label={ (
        <div className='display-inline-flex align-items-center'>
          <img src={ webFormIcon } alt='' />
          <h4 className='h4 font-size-16x light ml-10'>Web Form</h4>
        </div>
    ) }
      classes={ { root: 'call-center-agent-tab-root' } }
    />
    <Tab
      label={ (
        <div className='display-inline-flex align-items-center'>
          <img src={ notesIcon } alt='' />
          <h4 className='h4 font-size-16x light ml-10'>Notes</h4>
        </div>
    ) }
      classes={ { root: 'call-center-agent-tab-root' } }
    />
    <Tab
      label={ (
        <div className='display-inline-flex align-items-center'>
          <img src={ callbackIcon } alt='' />
          <h4 className='h4 font-size-16x light ml-10'>Callback</h4>
        </div>
    ) }
      classes={ { root: 'call-center-agent-tab-root' } }
    />
    <Tab
      label={ (
        <div className='display-inline-flex align-items-center'>
          <img src={ historyIcon } alt='' />
          <h4 className='h4 font-size-16x light ml-10'>History</h4>
        </div>
    ) }
      classes={ { root: 'call-center-agent-tab-root' } }
    />
  </Tabs>
)

export default ContactMainActiveTabs

ContactMainActiveTabs.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
}
