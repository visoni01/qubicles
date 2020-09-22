import React from 'react'
import { Container } from '@material-ui/core'
import { Header, SideBar } from '../components/Navbar'
import TopBar from '../components/Navbar/topBar'
import NewSideBar from '../components/Navbar/menuBar'
import './style.scss'

const navBar = (Component) => () => (
  <div className='dashboard-container'>
    <Header />
    <div id='dashboard-wrapper' className='dashboard-outer'>
      <SideBar />
      <Component />
    </div>
  </div>
)

// Navbar with Newly designed Header and Sidebar. Will remove old one when all routes updates with new one.

export const newNavBar = (Component) => () => (
  <div className='navbar-root'>
    <div className='left-bar'>
      <NewSideBar />
    </div>
    <div className='right-section'>
      <TopBar />
      <Container maxWidth='lg' className='route-component' classes={ { maxWidthLg: 'container-max-width' } }>
        <Component />
      </Container>
    </div>
  </div>
)

export default navBar
