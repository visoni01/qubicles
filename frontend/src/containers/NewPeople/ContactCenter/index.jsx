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

const People = () => {
  const [ activeTab, setActivetab ] = useState(2)
  const spacingMid = activeTab === 2 ? 9 : 6
  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 } alignItems='flex-start'>
        <div>
          { activeTab === 0 && <JobsList />}
          { activeTab === 1 && <JobsList />}
          { activeTab === 2 && <JobsList />}
        </div>
      </Grid>
      <Grid item xl={ spacingMid } lg={ spacingMid } md={ spacingMid } sm={ 4 }>
        <Tabs
          value={ activeTab }
          indicatorColor='primary'
          textColor='primary'
          onChange={ (_, tab) => setActivetab(tab) }
          className='ml-20'
        >
          <Tab label='Jobs' />
          <Tab label='Talent' />
          <Tab label='Training' />
        </Tabs>
        {/* Forum Category */}
        <div>
          { activeTab === 0 && <JobsPage />}
          { activeTab === 1 && <TalentPage />}
        </div>
      </Grid>
      {activeTab !== 2 && (
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <TopTalent heading='Top Talent' />
      </Grid>
      )}
    </Grid>
  )
}

export default newNavBar(People)
