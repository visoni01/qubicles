import React, { useState } from 'react'
import {
  Grid, Tabs, Tab,
} from '@material-ui/core'
import JobsList from './Jobs/JobsList'
import ContactCenterIntro from './Jobs/ContactCenterIntro'
import JobsPage from './Jobs/JobsPage'
import JobPost from './Jobs/JobPost'
import TalentFilter from './Talent/TalentFilter'
import TalentWrap from '../../People/talentWrap'
import TalentPage from './Talent/TalentPage'
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
          { activeTab === 1 && <ContactCenterIntro />}
          {/* { activeTab === 1 && <TalentFilter />} */}
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
          {/* { activeTab === 0 && <JobPost />} */}
          { activeTab === 1 && <TalentPage />}
          { activeTab === 2 && <TrainingWrap />}
        </div>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <TopTalent heading='Top Talent' />
      </Grid>
    </Grid>
  )
}

export default newNavBar(People)
