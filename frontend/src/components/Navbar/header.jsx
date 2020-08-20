import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '@material-ui/core/Avatar'
import {
  faComment,
  faEnvelope,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import UserAccount from './account'

const Header = () => {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)
  return (
    <div className='dashboard-header'>
      <div className='left column is-1 pull-left'>
        <img
          className='header-logo'
          src='https://i.imgur.com/y2vEn7E.png'
          alt='header-logo'
        />
      </div>
      <div className='center column is-9 pull-left'>
        <TextField
          id='outlined-search'
          placeholder='Can we help you find something? Start typing here...'
          type='search'
          variant='outlined'
        />
      </div>
      <div className='right column is-2 pull-left'>
        <div className='icons'>
          <FontAwesomeIcon icon={ faComment } className='header-fa-icon' />
          <FontAwesomeIcon icon={ faEnvelope } className='header-fa-icon' />
          <FontAwesomeIcon icon={ faBell } className='header-fa-icon' />
          <IconButton
            className='profile-menu-container account-dropdown-icon'
            onClick={ () => setIsDropdownOpen(!isDropdownOpen) }
          >
            {/* TODO: Add first letter of user name */}
            <Avatar className='avatar'>
              {userDetails && userDetails.full_name && userDetails.full_name[ 0 ].toUpperCase()}
            </Avatar>
          </IconButton>
        </div>
      </div>
      <UserAccount isOpen={ isDropdownOpen } toggleIsOpen={ setIsDropdownOpen } />
    </div>
  )
}

export default Header
