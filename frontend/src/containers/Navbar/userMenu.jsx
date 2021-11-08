import React, { useState, useCallback, useEffect } from 'react'
import {
  IconButton, Avatar, Button, Divider, Popover,
} from '@material-ui/core'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import User from '../../redux-saga/service/user'
import InviteModal from '../InviteFriendsPage/InviteModal'
import {
  showErrorMessage, getCompanyProfileSettingsApiStart, agentProfileSettingsApiStart,
} from '../../redux-saga/redux/actions'
import { userLogoutSuccessful } from '../../redux-saga/redux/user/login'
import {
  chatIcon, walletIcon, settingIcon, logoutIcon,
} from '../../assets/images/icons/navBarIcons'
import ROUTE_PATHS, { PROFILE_ROUTE } from '../../routes/routesPath'
import { REQUEST_TYPES, USERS } from '../../utils/constants'
import '../../components/Navbar/style.scss'

const UserMenu = () => {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const { userDetails } = useSelector((state) => state.login)
  const {
    settings: clientSettings, isFetchSuccess, isFetchLoading,
  } = useSelector((state) => state.clientDetails)
  const {
    settings: agentSettings, success, isLoading, requestType,
  } = useSelector((state) => state.agentDetails)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userDetails && userDetails.is_post_signup_completed && _.isEqual(userDetails.user_code, USERS.EMPLOYER)) {
      if (!isFetchLoading && !isFetchSuccess) {
        dispatch(getCompanyProfileSettingsApiStart())
      }
    }
  }, [ dispatch, userDetails, isFetchLoading, isFetchSuccess ])

  useEffect(() => {
    if (userDetails && userDetails.is_post_signup_completed
      && [ USERS.AGENT, USERS.TRAINER, USERS.SUPERVISOR, USERS.QA_SUPPORT ].includes(userDetails.user_code)) {
      if (!isLoading && !success && !requestType) {
        dispatch(agentProfileSettingsApiStart({
          requestType: REQUEST_TYPES.FETCH,
        }))
      }
    }
  }, [ dispatch, userDetails, isLoading, success, requestType ])

  const toggleDropdownOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget)
    // eslint-disable-next-line
    setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen)
  }, [ setIsDropdownOpen ])

  const logOut = async () => {
    const { status } = await User.logout()
    if (status === 200) {
      history.push('/login')
      return dispatch(userLogoutSuccessful({
        userType: userDetails.user_code,
      }))
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
          <Avatar
            className='profile-pic'
            alt={ userDetails && userDetails.full_name }
            src={ userDetails && userDetails.user_code === USERS.AGENT
              ? (agentSettings && agentSettings.profilePic)
              : (clientSettings && clientSettings.profilePic) }
          />
          <h2 className='h3 text-center mb-5'>{userDetails && userDetails.full_name}</h2>

          <Link to={ PROFILE_ROUTE } className='mb-10 text-center primary-text-link'>
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
              onClick={ () => history.push(ROUTE_PATHS.WALLET) }
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

      {openInviteDialog && (
        <InviteModal
          open={ openInviteDialog }
          handleClose={ toggleInviteDialogOpen }
        />
      )}
    </>
  )
}

export default UserMenu
