/* eslint-disable complexity */
import React, { useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Tabs, Tab } from '@material-ui/core'
import LeftSection from './LeftRightSection'
import RightSection from './LeftRightSection/wallet'
import Settings from './Settings'
import Feed from './Feed'
import Resume from './Resume'
import SettingsMenu from '../../../components/Profile/Agent/settingsMenu'
import './styles.scss'

const AgentProfile = () => {
  const [ activeTab, setActiveTab ] = useState(0)
  const [ selectedMenuItem, setSelectedMenuItem ] = useState(0)

  const { settings } = useSelector((state) => state.agentDetails)
  const { userDetails } = useSelector((state) => state.login)

  const currentSectionRef = useRef()
  const otherSectionRef = useRef()

  const spacingMid = activeTab === 2 ? 9 : 6
  const spacingTab = activeTab === 2 ? 8 : 12

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <Grid container spacing={ 3 } justify='center'>
        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          <div className='left-section'>
            {(activeTab === 0 || activeTab === 1) && (
              <LeftSection
                userName={ settings.userName }
                rating={ settings.rating }
                name={ settings.fullName }
                location={ `${ settings.city }, ${ settings.state } ` }
                registrationDate={ settings.registrationDate }
                title={ settings.title }
                summary={ settings.summary }
                profilePic={ settings.profilePic }
                highestEducation={ settings.highestEducation }
                yearsOfExperience={ settings.yearsOfExperience }
                hourlyRate={ settings.hourlyRate }
                preferredJob={ settings.preferredJob }
                remoteJobs={ settings.remoteJobs }
                onVacation={ settings.onVacation }
                profileVisible={ settings.profileVisible }
                followers={ settings.followers }
                following={ settings.following }
              />
            )}
            { activeTab === 2 && (
              <SettingsMenu
                setSelectedMenuItem={ setSelectedMenuItem }
                selectedMenuItem={ selectedMenuItem }
                scrollToTop={ scrollToTop }
              />
            )}
          </div>
        </Grid>
        <Grid item xl={ spacingMid } lg={ spacingMid } md={ 9 } sm={ 12 } xs={ 12 } className='custom-active-tabs'>
          <Grid item xl={ spacingTab } lg={ spacingTab } md={ 12 } sm={ 12 } xs={ 12 }>
            <Tabs
              value={ activeTab }
              onChange={ (_, val) => setActiveTab(val) }
            >
              <Tab
                className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' }
                label='Feed'
              />
              <Tab
                className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' }
                label='Resume'
              />
              <Tab
                className={ activeTab === 2 ? 'active-tab' : 'inactive-tab' }
                label='Settings'
              />
            </Tabs>
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
            <div>
              { activeTab === 0 && <Feed userId={ userDetails.user_id } />}
              { activeTab === 1 && <Resume />}
              { activeTab === 2 && (
                <Settings
                  selectedMenuItem={ selectedMenuItem }
                  currentSectionRef={ currentSectionRef }
                  otherSectionRef={ otherSectionRef }
                  scrollToTop={ scrollToTop }
                />
              )}
            </div>
          </Grid>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
          {activeTab !== 2 && <RightSection />}
        </Grid>
      </Grid>
    </div>
  )
}

export default AgentProfile
