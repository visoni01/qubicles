import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import GroupsList from './groups/list'
import CreateGroup from './groups/createOrUpdate'
import SelectedGroup from './groups/group'
import TrendingTopics from './trendingTopics'
import { addNewGroup } from '../../redux-saga/redux/actions'
import './styles.scss'

const Groups = () => {
  const [ selectedGroup, setSelectedGroup ] = useState(0)

  const { groups, isLoading } = useSelector((state) => state.groups)

  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedGroup === groups.length) {
      setSelectedGroup(0)
    }
  }, [ groups, setSelectedGroup, selectedGroup ])

  const createGroup = (groupData) => {
    dispatch(addNewGroup(groupData))
    setSelectedGroup(groups.length)
  }

  const removeNewGroupForm = () => setSelectedGroup(0)

  const sectionToRender = () => {
    if ((selectedGroup === 'new') || (!isLoading && groups.length === 0)) {
      return <CreateGroup handleSubmit={ createGroup } onCancelClick={ removeNewGroupForm } />
    }
    return (
      <SelectedGroup
        group={ groups && groups[ selectedGroup ] }
      />
    )
  }

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <GroupsList selectedGroup={ selectedGroup } setSelectedGroup={ setSelectedGroup } />
      </Grid>
      <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
        {sectionToRender()}
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <TrendingTopics />
      </Grid>
    </Grid>
  )
}

export default Groups
