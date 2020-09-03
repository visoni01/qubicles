import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faClock,
  faBullhorn,
  faUsers,
  faIdCard,
  faChartPie,
  faThLarge,
  faCompressAlt,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const SideBar = () => (
  <nav className='main-menu is-dark side-bar-container'>
    <div className='main-menu-inner'>
      <ul>
        <Link to='/dashboard' className='side-icon is-active li-custom' data-child-menu='dashboard-menu'>
          <FontAwesomeIcon icon={ faHome } className='steps-icons icon-hover' />
        </Link>
        <span className='sub-text'> Floor </span>
        <li className='side-icon li-custom' data-child-menu='documents-menu'>
          <FontAwesomeIcon icon={ faClock } className='steps-icons icon-hover' />
        </li>
        <span className='sub-text'> Inbound </span>
        <li className='side-icon li-custom' data-child-menu='business-menu'>
          <FontAwesomeIcon icon={ faBullhorn } className='steps-icons icon-hover' />
        </li>
        <span className='sub-text'> Outbound </span>
        <li className='side-icon li-custom' data-child-menu='misc-menu'>
          <FontAwesomeIcon icon={ faCompressAlt } className='steps-icons icon-hover' />
        </li>
        <span className='sub-text'> Omni </span>
        <Link to='/people' className='side-icon li-custom' data-child-menu='settings-menu'>
          <FontAwesomeIcon icon={ faUsers } className='steps-icons icon-hover' />
        </Link>
        <span className='sub-text'> People </span>
        <li className='side-icon li-custom' data-child-menu='settings-menu'>
          <FontAwesomeIcon icon={ faIdCard } className='steps-icons icon-hover' />
        </li>
        <span className='sub-text'> Cen... </span>
        <li className='side-icon li-custom' data-child-menu='settings-menu'>
          <FontAwesomeIcon icon={ faChartPie } className='steps-icons icon-hover' />
        </li>
        <span className='sub-text'> Reports </span>
        <li className='side-icon li-custom' data-child-menu='settings-menu'>
          <FontAwesomeIcon icon={ faThLarge } className='steps-icons icon-hover' />
        </li>
        <span className='sub-text'> Apps </span>
        <li className='side-icon li-custom' data-child-menu='settings-menu'>
          <FontAwesomeIcon icon={ faQuestionCircle } className='steps-icons icon-hover' />
        </li>
        <span className='sub-text'> Help </span>
      </ul>
    </div>
  </nav>
)

export default SideBar
