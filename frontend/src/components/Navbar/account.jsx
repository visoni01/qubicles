import React, { useState, useCallback } from 'react'
import {
  Menu, MenuItem, IconButton, Avatar,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import User from '../../redux-saga/service/user'
import { showErrorMessage } from '../../redux-saga/redux/snackbar'
import { userLogoutSuccessful } from '../../redux-saga/redux/login'

const UserAccount = () => {
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
      dispatch(userLogoutSuccessful())
      return history.push('/login')
    }
    return dispatch(showErrorMessage())
  }

  return (
  // Temporary logout functionality.
    <>
      <IconButton
        className='profile-menu-container'
        onClick={ toggleDropdownOpen }
      >
        {/* TODO: Add first letter of user name */}
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
        <MenuItem onClick={ logOut }>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default UserAccount
