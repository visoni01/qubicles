import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome, faClock, faBullhorn, faObjectGroup, faIdCard, faChartPie,
} from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/images/square-green.svg'
import profileLogo from '../../assets/images/helen.jpg'

const SideBar = () => (
  <nav className="main-menu is-dark side-bar-container">
    <div className="main-menu-inner">
      <ul>
        <li className="main-logo">
          <img src={ logo } alt="Logo" />
        </li>
        <li className="side-icon is-active li-custom" data-child-menu="dashboard-menu">
          <FontAwesomeIcon icon={ faHome } className="steps-icons" />
        </li>
        <span className="sub-text"> Floor </span>
        <li className="side-icon li-custom" data-child-menu="documents-menu">
          <FontAwesomeIcon icon={ faClock } className="steps-icons" />
        </li>
        <span className="sub-text"> Inbound </span>
        <li className="side-icon li-custom" data-child-menu="business-menu">
          <FontAwesomeIcon icon={ faBullhorn } className="steps-icons" />
        </li>
        <span className="sub-text"> Outbound </span>
        <li className="side-icon li-custom" data-child-menu="misc-menu">
          <FontAwesomeIcon icon={ faBullhorn } className="steps-icons" />
        </li>
        <span className="sub-text"> Omni </span>
        <li className="side-icon li-custom" data-child-menu="settings-menu">
          <FontAwesomeIcon icon={ faObjectGroup } className="steps-icons" />
        </li>
        <span className="sub-text"> People </span>
        <li className="side-icon li-custom" data-child-menu="settings-menu">
          <FontAwesomeIcon icon={ faIdCard } className="steps-icons" />
        </li>
        <span className="sub-text"> Cen... </span>
        <li className="side-icon li-custom" data-child-menu="settings-menu">
          <FontAwesomeIcon icon={ faChartPie } className="steps-icons" />
        </li>
        <span className="sub-text"> Reports </span>
      </ul>
      <ul className="profile">
        <li>
          <div className="profile-trigger">
            <img
              className="main-menu-avatar"
              alt="avatar-logo"
              src={ profileLogo }
            />
            <span className="dot" />
          </div>
        </li>
      </ul>
    </div>
  </nav>
)

export default SideBar
