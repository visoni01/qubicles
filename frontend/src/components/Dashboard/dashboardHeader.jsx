import React from 'react'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '@material-ui/core/Avatar'
import {
  faComment,
  faEnvelope,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import headerLogo from '../../assets/images/qbe-header-logo.png'

const DashboardHeader = () => (
  <div className="dashboard-header">
    <div className="left column is-1 pull-left">
      <img
        className="header-logo"
        src={ headerLogo }
        alt="header-logo"
      />
    </div>
    <div className="center column is-9 pull-left">
      <TextField
        id="outlined-search"
        placeholder="Can we help you find something? Start typing here..."
        type="search"
        variant="outlined"
      />
    </div>
    <div className="right column is-2 pull-left">
      <div className="icons">
        <FontAwesomeIcon icon={ faComment } className="header-fa-icon" />
        <FontAwesomeIcon icon={ faEnvelope } className="header-fa-icon" />
        <FontAwesomeIcon icon={ faBell } className="header-fa-icon" />
        <div className="profile-menu-container">
          {/* TODO: Add first letter of user name */}
          <Avatar className="avatar">M</Avatar>
          <span className="dot" />
        </div>
      </div>
    </div>
  </div>
)

export default DashboardHeader
