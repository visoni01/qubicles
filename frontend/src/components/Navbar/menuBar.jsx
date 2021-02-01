import React, { useState } from 'react'
import {
  List, ListItemIcon, Typography, ListItem,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import menuItems from './menuList'

const SideBar = () => {
  const [ selectedNav, setSelectedNav ] = useState(0)
  const history = useHistory()

  const handleNavButtonClick = (item) => {
    setSelectedNav(item.id)

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
        {menuItems.map((item) => (
          <ListItem
            key={ item.id }
            button
            onClick={ () => handleNavButtonClick(item) }
            classes={ {
              gutters: 'menu-item-gutter',
              root: 'menu-item-root',
            } }
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
