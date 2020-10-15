/* eslint-disable complexity */
import React, { useState } from 'react'
import {
  Grid, Tabs, Tab,
} from '@material-ui/core'
import JobsList from './Jobs/JobsList'
import JobsPage from './Jobs/JobsPage'
import JobPost from './Jobs/JobPost'
import TalentFilter from './Talent/TalentFilter'
import TalentPage from './Talent/TalentPage'
import TopTalent from './Talent/TopTalent'
import { newNavBar } from '../../../hoc/navbar'
import './styles.scss'
import TrainingFilter from './Training/TrainingFilter'
import TrainingWrap from './Training/TrainingWrap'
import './newStyles.scss'

const People = () => {
  const [ activeTab, setActivetab ] = useState(0)
  const spacingMid = activeTab === 2 ? 9 : 6
  const spacingTab = activeTab === 2 ? 8 : 12
  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 } alignItems='flex-start'>
        <div>
          { activeTab === 0 && <JobsList />}
          { activeTab === 1 && <JobsList />}
          { activeTab === 2 && <TrainingFilter />}
        </div>
      </Grid>
      <Grid
        container
        // spacing={ 2 }
        item
        xl={ spacingMid }
        lg={ spacingMid }
        md={ spacingMid }
        sm={ spacingMid }
        className='people-active-tabs'
      >
        <Grid item xl={ spacingTab } lg={ spacingTab } md={ spacingTab } sm={ spacingTab }>
          <Tabs
            value={ activeTab }
            onChange={ (_, tab) => setActivetab(tab) }
          >
            <Tab label='Jobs' className={ activeTab === 0 ? 'active-tab' : 'inactive-tab' } />
            <Tab label='Talent' className={ activeTab === 1 ? 'active-tab' : 'inactive-tab' } />
            <Tab label='Training' className={ activeTab === 2 ? 'active-tab' : 'inactive-tab' } />
          </Tabs>
        </Grid>
        {/* Forum Category */}
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 }>
          <div>
            { activeTab === 0 && <JobsPage />}
            { activeTab === 1 && <TalentPage />}
            { activeTab === 2 && <TrainingWrap />}
          </div>
        </Grid>
      </Grid>

      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        {activeTab !== 2 && (
        <TopTalent heading='Top Talent' />
        )}
      </Grid>
    </Grid>
  )
}

export default newNavBar(People)
