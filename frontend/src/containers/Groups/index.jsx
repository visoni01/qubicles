import React from 'react'
import {
  Grid, Box, Typography, IconButton, InputBase, Button, Avatar, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment,
  faEllipsisV, faEye, faHeart, faSearch, faSlidersH,
} from '@fortawesome/free-solid-svg-icons'
import GroupsList from './groups'
import SelectedGroup from './group'
import TrendingTopics from './trendingTopics'
import { newNavBar } from '../../hoc/navbar'
import './styles.scss'

const Groups = () => (
  <Grid container spacing={ 3 }>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 } alignItems='flex-start'>
      <GroupsList />
    </Grid>
    <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 4 }>
      <SelectedGroup />
    </Grid>
    <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
      <TrendingTopics />
    </Grid>
  </Grid>
)

export default newNavBar(Groups)
