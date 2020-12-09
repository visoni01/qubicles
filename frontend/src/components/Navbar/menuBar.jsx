import React from 'react'
import {
  List, ListItem, ListItemIcon, Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import menuItems from './menuList'

const listItem = (item) => (
  <ListItem key={ item.id } className='menu-item' button>
    { item.link ? (
      <Link to={ item.link }>
        <ListItemIcon className='menu-item-icon'>
          <img src={ item.icon } alt='' />
          <Typography className='menu-item-title'>
            {item.title}
          </Typography>
        </ListItemIcon>
      </Link>
    ) : (
      <ListItemIcon className='menu-item-icon'>
        <img src={ item.icon } alt='' />
        <Typography className='menu-item-title'>
          {item.title}
        </Typography>
      </ListItemIcon>
    )}
  </ListItem>
)

const SideBar = () => (
  <div className='sidebar-root'>
    <div className='qubicles-logo'>
      <img src='https://i.imgur.com/y2vEn7E.png' alt='Qubicles log' />
    </div>
    <List className='menu-list'>
      {menuItems.map((item) => listItem(item))}
    </List>
  </div>
)

export default SideBar
