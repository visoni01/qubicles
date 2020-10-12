import React, { useState } from 'react'
import {
  Grid, Tabs, Tab,
} from '@material-ui/core'
import JobsList from './Jobs/JobsList'
import JobsPage from './Jobs/JobsPage'
import TalentFilter from './Talent/TalentFilter'
import TalentWrap from '../../People/talentWrap'
import TrainingWrap from '../../People/trainingWrap'
import TopTalent from './Talent/TopTalent'
import { newNavBar } from '../../../hoc/navbar'
import './styles.scss'

const People = () => {
  const [ activeTab, setActivetab ] = useState(0)
  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 } alignItems='flex-start'>
        <div>
          { activeTab === 0 && <JobsList />}
          { activeTab === 1 && <TalentFilter />}
          { activeTab === 2 && <JobsList />}
        </div>
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
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
          { activeTab === 1 && <TalentWrap />}
          { activeTab === 2 && <TrainingWrap />}
        </div>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <TopTalent />
      </Grid>
    </Grid>
  )
}

export default newNavBar(People)
