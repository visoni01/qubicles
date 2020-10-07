import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import GroupsList from './groups'
import SelectedGroup from './group'
import TrendingTopics from './trendingTopics'
import { newNavBar } from '../../hoc/navbar'
import './styles.scss'

const Groups = () => {
  const { groups } = useSelector((state) => state.groups)
  const [ selectedGroupIndex, setSelectedGroup ] = useState(0)

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <GroupsList selectedGroup={ selectedGroupIndex } setSelectedGroup={ setSelectedGroup } />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        <SelectedGroup group={ groups && groups[ selectedGroupIndex ] } />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <TrendingTopics />
      </Grid>
    </Grid>
  )
}

export default newNavBar(Groups)
