import React from 'react'
import {
  AppBar, Container, IconButton, InputBase,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { chatIcon, walletIcon } from '../../assets/images/icons/navBarIcons'
import UserMenu from '../../containers/Navbar/userMenu'
import { SearchIcon } from '../../assets/images/common'
import Notifications from '../../containers/Navbar/notifications'
import { CHAT_ROUTE } from '../../routes/routesPath'

const TopBar = () => {
  const history = useHistory()

  return (
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
          <div className='topbar-icons'>
            <IconButton
              className='topbar-button'
              onClick={ () => history.push({ pathname: CHAT_ROUTE }) }
            >
              <img src={ chatIcon } alt='Chat Icon' />
            </IconButton>

            <IconButton className='topbar-button'>
              <img src={ walletIcon } alt='Wallet Icon' />
            </IconButton>

            <Notifications />

            <UserMenu />
          </div>
        </div>
      </Container>
    </AppBar>
  )
}

export default TopBar
