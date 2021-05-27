import React from 'react'
import {
  AppBar,
  Container, IconButton, InputBase,
} from '@material-ui/core'
import {
  chatIcon, walletIcon, bellIcon,
} from '../../assets/images/icons/navBarIcons'
import UserMenu from './userMenu'
import { SearchIcon } from '../../assets/images/common'

const TopBar = () => (
  <AppBar
    color='transparent'
    className='topbar-root'
    elevation={ 0 }
  >
    <Container className='topbar-toolbar' maxWidth='lg' classes={ { maxWidthLg: 'container-max-width' } }>
      <div className='display-inline-flex justify-between is-fullwidth'>
        <div className='display-inline-flex is-fullwidth search-input'>
          <SearchIcon className='ml-10 mr-10 align-self-center' />
          <InputBase
            placeholder='Search'
            className='input-field'
          />
        </div>
        <div className='notification-icons'>
          <IconButton className='notification-button'>
            <img src={ chatIcon } alt='Chat Icon' />
          </IconButton>
          <IconButton className='notification-button'>
            <img src={ walletIcon } alt='Chat Icon' />
          </IconButton>
          <IconButton className='notification-button'>
            <img src={ bellIcon } alt='Chat Icon' />
          </IconButton>
          <UserMenu />
        </div>
      </div>
    </Container>
  </AppBar>
)

export default TopBar
