import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  AppBar,
  Avatar, Grid, IconButton, InputBase, Toolbar,
} from '@material-ui/core'
import {
  chatIcon, walletIcon, bellIcon,
} from '../../assets/images/icons/navBarIcons'

const TopBar = () => (
  <AppBar
    color='transparent'
    className='topbar-root'
    elevation={ 0 }
  >
    <Toolbar className='topbar-toolbar'>
      <Grid container>
        <Grid item className='search-input' lg={ 8 } md={ 8 } xs={ 8 }>
          <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
          <InputBase
            placeholder='Search'
            className='input-field'
          />
        </Grid>
        <Grid item lg={ 4 } md={ 4 } xs={ 4 } className='notification-icons'>
          <IconButton>
            <img src={ chatIcon } alt='Chat Icon' />
          </IconButton>
          <IconButton>
            <img src={ walletIcon } alt='Chat Icon' />
          </IconButton>
          <IconButton>
            <img src={ bellIcon } alt='Chat Icon' />
          </IconButton>
          <Avatar className='topbar-avatar' />
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
)

export default TopBar
