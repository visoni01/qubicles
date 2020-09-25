import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  AppBar,
  Avatar, Container, Grid, IconButton, InputBase, Toolbar,
} from '@material-ui/core'
import {
  chatIcon, walletIcon, bellIcon,
} from '../../assets/images/icons/navBarIcons'
import UserMenu from './UserMenu'

const TopBar = () => (
  <AppBar
    color='transparent'
    className='topbar-root'
    elevation={ 0 }
  >
    <Container className='topbar-toolbar' maxWidth='lg' classes={ { maxWidthLg: 'container-max-width' } }>
      <Grid container>
        <Grid item className='search-input' lg={ 9 } md={ 9 } xs={ 9 }>
          <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
          <InputBase
            placeholder='Search'
            className='input-field'
          />
        </Grid>
        <Grid item lg={ 3 } md={ 3 } xs={ 3 } className='notification-icons'>
          <IconButton>
            <img src={ chatIcon } alt='Chat Icon' />
          </IconButton>
          <IconButton>
            <img src={ walletIcon } alt='Chat Icon' />
          </IconButton>
          <IconButton>
            <img src={ bellIcon } alt='Chat Icon' />
          </IconButton>
          <UserMenu />
        </Grid>
      </Grid>
    </Container>
  </AppBar>
)

export default TopBar
