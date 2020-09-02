import React from 'react'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment,
  faEnvelope,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import AccountSettings from './account'

const Header = () => (
  <div className='dashboard-header'>
    <div className='left column is-1 pull-left'>
      <Link to='/'>
        <img
          className='header-logo'
          src='https://i.imgur.com/y2vEn7E.png'
          alt='header-logo'
        />
      </Link>
    </div>
    <div className='center column is-9 pull-left'>
      <TextField
        id='outlined-search'
        placeholder='Can we help you find something? Start typing here...'
        type='search'
        variant='outlined'
      />
    </div>
    <div className='right is-2 pull-left header-info-icons'>
      <div className='icons'>
        <FontAwesomeIcon icon={ faComment } className='header-fa-icon' />
        <FontAwesomeIcon icon={ faEnvelope } className='header-fa-icon' />
        <FontAwesomeIcon icon={ faBell } className='header-fa-icon' />
        <AccountSettings />
      </div>
    </div>
  </div>
)

export default Header
