import React from 'react'
import { Container } from '@material-ui/core'
import { TopBar, SideBar } from '../components/Navbar'
import './style.scss'

const navBar = (Component) => () => (
  <div className='navbar-root'>
    <div className='left-bar'>
      <SideBar />
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
