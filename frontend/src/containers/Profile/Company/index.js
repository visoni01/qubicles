/* eslint-disable complexity */
import React, {
  useState, useRef, useCallback, useEffect,
} from 'react'
import { Grid, Tabs, Tab } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ContactCenterEditProfile from './LeftRightSection/index'
import Wallet from './LeftRightSection/wallet'
import Settings from './Settings'
import ContactCenterFeed from './Feed/index'
import SettingsLeft from './Settings/settingsLeft'
import About from './About/index'
import ROUTE_PATHS from '../../../routes/routesPath'

const ContactCenterProfile = () => {
  const [ activeTab, setActiveTab ] = useState(1)
  const spacingMid = activeTab === 2 ? 9 : 6
  const spacingTab = activeTab === 2 ? 8 : 12
  const currentSectionRef = useRef()
  const otherSectionRef = useRef()
  const { userDetails } = useSelector((state) => state.login)
  const history = useHistory()

  const [ selectedMenuItem, setSelectedMenuItem ] = useState(0)

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (userDetails && userDetails.user_code !== 'employer') {
      history.push(ROUTE_PATHS.DASHBOARD)
    }
  }, [ userDetails, history ])

  return (
    <div>
      <Grid container spacing={ 3 } justify='center'>
        <Grid item xl={ 3 } lg={ 3 } md={ 9 } sm={ 12 } xs={ 12 }>
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
          md={ 9 }
          sm={ 12 }
          xs={ 12 }
          className='custom-active-tabs'
        >
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
              { activeTab === 1 && <About />}
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
          {activeTab !== 2 && (
          <Wallet />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default ContactCenterProfile
