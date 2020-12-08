import React, { useState, useCallback } from 'react'
import {
  IconButton, Avatar, Button, Divider, Popover,
} from '@material-ui/core'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import User from '../../redux-saga/service/user'
import InviteModal from '../../containers/InviteFriendsPage/InviteModal'
import { showErrorMessage } from '../../redux-saga/redux/snackbar'
import { userLogoutSuccessful } from '../../redux-saga/redux/login'
import { kareem } from '../../assets/images/avatar'
import {
  chatIcon, walletIcon, settingIcon, logoutIcon,
} from '../../assets/images/icons/navBarIcons'
import ROUTE_PATHS from '../../routes/routesPath'

const UserMenu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const toggleDropdownOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget)
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

  // Temporary Invite Modal methods
  const [ openInviteDialog, setOpenInviteDialog ] = useState(false)
  const toggleInviteDialogOpen = () => {
    setOpenInviteDialog((openInvite) => !openInvite)
    setIsDropdownOpen(false)
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
      <Popover
        disableScrollLock
        open={ isDropdownOpen }
        className='mt-60'
        onClose={ toggleDropdownOpen }
        anchorEl={ anchorEl }
      >
        <div className='user-menu'>
          <Avatar className='profile-pic' alt='Remy Sharp' src={ kareem } />
          <h2 className='h3 text-center mb-5'>{userDetails.full_name}</h2>

          <Link to={ ROUTE_PATHS.COMPANY_PROFILE } className='mb-10 text-center primary-text-link'>
            View Profile
          </Link>
          <Divider className='mb-10' variant='middle' />
          <div className='options'>
            <Button
              size='small'
              className='option'
              onClick={ toggleInviteDialogOpen }
              startIcon={ <img src={ chatIcon } alt='' /> }
            >
              <p className='option-name'> Invite Friends </p>
            </Button>
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
              <p className='option-name color-red'> Logout </p>
            </Button>
          </div>
        </div>

      </Popover>
      <InviteModal
        open={ openInviteDialog }
        handleClose={ toggleInviteDialogOpen }
      />
    </>
  )
}

export default UserMenu
