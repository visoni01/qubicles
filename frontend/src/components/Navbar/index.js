import React from 'react'
import { Container } from '@material-ui/core'
import PropTypes from 'prop-types'
import SideBar from '../../containers/Navbar/menuBar'
import TopBar from './topBar'
import './style.scss'

const NavBar = ({ children }) => (
  <div className='navbar-root'>
    <div className='left-bar'>
      <SideBar />
    </div>
    <div className='right-section'>
      <TopBar />
      <Container maxWidth='lg' className='route-component' classes={ { maxWidthLg: 'container-max-width' } }>
        {children}
      </Container>
    </div>
  </div>
)

NavBar.propTypes = {
  children: PropTypes.shape({}).isRequired,
}

export default NavBar
