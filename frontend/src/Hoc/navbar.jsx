import React from 'react'
import { Header, SideBar } from '../components/Navbar'

const navBar = (Component) => () => (
  <div className='dashboard-container'>
    <Header />
    <div id='dashboard-wrapper' className='dashboard-outer'>
      <SideBar />
      <Component />
    </div>
  </div>
)

export default navBar
