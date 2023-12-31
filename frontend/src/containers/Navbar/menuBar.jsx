import React, { useState, useEffect } from 'react'
import {
  List, ListItemIcon, Typography, ListItem,
} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import menuItems from './menuList'
import { USERS } from '../../utils/constants'

const SideBar = () => {
  const [ selectedNav, setSelectedNav ] = useState(0)
  const [ userMenuApps, setUserMenuApps ] = useState([])

  const { userDetails } = useSelector((state) => state.login)

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const currentMenu = menuItems.filter((item) => {
      if (item.link) {
        // Check all sub-routes
        return location.pathname.split('/')[ 1 ] === item.link.split('/')[ 1 ]
      }
      return null
    })
    if (currentMenu && currentMenu.length === 1 && currentMenu[ 0 ]) {
      setSelectedNav(currentMenu[ 0 ].id)
    } else {
      setSelectedNav(0)
    }
  }, [ location ])

  useEffect(() => {
    if (userDetails.user_code === USERS.EMPLOYER) {
      setUserMenuApps(menuItems)
    } else {
      setUserMenuApps(menuItems.filter((item) => [ 0, 1, 3, 5 ].includes(item.id)))
    }
  }, [ userDetails ])

  const handleNavButtonClick = (item) => {
    if (item.link) {
      history.push(item.link)
    }
  }

  return (
    <div className='sidebar-root'>
      <div className='qubicles-logo'>
        <img src='https://i.imgur.com/y2vEn7E.png' alt='Qubicles log' />
      </div>
      <List className='menu-list'>
        {userMenuApps.map((item) => (
          <ListItem
            key={ item.id }
            button
            onClick={ () => handleNavButtonClick(item) }
            classes={ {
              gutters: 'menu-item-gutter',
              root: 'menu-item-root',
            } }
            disabled={ item.id === 5 }
          >
            <ListItemIcon classes={ { root: 'menu-item-icon-root' } }>
              <item.icon
                className={ `custom-svg-icon ${ selectedNav === item.id ? 'color-primary' : '' }` }
              />
            </ListItemIcon>
            <Typography className={ `menu-item-title para light ${ selectedNav === item.id ? 'primary' : '' }` }>
              {item.title}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default SideBar
