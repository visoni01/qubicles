/* eslint-disable complexity */
import React, {
  useState,
} from 'react'
import { Grid, Tabs, Tab } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import navBar from '../../../hoc/navbar'
import OtherCompanyIntro from './LeftRightSection/otherCompanyIntro'
import SimilarCompanies from './LeftRightSection/similarCompanies'
import OtherContactCenterFeed from './Feed/index'
import OtherCompanyAbout from './About/index'
import OpenPosition from './LeftRightSection/openPosition'

const OtherContactCenterProfile = () => {
  const [ activeTab, setActiveTab ] = useState(0)
  const spacingMid = activeTab === 2 ? 9 : 6
  const spacingTab = activeTab === 2 ? 8 : 12

  const { companyId } = useParams()
  return (
    <div>
      <Grid container spacing={ 3 }>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 }>
          <div className='left-section'>
            { activeTab === 0 && <OtherCompanyIntro />}
            { activeTab === 1 && <OtherCompanyIntro />}
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

            </Tabs>
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
            <div>
              { activeTab === 0 && <OtherContactCenterFeed companyId={ companyId } />}
              { activeTab === 1 && <OtherCompanyAbout />}
            </div>
          </Grid>
        </Grid>

        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
          {activeTab !== 1 && (
            <OpenPosition />
          )}
          <SimilarCompanies heading='Similar Companies' />
        </Grid>
      </Grid>
    </div>
  )
}

export default navBar(OtherContactCenterProfile)
