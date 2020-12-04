/* eslint-disable complexity */
import React, { useState, useRef, useCallback } from 'react'
import { Grid, Tabs, Tab } from '@material-ui/core'
import navBar from '../../../hoc/navbar'
import ContactCenterEditProfile from './LeftRightSection/index'
import Wallet from './LeftRightSection/wallet'
import Settings from './Settings'
import ContactCenterFeed from './Feed/index'
import SettingsLeft from './Settings/SettingsLeft'

const ContactCenterProfile = () => {
  const [ activeTab, setActiveTab ] = useState(2)
  const spacingMid = activeTab === 2 ? 9 : 6
  const spacingTab = activeTab === 2 ? 8 : 12

  const currentSectionRef = useRef()
  const otherSectionRef = useRef()

  const [ selectedMenuItem, setSelectedMenuItem ] = useState(0)

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 }>
          <div className='left-section'>
            { activeTab === 0 && <ContactCenterEditProfile />}
            { activeTab === 1 && <ContactCenterEditProfile />}
            { activeTab === 2 && (
            <SettingsLeft
              setSelectedMenuItem={ setSelectedMenuItem }
              selectedMenuItem={ selectedMenuItem }
              scrollToTop={ scrollToTop }
            />
            )}
          </div>
        </Grid>
        <Grid
          item
          xl={ spacingMid }
          lg={ spacingMid }
          md={ spacingMid }
          sm={ spacingMid }
          className='custom-active-tabs'
        >
          <Grid item xl={ spacingTab } lg={ spacingTab } md={ spacingTab } sm={ spacingTab }>
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
                label='About'
              />
              <Tab
                className={ activeTab === 2 ? 'active-tab' : 'inactive-tab' }
                label='Settings'
              />

            </Tabs>
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
            <div>
              { activeTab === 0 && <ContactCenterFeed />}
              { activeTab === 1 && <Settings />}
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

        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
          {activeTab !== 2 && (
          <Wallet />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default navBar(ContactCenterProfile)
