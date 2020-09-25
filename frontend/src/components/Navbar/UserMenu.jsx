import React, { useState, useCallback } from 'react'
import {
  Menu, IconButton, Avatar, Button, makeStyles, Divider,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import User from '../../redux-saga/service/user'
import { showErrorMessage } from '../../redux-saga/redux/snackbar'
import { userLogoutSuccessful } from '../../redux-saga/redux/login'
import { kareem } from '../../assets/images/avatar'
import { walletIcon, settingIcon, logoutIcon } from '../../assets/images/icons/navBarIcons'

const UserMenu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)

  const toggleDropdownOpen = useCallback(() => {
    // eslint-disable-next-line
    setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen)
  }, [ setIsDropdownOpen ])

  const logOut = async () => {
    const { status } = await User.logout()
    if (status === 200) {
      history.push('/login')
      return dispatch(userLogoutSuccessful())
    }
    return dispatch(showErrorMessage())
  }

  return (
    <>
      <IconButton
        className='topbar-avatar'
        onClick={ toggleDropdownOpen }
      >
        <Avatar className='avatar'>
          {userDetails && userDetails.full_name && userDetails.full_name[ 0 ].toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        classes={ {
          paper: 'account-dropdown-list',
        } }
        open={ isDropdownOpen }
        onClose={ toggleDropdownOpen }
      >
        <div className='user-menu'>
          <Avatar className='profile-pic' alt='Remy Sharp' src={ kareem } />
          <h2 className='user-name'>{userDetails.full_name}</h2>
          <h3 className='view-profile'> View Profile</h3>
          <Divider className='divider' variant='middle' />
          <div className='options'>
            <Button
              size='small'
              className='option'
              startIcon={ <img src={ walletIcon } alt='' /> }
            >
              <p className='option-name'> Wallet </p>
            </Button>
            <Button
              size='small'
              className='option'
              startIcon={ <img src={ settingIcon } alt='' /> }
            >
              <p className='option-name'> Settings </p>
            </Button>
            <Button
              size='small'
              className='option'
              onClick={ logOut }
              startIcon={ <img src={ logoutIcon } alt='' /> }
            >
              <p className='option-name logout-text'> Logout </p>
            </Button>
          </div>
        </div>
      </Menu>
    </>
  )
}

export default UserMenu
