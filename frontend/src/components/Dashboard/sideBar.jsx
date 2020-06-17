import React from 'react'
import logo from '../../assets/images/square-green.svg'
import profileLogo from '../../assets/images/helen.jpg'

const SideBar = () => (
  <nav className={'main-menu is-dark'}>
    <div className={'main-menu-inner'}>
      <ul>
        <li className={'main-logo'}>
          <img src={logo} alt="Logo"/>
        </li>
        <li className={'side-icon is-active'} data-child-menu="dashboard-menu">
          <i className={'sl sl-icon-speedometer'}></i>
        </li>
        <li className={'side-icon'} data-child-menu="documents-menu">
          <i className={'sl sl-icon-docs'}></i>
        </li>
        <li className={'side-icon'} data-child-menu="business-menu">
          <i className={'sl sl-icon-briefcase'}></i>
        </li>
        <li className={'side-icon'} data-child-menu="misc-menu">
          <i className={'sl sl-icon-graph'}></i>
        </li>
        <li className={'side-icon'} data-child-menu="settings-menu">
          <i className={'sl sl-icon-settings'}></i>
        </li>
      </ul>
      <ul className={'profile'}>
        <li>            
          <a className={'profile-trigger'}>
            <img 
              className={'main-menu-avatar'}
              src={profileLogo}/>
              <span className={'dot'}></span>
          </a>
        </li>
      </ul>    
    </div>
  </nav>  
)

export default SideBar
